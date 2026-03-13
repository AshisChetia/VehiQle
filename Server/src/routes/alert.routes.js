// src/routes/alert.routes.js

import { Router } from 'express';
import {
  getAlertsByVehicle,
  completeAlert,
  snoozeAlert,
} from '../controllers/alert.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// All routes below require a valid JWT token
router.use(protect);

// GET    /api/alerts/vehicle/:vehicleId   → get all alerts for a vehicle
router.get('/vehicle/:vehicleId', getAlertsByVehicle);

// PUT    /api/alerts/:id/complete         → mark alert as completed
router.put('/:id/complete', completeAlert);

// PUT    /api/alerts/:id/snooze           → snooze an alert
router.put('/:id/snooze', snoozeAlert);

export default router;