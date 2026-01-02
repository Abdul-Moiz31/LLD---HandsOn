# Database Migration System

**Difficulty:** Hard

## Problem Statement

Implement a database migration system that tracks and applies schema changes.

## Requirements

1. Migration file discovery
2. Up and down migrations
3. Migration tracking (which have run)
4. Rollback support
5. Dry run mode
6. Transaction support
7. Lock to prevent concurrent runs

## Class Signature

```javascript
class MigrationRunner {
  constructor(options) {}
  async migrate(target) {}
  async rollback(steps) {}
  async status() {}
  async create(name) {}
}
```

