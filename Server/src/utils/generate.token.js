// src/utils/generate.token.js

import jwt from 'jsonwebtoken';

/**
 * Generates a signed JWT token for a given user ID
 * @param {number} userId - The user's ID from the database
 * @returns {string} - Signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};