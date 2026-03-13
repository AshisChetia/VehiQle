// src/controllers/auth.controller.js

import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { generateToken } from '../utils/generate.token.js';
import { sendSuccess, sendError } from '../utils/api.response.js';

// -------------------------------------------------------
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// -------------------------------------------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic field validation
    if (!name || !email || !password) {
      return sendError(res, 400, 'Please provide all required fields');
    }

    if (password.length < 6) {
      return sendError(res, 400, 'Password must be at least 6 characters long');
    }

    // Check if a user with this email already exists
    const [existingUser] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return sendError(res, 400, 'An account with this email already exists');
    }

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const newUserId = result.insertId;

    // Generate JWT token
    const token = generateToken(newUserId);

    return sendSuccess(res, 201, 'Account created successfully', {
      user: {
        id: newUserId,
        name,
        email,
      },
      token,
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    return sendError(res, 500, 'Server error during registration');
  }
};

// -------------------------------------------------------
// @desc    Login an existing user
// @route   POST /api/auth/login
// @access  Public
// -------------------------------------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic field validation
    if (!email || !password) {
      return sendError(res, 400, 'Please provide email and password');
    }

    // Check if user exists — fetch full row including password for comparison
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return sendError(res, 401, 'Invalid email or password');
    }

    const user = rows[0];

    // Compare provided password against stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken(user.id);

    return sendSuccess(res, 200, 'Login successful', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return sendError(res, 500, 'Server error during login');
  }
};