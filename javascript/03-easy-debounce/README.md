# Debounce Function

**Difficulty:** Easy

## Problem Statement

Implement a `debounce` function that delays invoking a function until after a specified wait time has elapsed since the last time it was invoked.

Debouncing is useful for scenarios like search input (wait until user stops typing) or window resize events.

## Examples

### Example 1:
```javascript
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// User types quickly
debouncedSearch('h');
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hell');
debouncedSearch('hello');

// Only "hello" is logged after 300ms of no calls
```

### Example 2:
```javascript
const debouncedSave = debounce((data) => {
  console.log('Saving:', data);
}, 1000);

debouncedSave({ text: 'draft 1' });
// Wait 500ms
debouncedSave({ text: 'draft 2' });
// Wait 1000ms
// Only { text: 'draft 2' } is saved
```

## Requirements

1. The function should only be called after the wait period has passed with no new calls
2. Each new call resets the timer
3. The debounced function should receive the arguments from the last call
4. Preserve the `this` context

## Function Signature

```javascript
function debounce(fn, delay) {
  // Your implementation here
}
```

