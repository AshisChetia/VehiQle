// src/routes/serviceLog.routes.js

import { Router } from 'express';
import {
  getLogsByVehicle,
  addServiceLog,
  deleteServiceLog,
  getServiceTypes,
} from '../controllers/serviceLog.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// All routes below require a valid JWT token
router.use(protect);

// GET    /api/service-logs/types                    → get all service types (for dropdown)
router.get('/types', getServiceTypes);

// GET    /api/service-logs/vehicle/:vehicleId       → get all logs for a vehicle
router.get('/vehicle/:vehicleId', getLogsByVehicle);

// POST   /api/service-logs                          → add a new service log
router.post('/', addServiceLog);

// DELETE /api/service-logs/:id                      → delete a service log
router.delete('/:id', deleteServiceLog);

export default router;