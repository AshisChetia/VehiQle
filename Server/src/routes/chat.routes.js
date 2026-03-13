// src/routes/chat.routes.js

import { Router } from 'express';
import { sendChatMessage } from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// All routes below require a valid JWT token
router.use(protect);

// POST   /api/chat    → send a message to Gemini AI
router.post('/', sendChatMessage);

export default router;