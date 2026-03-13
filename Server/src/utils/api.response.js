// src/utils/api.response.js

/**
 * Send a standardized success response
 * @param {object} res        - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message    - Success message
 * @param {any}    data       - Data to send back (optional)
 */
export const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  const response = {
    success: true,
    message,
  };

  // Only include data field if data is actually provided
  if (data !== null && data !== undefined) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a standardized error response
 * @param {object} res        - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} message    - Error message
 * @param {any}    errors     - Validation errors or extra error details (optional)
 */
export const sendError = (res, statusCode = 500, message = 'Something went wrong', errors = null) => {
  const response = {
    success: false,
    message,
  };

  // Only include errors field if errors are actually provided
  if (errors !== null && errors !== undefined) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};