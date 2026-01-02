# Memoize Function

**Difficulty:** Easy

## Problem Statement

Implement a `memoize` function that caches the results of expensive function calls and returns the cached result when the same inputs occur again.

Memoization is an optimization technique that speeds up applications by storing the results of expensive function calls.

## Examples

### Example 1:
```javascript
const expensiveAdd = (a, b) => {
  console.log('Computing...');
  return a + b;
};

const memoizedAdd = memoize(expensiveAdd);

memoizedAdd(1, 2); // Logs "Computing..." and returns 3
memoizedAdd(1, 2); // Returns 3 (cached, no log)
memoizedAdd(2, 3); // Logs "Computing..." and returns 5
memoizedAdd(1, 2); // Returns 3 (cached, no log)
```

### Example 2:
```javascript
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

fibonacci(40); // Fast due to memoization
```

## Requirements

1. Cache results based on input arguments
2. Return cached result for repeated calls with same arguments
3. Handle multiple arguments
4. Handle primitive and reference arguments (consider using JSON.stringify for cache key)

## Function Signature

```javascript
function memoize(fn) {
  // Your implementation here
}
```

