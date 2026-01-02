const {
  AppError, NotFoundError, ValidationError,
  errorHandler, asyncHandler
} = require('./solution');

describe('Error Classes', () => {
  test('AppError should have statusCode', () => {
    const err = new AppError('Test', 500);
    expect(err.statusCode).toBe(500);
    expect(err.message).toBe('Test');
  });

  test('NotFoundError should be 404', () => {
    const err = new NotFoundError();
    expect(err.statusCode).toBe(404);
  });

  test('ValidationError should include errors', () => {
    const err = new ValidationError('Invalid', [{ field: 'email' }]);
    expect(err.statusCode).toBe(400);
    expect(err.errors).toHaveLength(1);
  });
});

describe('errorHandler', () => {
  test('should send error response', () => {
    const handler = errorHandler();
    const err = new NotFoundError('User not found');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    handler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('asyncHandler', () => {
  test('should catch async errors', async () => {
    const asyncFn = async () => { throw new Error('Async error'); };
    const wrapped = asyncHandler(asyncFn);
    const next = jest.fn();

    await wrapped({}, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

