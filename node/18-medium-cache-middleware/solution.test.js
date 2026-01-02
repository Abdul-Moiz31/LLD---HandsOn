const { LRUCache, createCacheMiddleware } = require('./solution');

describe('LRUCache', () => {
  test('should store and retrieve values', () => {
    const cache = new LRUCache(10);
    cache.set('key', 'value');
    expect(cache.get('key')).toBe('value');
  });

  test('should return undefined for missing keys', () => {
    const cache = new LRUCache(10);
    expect(cache.get('missing')).toBeUndefined();
  });

  test('should evict oldest when full', () => {
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3); // Should evict 'a'
    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBe(2);
  });

  test('should expire entries after TTL', async () => {
    const cache = new LRUCache(10);
    cache.set('key', 'value', 50);
    await new Promise(r => setTimeout(r, 100));
    expect(cache.get('key')).toBeUndefined();
  });
});

describe('createCacheMiddleware', () => {
  test('should return middleware function', () => {
    const middleware = createCacheMiddleware();
    expect(typeof middleware).toBe('function');
  });
});

