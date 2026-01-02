# Cache Middleware

**Difficulty:** Medium

## Problem Statement

Implement in-memory caching middleware with TTL support.

## Requirements

1. Cache responses by key
2. TTL (time-to-live) support
3. Manual cache invalidation
4. Cache statistics
5. LRU eviction policy

## Function Signature

```javascript
function createCacheMiddleware(options) {
  // options: { ttl, maxSize, keyGenerator }
  // Return middleware
}
```

