# Error Handler Middleware

**Difficulty:** Medium

## Problem Statement

Implement a comprehensive error handling middleware.

## Requirements

1. Catch all errors
2. Custom error classes (NotFoundError, ValidationError, etc.)
3. Development vs production error responses
4. Error logging
5. Async error handling wrapper

## Function Signatures

```javascript
class AppError extends Error {}
class NotFoundError extends AppError {}
class ValidationError extends AppError {}

function errorHandler(options) {}
function asyncHandler(fn) {}
```

