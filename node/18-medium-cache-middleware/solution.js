class LRUCache {
  constructor(maxSize) {
    // TODO: Implement LRU cache
  }

  get(key) {}
  set(key, value, ttl) {}
  delete(key) {}
  clear() {}
  getStats() {}
}

function createCacheMiddleware(options = {}) {
  const {
    ttl = 60000,
    maxSize = 100,
    keyGenerator = (req) => req.url
  } = options;

  // TODO: Return middleware that caches responses
}

module.exports = { createCacheMiddleware, LRUCache };

