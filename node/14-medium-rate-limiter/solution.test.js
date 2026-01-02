const { createRateLimiter, FixedWindowRateLimiter } = require('./solution');

describe('FixedWindowRateLimiter', () => {
  test('should allow requests within limit', () => {
    const limiter = new FixedWindowRateLimiter(60000, 5);
    
    for (let i = 0; i < 5; i++) {
      expect(limiter.isAllowed('test-ip').allowed).toBe(true);
    }
  });

  test('should block requests exceeding limit', () => {
    const limiter = new FixedWindowRateLimiter(60000, 3);
    
    limiter.isAllowed('test-ip');
    limiter.isAllowed('test-ip');
    limiter.isAllowed('test-ip');
    
    expect(limiter.isAllowed('test-ip').allowed).toBe(false);
  });

  test('should track remaining requests', () => {
    const limiter = new FixedWindowRateLimiter(60000, 5);
    
    expect(limiter.isAllowed('test-ip').remaining).toBe(4);
    expect(limiter.isAllowed('test-ip').remaining).toBe(3);
  });
});

describe('createRateLimiter middleware', () => {
  test('should return middleware function', () => {
    const middleware = createRateLimiter({ maxRequests: 10 });
    expect(typeof middleware).toBe('function');
  });

  test('should call next() when allowed', () => {
    const middleware = createRateLimiter({ maxRequests: 10 });
    const req = { ip: '127.0.0.1' };
    const res = { setHeader: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should return 429 when rate limited', () => {
    const middleware = createRateLimiter({ maxRequests: 1 });
    const req = { ip: '127.0.0.1' };
    const res = { 
      setHeader: jest.fn(), 
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    middleware(req, res, next);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(429);
  });
});

