// src/controllers/alert.controller.js

import db from '../config/db.js';
import { sendSuccess, sendError } from '../utils/api.response.js';

// @desc    Get all alerts for a specific vehicle
// @route   GET /api/alerts/vehicle/:vehicleId
// @access  Private
export const getAlertsByVehicle = async (req, res) => {
  try {
    // Step 1: Verify vehicle belongs to the logged in user
    const [vehicles] = await db.execute(
      'SELECT id FROM vehicles WHERE id = ? AND user_id = ?',
      [req.params.vehicleId, req.user.id]
    );

    if (vehicles.length === 0) {
      return sendError(res, 404, 'Vehicle not found');
    }

    // Step 2: Fetch alerts with service type name using JOIN
    // Only return pending and snoozed alerts (not completed ones)
    const [alerts] = await db.execute(
      `SELECT
        pa.id,
        pa.vehicle_id,
        pa.service_type_id,
        st.name          AS service_type_name,
        pa.alert_message,
        pa.due_date,
        pa.due_mileage,
        pa.status,
        pa.snoozed_until,
        pa.created_at
       FROM pending_alerts pa
       JOIN service_types st ON pa.service_type_id = st.id
       WHERE pa.vehicle_id = ?
       ORDER BY
         FIELD(pa.status, 'pending', 'snoozed', 'completed'),
         pa.due_date ASC`,
      [req.params.vehicleId]
    );

    sendSuccess(res, 200, 'Alerts fetched successfully', alerts);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while fetching alerts');
  }
};

// @desc    Mark an alert as completed
// @route   PUT /api/alerts/:id/complete
// @access  Private
export const completeAlert = async (req, res) => {
  try {
    // Step 1: Verify alert belongs to a vehicle owned by logged in user
    const [alerts] = await db.execute(
      `SELECT pa.id, pa.status
       FROM pending_alerts pa
       JOIN vehicles v ON pa.vehicle_id = v.id
       WHERE pa.id = ? AND v.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (alerts.length === 0) {
      return sendError(res, 404, 'Alert not found');
    }

    const alert = alerts[0];

    // Step 2: Check it is not already completed
    if (alert.status === 'completed') {
      return sendError(res, 400, 'Alert is already marked as completed');
    }

    // Step 3: Update status to completed
    await db.execute(
      `UPDATE pending_alerts
       SET status = 'completed', snoozed_until = NULL
       WHERE id = ?`,
      [req.params.id]
    );

    sendSuccess(res, 200, 'Alert marked as completed');
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while completing alert');
  }
};

// @desc    Snooze an alert
// @route   PUT /api/alerts/:id/snooze
// @access  Private
export const snoozeAlert = async (req, res) => {
  const { days, snoozed_until } = req.body;

  // Require either a specific date or a number of days
  if (!days && !snoozed_until) {
    return sendError(
      res,
      400,
      'Please provide either a number of days or a snoozed_until date'
    );
  }

  try {
    // Step 1: Verify alert belongs to a vehicle owned by logged in user
    const [alerts] = await db.execute(
      `SELECT pa.id, pa.status
       FROM pending_alerts pa
       JOIN vehicles v ON pa.vehicle_id = v.id
       WHERE pa.id = ? AND v.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (alerts.length === 0) {
      return sendError(res, 404, 'Alert not found');
    }

    const alert = alerts[0];

    // Step 2: Completed alerts cannot be snoozed
    if (alert.status === 'completed') {
      return sendError(res, 400, 'Completed alerts cannot be snoozed');
    }

    // Step 3: Calculate snoozed_until date
    let snoozeDate;

    if (snoozed_until) {
      // Use the specific date provided
      snoozeDate = new Date(snoozed_until);

      if (isNaN(snoozeDate.getTime())) {
        return sendError(res, 400, 'Invalid snoozed_until date format');
      }

      // Snoozed date must be in the future
      if (snoozeDate <= new Date()) {
        return sendError(res, 400, 'Snoozed until date must be in the future');
      }
    } else {
      // Calculate date from number of days
      const parsedDays = parseInt(days);

      if (isNaN(parsedDays) || parsedDays <= 0) {
        return sendError(res, 400, 'Days must be a positive number');
      }

      snoozeDate = new Date();
      snoozeDate.setDate(snoozeDate.getDate() + parsedDays);
    }

    // Format date to MySQL DATE format (YYYY-MM-DD)
    const formattedSnoozeDate = snoozeDate.toISOString().split('T')[0];

    // Step 4: Update alert status to snoozed
    await db.execute(
      `UPDATE pending_alerts
       SET status = 'snoozed', snoozed_until = ?
       WHERE id = ?`,
      [formattedSnoozeDate, req.params.id]
    );

    sendSuccess(res, 200, `Alert snoozed until ${formattedSnoozeDate}`, {
      snoozed_until: formattedSnoozeDate,
    });
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while snoozing alert');
  }
};