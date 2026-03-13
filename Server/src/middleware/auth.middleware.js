// src/middleware/auth.middleware.js

import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { sendError } from '../utils/api.response.js';

/**
 * Protect middleware — verifies JWT token from Authorization header
 * Attaches the authenticated user to req.user
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // No token found
    if (!token) {
      return sendError(res, 401, 'Not authorized, no token provided');
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user still exists in the database
    const [rows] = await db.execute(
      'SELECT id, name, email FROM users WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return sendError(res, 401, 'Not authorized, user no longer exists');
    }

    // Attach user to request object for use in controllers
    req.user = rows[0];

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return sendError(res, 401, 'Not authorized, token is invalid or expired');
  }
};