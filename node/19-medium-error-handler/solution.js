class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

function errorHandler(options = {}) {
  const { isDev = process.env.NODE_ENV === 'development' } = options;

  return function(err, req, res, next) {
    // TODO: Handle error and send appropriate response
  };
}

function asyncHandler(fn) {
  // TODO: Wrap async function to catch errors
}

module.exports = {
  AppError, NotFoundError, ValidationError, UnauthorizedError,
  errorHandler, asyncHandler
};

