const { generateToken, verifyToken, authMiddleware } = require('./solution');

const SECRET = 'test-secret-key';

describe('JWT', () => {
  test('should generate valid token', () => {
    const token = generateToken({ userId: 123 }, SECRET);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  test('should verify and decode token', () => {
    const token = generateToken({ userId: 456 }, SECRET);
    const payload = verifyToken(token, SECRET);
    expect(payload.userId).toBe(456);
  });

  test('should reject invalid signature', () => {
    const token = generateToken({ userId: 789 }, SECRET);
    expect(() => verifyToken(token, 'wrong-secret')).toThrow();
  });

  test('should reject expired token', () => {
    const token = generateToken({ userId: 1 }, SECRET, { expiresIn: -1000 });
    expect(() => verifyToken(token, SECRET)).toThrow();
  });
});

describe('authMiddleware', () => {
  test('should call next with valid token', () => {
    const middleware = authMiddleware(SECRET);
    const token = generateToken({ userId: 1 }, SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
  });

  test('should return 401 without token', () => {
    const middleware = authMiddleware(SECRET);
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

