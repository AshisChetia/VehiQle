// src/routes/vehicle.routes.js

import { Router } from 'express';
import {
  getUserVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicle.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// All routes below require a valid JWT token
router.use(protect);

// GET    /api/vehicles         → get all vehicles for logged in user
router.get('/', getUserVehicles);

// GET    /api/vehicles/:id     → get single vehicle by id
router.get('/:id', getVehicleById);

// POST   /api/vehicles         → add a new vehicle
router.post('/', addVehicle);

// PUT    /api/vehicles/:id     → update vehicle details
router.put('/:id', updateVehicle);

// DELETE /api/vehicles/:id     → delete a vehicle
router.delete('/:id', deleteVehicle);

export default router;