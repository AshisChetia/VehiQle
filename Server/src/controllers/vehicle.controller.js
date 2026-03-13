// src/controllers/vehicle.controller.js

import db from '../config/db.js';
import { sendSuccess, sendError } from '../utils/api.response.js';

// @desc    Get all vehicles for logged in user
// @route   GET /api/vehicles
// @access  Private
export const getUserVehicles = async (req, res) => {
  try {
    const [vehicles] = await db.execute(
      'SELECT * FROM vehicles WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    sendSuccess(res, 200, 'Vehicles fetched successfully', vehicles);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while fetching vehicles');
  }
};

// @desc    Get single vehicle by id
// @route   GET /api/vehicles/:id
// @access  Private
export const getVehicleById = async (req, res) => {
  try {
    const [vehicles] = await db.execute(
      'SELECT * FROM vehicles WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (vehicles.length === 0) {
      return sendError(res, 404, 'Vehicle not found');
    }

    sendSuccess(res, 200, 'Vehicle fetched successfully', vehicles[0]);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while fetching vehicle');
  }
};

// @desc    Add a new vehicle
// @route   POST /api/vehicles
// @access  Private
export const addVehicle = async (req, res) => {
  const { make, model, year, license_plate, mileage } = req.body;

  // Validate required fields
  if (!make || !model || !year) {
    return sendError(res, 400, 'Please provide make, model and year');
  }

  // Validate year is a valid number
  const parsedYear = parseInt(year);
  const currentYear = new Date().getFullYear();
  if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > currentYear + 1) {
    return sendError(res, 400, `Year must be between 1900 and ${currentYear + 1}`);
  }

  // Validate mileage if provided
  if (mileage !== undefined && (isNaN(mileage) || mileage < 0)) {
    return sendError(res, 400, 'Mileage must be a positive number');
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO vehicles 
        (user_id, make, model, year, license_plate, mileage) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        make,
        model,
        parsedYear,
        license_plate || null,
        mileage || 0,
      ]
    );

    const newVehicle = {
      id: result.insertId,
      user_id: req.user.id,
      make,
      model,
      year: parsedYear,
      license_plate: license_plate || null,
      mileage: mileage || 0,
    };

    sendSuccess(res, 201, 'Vehicle added successfully', newVehicle);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while adding vehicle');
  }
};

// @desc    Update vehicle details
// @route   PUT /api/vehicles/:id
// @access  Private
export const updateVehicle = async (req, res) => {
  const { make, model, year, license_plate, mileage } = req.body;

  try {
    // Check vehicle exists and belongs to logged in user
    const [vehicles] = await db.execute(
      'SELECT * FROM vehicles WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (vehicles.length === 0) {
      return sendError(res, 404, 'Vehicle not found');
    }

    const vehicle = vehicles[0];

    // Validate year if provided
    if (year !== undefined) {
      const parsedYear = parseInt(year);
      const currentYear = new Date().getFullYear();
      if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > currentYear + 1) {
        return sendError(res, 400, `Year must be between 1900 and ${currentYear + 1}`);
      }
    }

    // Validate mileage if provided
    if (mileage !== undefined && (isNaN(mileage) || mileage < 0)) {
      return sendError(res, 400, 'Mileage must be a positive number');
    }

    // Fall back to existing values if fields are not provided
    const updatedMake          = make          ?? vehicle.make;
    const updatedModel         = model         ?? vehicle.model;
    const updatedYear          = year          ?? vehicle.year;
    const updatedLicensePlate  = license_plate ?? vehicle.license_plate;
    const updatedMileage       = mileage       ?? vehicle.mileage;

    await db.execute(
      `UPDATE vehicles 
       SET make = ?, model = ?, year = ?, license_plate = ?, mileage = ?
       WHERE id = ? AND user_id = ?`,
      [
        updatedMake,
        updatedModel,
        updatedYear,
        updatedLicensePlate,
        updatedMileage,
        req.params.id,
        req.user.id,
      ]
    );

    const updatedVehicle = {
      id: parseInt(req.params.id),
      user_id: req.user.id,
      make: updatedMake,
      model: updatedModel,
      year: updatedYear,
      license_plate: updatedLicensePlate,
      mileage: updatedMileage,
    };

    sendSuccess(res, 200, 'Vehicle updated successfully', updatedVehicle);
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while updating vehicle');
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private
export const deleteVehicle = async (req, res) => {
  try {
    // Check vehicle exists and belongs to logged in user
    const [vehicles] = await db.execute(
      'SELECT id FROM vehicles WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (vehicles.length === 0) {
      return sendError(res, 404, 'Vehicle not found');
    }

    await db.execute(
      'DELETE FROM vehicles WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    sendSuccess(res, 200, 'Vehicle deleted successfully');
  } catch (error) {
    console.error(error);
    sendError(res, 500, 'Server error while deleting vehicle');
  }
};