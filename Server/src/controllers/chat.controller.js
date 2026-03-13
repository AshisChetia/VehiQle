// src/controllers/chat.controller.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import db from '../config/db.js';
import { sendSuccess, sendError } from '../utils/api.response.js';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Send a message to Gemini AI with vehicle context
// @route   POST /api/chat
// @access  Private
export const sendChatMessage = async (req, res) => {
    const { message, vehicle_id, history } = req.body;

    // Validate message
    if (!message || message.trim() === '') {
        return sendError(res, 400, 'Please provide a message');
    }

    try {
        // ─────────────────────────────────────────
        // Step 1: Build context data from database
        // ─────────────────────────────────────────
        const contextData = await buildContextData(req.user, vehicle_id);

        // ─────────────────────────────────────────
        // Step 2: Build system prompt with context
        // ─────────────────────────────────────────
        const systemPrompt = buildSystemPrompt(contextData);

        // ─────────────────────────────────────────
        // Step 3: Format conversation history for Gemini
        // ─────────────────────────────────────────
        const formattedHistory = formatHistory(history, systemPrompt);

        // ─────────────────────────────────────────
        // Step 4: Send message to Gemini AI
        // ─────────────────────────────────────────
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.7,
            },
        });

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(message.trim());
        const aiResponse = result.response.text();

        sendSuccess(res, 200, 'Message sent successfully', {
            response: aiResponse,
        });
    } catch (error) {
        console.error(error);

        // Handle Gemini API specific errors
        if (error.message?.includes('API_KEY')) {
            return sendError(res, 500, 'AI service configuration error');
        }
        if (error.message?.includes('quota')) {
            return sendError(res, 429, 'AI service quota exceeded, please try again later');
        }

        sendError(res, 500, 'Server error while communicating with AI');
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Fetch all relevant data from DB to give Gemini context
// ─────────────────────────────────────────────────────────────────────────────
const buildContextData = async (user, vehicle_id) => {
    const contextData = {
        user,
        vehicles: [],
        selectedVehicle: null,
        serviceLogs: [],
        alerts: [],
    };

    // Fetch all vehicles for the user
    const [vehicles] = await db.execute(
        'SELECT * FROM vehicles WHERE user_id = ? ORDER BY created_at DESC',
        [user.id]
    );
    contextData.vehicles = vehicles;

    // If a specific vehicle is selected, fetch its detailed context
    if (vehicle_id) {
        const [selectedVehicles] = await db.execute(
            'SELECT * FROM vehicles WHERE id = ? AND user_id = ?',
            [vehicle_id, user.id]
        );

        if (selectedVehicles.length > 0) {
            contextData.selectedVehicle = selectedVehicles[0];

            // Fetch last 10 service logs for the vehicle
            const [logs] = await db.execute(
                `SELECT
          sl.service_date,
          sl.mileage_at_service,
          sl.notes,
          st.name AS service_type_name
         FROM service_logs sl
         JOIN service_types st ON sl.service_type_id = st.id
         WHERE sl.vehicle_id = ?
         ORDER BY sl.service_date DESC
         LIMIT 10`,
                [vehicle_id]
            );
            contextData.serviceLogs = logs;

            // Fetch active (pending + snoozed) alerts for the vehicle
            const [alerts] = await db.execute(
                `SELECT
          pa.alert_message,
          pa.due_date,
          pa.due_mileage,
          pa.status,
          pa.snoozed_until,
          st.name AS service_type_name
         FROM pending_alerts pa
         JOIN service_types st ON pa.service_type_id = st.id
         WHERE pa.vehicle_id = ? AND pa.status != 'completed'
         ORDER BY pa.due_date ASC`,
                [vehicle_id]
            );
            contextData.alerts = alerts;
        }
    }

    return contextData;
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Build the AI system prompt using the fetched context data
// ─────────────────────────────────────────────────────────────────────────────
const buildSystemPrompt = (contextData) => {
    const { user, vehicles, selectedVehicle, serviceLogs, alerts } = contextData;

    let prompt = `You are VehiQle, a knowledgeable and friendly automotive maintenance assistant.
You help users understand their vehicle service history, upcoming maintenance needs, and general car care advice.
Always be clear, practical, and prioritize the user's safety.

User: ${user.name}
`;

    // Add all vehicles overview
    if (vehicles.length > 0) {
        prompt += `\nUser's Registered Vehicles:\n`;
        vehicles.forEach((v) => {
            prompt += `  - ${v.year} ${v.make} ${v.model}`;
            if (v.license_plate) prompt += ` | Plate: ${v.license_plate}`;
            prompt += ` | Mileage: ${v.mileage ? `${v.mileage} km` : 'Not recorded'}\n`;
        });
    } else {
        prompt += `\nThe user has not registered any vehicles yet.\n`;
    }

    // Add detailed context for selected vehicle
    if (selectedVehicle) {
        const v = selectedVehicle;
        prompt += `\n── Currently Discussing ──────────────────────────
Vehicle : ${v.year} ${v.make} ${v.model}
Mileage : ${v.mileage ? `${v.mileage} km` : 'Not recorded'}
`;

        // Service history
        if (serviceLogs.length > 0) {
            prompt += `\nRecent Service History (latest 10 records):\n`;
            serviceLogs.forEach((log) => {
                prompt += `  - [${log.service_date}] ${log.service_type_name}`;
                if (log.mileage_at_service) prompt += ` at ${log.mileage_at_service} km`;
                if (log.notes) prompt += ` | Notes: ${log.notes}`;
                prompt += '\n';
            });
        } else {
            prompt += `\nNo service history has been recorded for this vehicle yet.\n`;
        }

        // Active alerts
        if (alerts.length > 0) {
            prompt += `\nActive Maintenance Alerts:\n`;
            alerts.forEach((alert) => {
                prompt += `  - [${alert.status.toUpperCase()}] ${alert.service_type_name}: ${alert.alert_message}`;
                if (alert.due_date) prompt += ` | Due date: ${alert.due_date}`;
                if (alert.due_mileage) prompt += ` | Due at: ${alert.due_mileage} km`;
                if (alert.snoozed_until) prompt += ` | Snoozed until: ${alert.snoozed_until}`;
                prompt += '\n';
            });
        } else {
            prompt += `\nNo active maintenance alerts for this vehicle.\n`;
        }

        prompt += `────────────────────────────────────────────────\n`;
    }

    // Instructions for Gemini behaviour
    prompt += `
Instructions:
- Use the vehicle and service data above to give personalized and accurate advice
- If no vehicle is selected, give general automotive advice
- Keep responses concise, helpful, and easy to understand
- Always highlight safety-critical items (brakes, tires, engine oil, coolant)
- Use standard manufacturer-recommended maintenance intervals when giving advice
- Never fabricate vehicle data that was not provided above
- If unsure about something, be honest and recommend consulting a certified mechanic
- Format your response clearly using short paragraphs or bullet points where helpful
`;

    return prompt;
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Format conversation history for the Gemini API
// ─────────────────────────────────────────────────────────────────────────────
const formatHistory = (history, systemPrompt) => {
    const formattedHistory = [];

    // Inject the system prompt as the very first user/model exchange
    // so Gemini understands its role and the user's vehicle context
    formattedHistory.push({
        role: 'user',
        parts: [{ text: systemPrompt }],
    });

    formattedHistory.push({
        role: 'model',
        parts: [{ text: 'Understood! I am VehiQle, your personal automotive maintenance assistant. I have reviewed your vehicle information and service history. How can I help you today?' }],
    });

    // Append previous conversation turns if provided by the frontend
    if (Array.isArray(history) && history.length > 0) {
        history.forEach((turn) => {
            if (
                turn.role &&
                turn.text &&
                (turn.role === 'user' || turn.role === 'model')
            ) {
                formattedHistory.push({
                    role: turn.role,
                    parts: [{ text: turn.text }],
                });
            }
        });
    }

    return formattedHistory;
};