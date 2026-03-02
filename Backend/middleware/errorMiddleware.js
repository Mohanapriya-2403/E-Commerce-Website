/**
 * Custom Error Middleware
 * This handles 404 (Not Found) and global server errors.
 */

// @desc    Handle 404 errors for routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// @desc    General error handler for all exceptions
const errorHandler = (err, req, res, next) => {
  // If the status code is 200 (default), change it to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    // Show the stack trace only in development mode to help debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };