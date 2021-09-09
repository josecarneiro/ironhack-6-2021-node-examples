'use strict';

// Route Guard Middleware
// This piece of middleware is going to check if a user is authenticated
// If not, it sends the request to the app error handler with a message
module.exports = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error('AUTHENTICATION_REQUIRED');
    error.status = 401;
    next(error);
  }
};
