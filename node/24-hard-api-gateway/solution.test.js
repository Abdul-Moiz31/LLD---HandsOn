const { APIGateway, CircuitBreaker, LoadBalancer } = require('./solution');

describe('LoadBalancer', () => {
  test('should round-robin between targets', () => {
    const lb = new LoadBalancer(['http://a', 'http://b', 'http://c']);
    
    expect(lb.getNext()).toBe('http://a');
    expect(lb.getNext()).toBe('http://b');
    expect(lb.getNext()).toBe('http://c');
    expect(lb.getNext()).toBe('http://a');
  });
});

describe('CircuitBreaker', () => {
  test('should allow requests when closed', async () => {
    const cb = new CircuitBreaker({ failureThreshold: 3 });
    const result = await cb.execute(async () => 'success');
    expect(result).toBe('success');
  });

  test('should trip after threshold failures', async () => {
    const cb = new CircuitBreaker({ failureThreshold: 2 });
    const failingFn = async () => { throw new Error('fail'); };

    await expect(cb.execute(failingFn)).rejects.toThrow();
    await expect(cb.execute(failingFn)).rejects.toThrow();
    
    // Circuit should be open now
    await expect(cb.execute(async () => 'success')).rejects.toThrow(/circuit.*open/i);
  });
});

describe('APIGateway', () => {
  test('should add routes', () => {
    const gateway = new APIGateway();
    
    expect(() => {
      gateway.addRoute('/api/users', { target: 'http://users-service' });
      gateway.addRoute('/api/products', { target: 'http://products-service' });
    }).not.toThrow();
  });

  test('should create handler', () => {
    const gateway = new APIGateway();
    const handler = gateway.createHandler();
    expect(typeof handler).toBe('function');
  });
});

