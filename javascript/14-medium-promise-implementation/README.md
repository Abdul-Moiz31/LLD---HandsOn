# Promise Implementation

**Difficulty:** Medium

## Problem Statement

Implement a basic `MyPromise` class that mimics the behavior of JavaScript's native Promise. This is a fundamental exercise for understanding asynchronous JavaScript.

## Examples

### Example 1 - Basic Usage:
```javascript
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

promise.then((value) => {
  console.log(value); // 'Success!' after 1 second
});
```

### Example 2 - Chaining:
```javascript
const promise = new MyPromise((resolve) => resolve(1));

promise
  .then((value) => value + 1)
  .then((value) => value * 2)
  .then((value) => console.log(value)); // 4
```

### Example 3 - Error Handling:
```javascript
const promise = new MyPromise((resolve, reject) => {
  reject(new Error('Something went wrong'));
});

promise
  .then((value) => console.log(value))
  .catch((error) => console.log(error.message)); // 'Something went wrong'
```

## Requirements

1. Accept an executor function with `resolve` and `reject` callbacks
2. Implement `.then()` for success handling and chaining
3. Implement `.catch()` for error handling
4. Handle asynchronous resolution
5. Support promise chaining (returning values and promises from `.then()`)
6. Handle state transitions (pending → fulfilled/rejected)

## Class Signature

```javascript
class MyPromise {
  constructor(executor) {
    // Your implementation here
  }

  then(onFulfilled, onRejected) {
    // Your implementation here
  }

  catch(onRejected) {
    // Your implementation here
  }
}
```

