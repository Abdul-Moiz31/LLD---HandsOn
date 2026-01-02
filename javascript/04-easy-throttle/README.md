# Throttle Function

**Difficulty:** Easy

## Problem Statement

Implement a `throttle` function that ensures a function is called at most once within a specified time period.

Unlike debounce, throttle guarantees the function executes at regular intervals during continuous calls.

## Examples

### Example 1:
```javascript
const throttledScroll = throttle(() => {
  console.log('Scroll event processed');
}, 100);

// Rapid scroll events
window.addEventListener('scroll', throttledScroll);
// Function is called at most once every 100ms
```

### Example 2:
```javascript
const throttledClick = throttle((event) => {
  console.log('Button clicked at:', event.timestamp);
}, 1000);

// Even if user clicks rapidly, only processes once per second
```

## Requirements

1. Execute the function immediately on first call
2. Ignore subsequent calls within the time window
3. After the time window, the next call should execute immediately
4. Preserve the `this` context and arguments

## Function Signature

```javascript
function throttle(fn, limit) {
  // Your implementation here
}
```

