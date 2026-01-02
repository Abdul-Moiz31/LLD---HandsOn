# Promise.all Polyfill

**Difficulty:** Medium

## Problem Statement

Implement `promiseAll`, a function that behaves like `Promise.all()`. It takes an array of promises and returns a single promise that:
- Resolves with an array of results when ALL promises resolve
- Rejects immediately when ANY promise rejects

## Examples

### Example 1 - All Resolve:
```javascript
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

promiseAll(promises).then(console.log); // [1, 2, 3]
```

### Example 2 - One Rejects:
```javascript
const promises = [
  Promise.resolve(1),
  Promise.reject('Error!'),
  Promise.resolve(3)
];

promiseAll(promises)
  .then(console.log)
  .catch(console.error); // 'Error!'
```

### Example 3 - Async Promises:
```javascript
const promises = [
  new Promise(resolve => setTimeout(() => resolve('a'), 100)),
  new Promise(resolve => setTimeout(() => resolve('b'), 50)),
  new Promise(resolve => setTimeout(() => resolve('c'), 75))
];

promiseAll(promises).then(console.log); // ['a', 'b', 'c'] (in order)
```

## Requirements

1. Return a promise that resolves with an array of all results
2. Results should be in the same order as input promises
3. If any promise rejects, immediately reject with that reason
4. Handle empty array (should resolve with [])
5. Handle non-promise values in the array

## Function Signature

```javascript
function promiseAll(promises) {
  // Your implementation here
}
```

