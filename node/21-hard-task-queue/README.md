# Task Queue

**Difficulty:** Hard

## Problem Statement

Implement an async task queue with concurrency control, priorities, and retries.

## Requirements

1. Add tasks to queue
2. Concurrency limit
3. Priority support
4. Retry with backoff
5. Task timeout
6. Events: task-complete, task-error, queue-empty

## Class Signature

```javascript
class TaskQueue extends EventEmitter {
  constructor(options) {}
  add(task, options) {}
  pause() {}
  resume() {}
  clear() {}
  getStats() {}
}
```

