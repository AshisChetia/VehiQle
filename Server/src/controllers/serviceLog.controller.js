// src/controllers/serviceLog.controller.js

import db from '../config/db.js';
import { sendSuccess, sendError } from '../utils/api.response.js';

// @desc    Get all service types (for frontend dropdown)
// @route   GET /api/service-logs/types
// @access  Private
export const getServiceTypes = async (req, res) => {
  try {
    const [serviceTypes] = await db.execute(
      'SELECT * FROM service_types ORDER BY name ASC'
    );

    sendSuccess(res, 200, 'Service types fetched successfully', serviceTypes);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while fetching service types');
  }
};

// @desc    Get all service logs for a specific vehicle
// @route   GET /api/service-logs/vehicle/:vehicleId
// @access  Private
export const getLogsByVehicle = async (req, res) => {
  try {
    // Step 1: Verify vehicle belongs to the logged in user
    const [vehicles] = await db.execute(
      'SELECT id FROM vehicles WHERE id = ? AND user_id = ?',
      [req.params.vehicleId, req.user.id]
    );

    if (vehicles.length === 0) {
      return sendError(res, 404, 'Vehicle not found');
    }

    // Step 2: Fetch logs with service type name using JOIN
    const [logs] = await db.execute(
      `SELECT 
        sl.id,
        sl.vehicle_id,
        sl.service_type_id,
        st.name        AS service_type_name,
        sl.service_date,
        sl.mileage_at_service,
        sl.notes,
        sl.created_at
       FROM service_logs sl
       JOIN service_types st ON sl.service_type_id = st.id
       WHERE sl.vehicle_id = ?
       ORDER BY sl.service_date DESC`,
      [req.params.vehicleId]
    );

    sendSuccess(res, 200, 'Service logs fetched successfully', logs);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while fetching service logs');
  }
};

// @desc    Add a new service log
// @route   POST /api/service-logs
// @access  Private
export const addServiceLog = async (req, res) => {
  const { vehicle_id, service_type_id, service_date, mileage_at_service, notes } = req.body;

  // Validate required fields
  if (!vehicle_id || !service_type_id || !service_date) {
    return sendError(res, 400, 'Please provide vehicle, service type and service date');
  }

  // Validate mileage if provided
  if (
    mileage_at_service !== undefined &&
    mileage_at_service !== null &&
    (isNaN(mileage_at_service) || mileage_at_service < 0)
  ) {
    return sendError(res, 400, 'Mileage must be a positive number');
  }

  try {
    // Step 1: Verify vehicle belongs to logged in user
    const [vehicles] = await db.execute(
      'SELECT id, mileage FROM vehicles WHERE id = ? AND user_id = ?',
      [vehicle_id, req.user.id]
    );

    if (vehicles.length === 0) {
      return sendError(res, 404, 'Vehicle not found');
    }

    // Step 2: Verify service type exists
    const [serviceTypes] = await db.execute(
      'SELECT id FROM service_types WHERE id = ?',
      [service_type_id]
    );

    if (serviceTypes.length === 0) {
      return sendError(res, 404, 'Service type not found');
    }

    // Step 3: Insert the new service log
    const [result] = await db.execute(
      `INSERT INTO service_logs 
        (vehicle_id, service_type_id, service_date, mileage_at_service, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [
        vehicle_id,
        service_type_id,
        service_date,
        mileage_at_service || null,
        notes         || null,
      ]
    );

    // Step 4: Auto-update vehicle mileage if service mileage is higher
    const vehicle = vehicles[0];
    if (mileage_at_service && Number(mileage_at_service) > Number(vehicle.mileage)) {
      await db.execute(
        'UPDATE vehicles SET mileage = ? WHERE id = ?',
        [mileage_at_service, vehicle_id]
      );
    }

    const newLog = {
      id: result.insertId,
      vehicle_id,
      service_type_id,
      service_date,
      mileage_at_service: mileage_at_service || null,
      notes:              notes         || null,
    };

    sendSuccess(res, 201, 'Service log added successfully', newLog);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while adding service log');
  }
};

// @desc    Delete a service log
// @route   DELETE /api/service-logs/:id
// @access  Private
export const deleteServiceLog = async (req, res) => {
  try {
    // Verify the log belongs to a vehicle owned by the logged in user
    // using JOIN to check ownership in one query
    const [logs] = await db.execute(
      `SELECT sl.id
       FROM service_logs sl
       JOIN vehicles v ON sl.vehicle_id = v.id
       WHERE sl.id = ? AND v.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (logs.length === 0) {
      return sendError(res, 404, 'Service log not found');
    }

    await db.execute(
      'DELETE FROM service_logs WHERE id = ?',
      [req.params.id]
    );

    sendSuccess(res, 200, 'Service log deleted successfully');
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while deleting service log');
  }
};