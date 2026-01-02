# Once Function

**Difficulty:** Easy

## Problem Statement

Implement a `once` function that ensures a given function is only called once. Subsequent calls should return the result of the first call.

This is useful for initialization functions, expensive computations that should only run once, or event handlers that should only fire once.

## Examples

### Example 1:
```javascript
let counter = 0;
const incrementOnce = once(() => ++counter);

incrementOnce(); // Returns 1
incrementOnce(); // Returns 1 (cached)
incrementOnce(); // Returns 1 (cached)

console.log(counter); // 1 (only incremented once)
```

### Example 2:
```javascript
const initialize = once(() => {
  console.log('Initializing...');
  return { ready: true };
});

const result1 = initialize(); // Logs "Initializing...", returns { ready: true }
const result2 = initialize(); // No log, returns { ready: true }

result1 === result2; // true (same reference)
```

### Example 3:
```javascript
const fetchConfig = once(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

// First call fetches, subsequent calls return cached promise
```

## Requirements

1. Execute the function only on the first call
2. Return the first call's result for all subsequent calls
3. Preserve the function's arguments and context

## Function Signature

```javascript
function once(fn) {
  // Your implementation here
}
```

