const { Router } = require('./solution');

describe('Router', () => {
  let router;

  beforeEach(() => {
    router = new Router();
  });

  test('should register and match GET route', () => {
    const handler = jest.fn((req, res) => res.end('ok'));
    router.get('/test', handler);

    const req = { method: 'GET', url: '/test' };
    const res = { end: jest.fn() };

    router.handle(req, res);
    expect(handler).toHaveBeenCalled();
  });

  test('should register POST route', () => {
    const handler = jest.fn();
    router.post('/users', handler);

    const req = { method: 'POST', url: '/users' };
    const res = { end: jest.fn() };

    router.handle(req, res);
    expect(handler).toHaveBeenCalled();
  });

  test('should return 404 for unmatched routes', () => {
    const req = { method: 'GET', url: '/unknown' };
    const res = { statusCode: 200, end: jest.fn() };

    router.handle(req, res);
    expect(res.statusCode).toBe(404);
  });

  test('should execute middleware', () => {
    const middleware = jest.fn((req, res, next) => next());
    const handler = jest.fn();

    router.use(middleware);
    router.get('/test', handler);

    const req = { method: 'GET', url: '/test' };
    const res = { end: jest.fn() };

    router.handle(req, res);
    expect(middleware).toHaveBeenCalled();
    expect(handler).toHaveBeenCalled();
  });
});

