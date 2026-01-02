# Retry with Exponential Backoff

**Difficulty:** Medium

## Problem Statement

Implement a `retry` function that retries a failed async operation with exponential backoff. This pattern is essential for handling transient failures in network requests and other unreliable operations.

## Examples

### Example 1 - Basic Retry:
```javascript
const fetchData = async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed');
  return response.json();
};

const result = await retry(fetchData, { maxAttempts: 3 });
```

### Example 2 - With Exponential Backoff:
```javascript
const result = await retry(unreliableOperation, {
  maxAttempts: 5,
  initialDelay: 100,  // First retry after 100ms
  maxDelay: 5000      // Cap delay at 5 seconds
});

// Delays: 100ms, 200ms, 400ms, 800ms (exponential)
```

### Example 3 - With Custom Retry Condition:
```javascript
const result = await retry(apiCall, {
  maxAttempts: 3,
  shouldRetry: (error) => error.status === 503 // Only retry on 503
});
```

## Requirements

1. Retry the function up to `maxAttempts` times
2. Implement exponential backoff between retries
3. Support configurable initial delay and max delay
4. Support custom retry condition (which errors to retry)
5. Return the successful result or throw the last error

## Options

```javascript
{
  maxAttempts: 3,        // Maximum number of attempts
  initialDelay: 100,     // Initial delay in ms
  maxDelay: 10000,       // Maximum delay in ms
  factor: 2,             // Exponential factor
  shouldRetry: (err) => true  // Custom retry condition
}
```

## Function Signature

```javascript
async function retry(fn, options = {}) {
  // Your implementation here
}
```

