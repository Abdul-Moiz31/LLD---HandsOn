# Promise.race Polyfill

**Difficulty:** Medium

## Problem Statement

Implement `promiseRace`, a function that behaves like `Promise.race()`. It takes an array of promises and returns a single promise that settles as soon as any of the input promises settles (resolves or rejects).

## Examples

### Example 1 - First to Resolve:
```javascript
const promises = [
  new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
  new Promise(resolve => setTimeout(() => resolve('fast'), 50))
];

promiseRace(promises).then(console.log); // 'fast'
```

### Example 2 - First to Reject:
```javascript
const promises = [
  new Promise(resolve => setTimeout(() => resolve('slow'), 100)),
  new Promise((_, reject) => setTimeout(() => reject('error'), 50))
];

promiseRace(promises).catch(console.log); // 'error'
```

### Example 3 - Timeout Pattern:
```javascript
const timeout = new Promise((_, reject) => 
  setTimeout(() => reject('Timeout!'), 5000)
);
const fetchData = fetch('/api/data');

promiseRace([fetchData, timeout])
  .then(handleResponse)
  .catch(handleError);
```

## Requirements

1. Return a promise that settles with the first settled promise
2. If first settlement is fulfillment, resolve with that value
3. If first settlement is rejection, reject with that reason
4. Handle non-promise values (should resolve immediately with first non-promise)

## Function Signature

```javascript
function promiseRace(promises) {
  // Your implementation here
}
```

