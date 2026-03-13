// src/routes/index.js

import { Router } from 'express';
import authRoutes from './auth.routes.js';
import vehicleRoutes from './vehicle.routes.js';
import serviceLogRoutes from './serviceLog.routes.js';
import alertRoutes from './alert.routes.js';
import chatRoutes from './chat.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/service-logs', serviceLogRoutes);
router.use('/alerts', alertRoutes);
router.use('/chat', chatRoutes);

export default router;