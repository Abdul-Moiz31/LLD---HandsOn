# Connection Pool

**Difficulty:** Hard

## Problem Statement

Implement a generic connection pool for managing database or service connections.

## Requirements

1. Maintain pool of reusable connections
2. Min/max pool size configuration
3. Connection acquire with timeout
4. Automatic connection validation
5. Idle connection cleanup
6. Connection recycling

## Class Signature

```javascript
class ConnectionPool {
  constructor(options) {}
  async acquire() {}
  release(connection) {}
  async destroy() {}
  getStats() {}
}
```

