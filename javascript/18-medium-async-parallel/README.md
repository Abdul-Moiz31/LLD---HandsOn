# Async Parallel

**Difficulty:** Medium

## Problem Statement

Implement an `asyncParallel` function that executes an array of async functions in parallel, with a configurable concurrency limit. This is useful for rate limiting API calls or managing resource usage.

## Examples

### Example 1 - Basic Parallel Execution:
```javascript
const tasks = [
  () => fetch('/api/1').then(r => r.json()),
  () => fetch('/api/2').then(r => r.json()),
  () => fetch('/api/3').then(r => r.json())
];

const results = await asyncParallel(tasks);
// Results in order: [data1, data2, data3]
```

### Example 2 - With Concurrency Limit:
```javascript
const tasks = [
  () => fetchWithDelay(1),
  () => fetchWithDelay(2),
  () => fetchWithDelay(3),
  () => fetchWithDelay(4)
];

// Only 2 tasks run at a time
const results = await asyncParallel(tasks, 2);
```

### Example 3 - Rate Limiting API Calls:
```javascript
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tasks = userIds.map(id => () => fetchUser(id));

// Only 3 concurrent requests
const users = await asyncParallel(tasks, 3);
```

## Requirements

1. Execute async functions in parallel
2. Respect concurrency limit (default: unlimited)
3. Return results in the same order as input
4. If any task fails, reject with that error
5. Handle empty task array

## Function Signature

```javascript
async function asyncParallel(tasks, concurrency = Infinity) {
  // Your implementation here
}
```

