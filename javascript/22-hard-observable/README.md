# Observable/Reactive Pattern

**Difficulty:** Hard

## Problem Statement

Implement an Observable class that enables reactive programming patterns. Observables are lazy push collections that can emit multiple values over time.

This is a simplified version of RxJS Observables.

## Examples

### Example 1 - Basic Observable:
```javascript
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

observable.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Done')
});
// Logs: 1, 2, 3, "Done"
```

### Example 2 - Async Observable:
```javascript
const timer = new Observable((subscriber) => {
  let count = 0;
  const id = setInterval(() => {
    subscriber.next(count++);
    if (count === 5) {
      subscriber.complete();
    }
  }, 1000);

  // Cleanup function
  return () => clearInterval(id);
});

const subscription = timer.subscribe({
  next: console.log
});

// Later: subscription.unsubscribe();
```

### Example 3 - Operators:
```javascript
const numbers = Observable.from([1, 2, 3, 4, 5]);

numbers
  .map(x => x * 2)
  .filter(x => x > 4)
  .subscribe({ next: console.log });
// Logs: 6, 8, 10
```

## Requirements

1. Create Observable class with subscribe method
2. Subscriber with next(), error(), complete() methods
3. Subscription with unsubscribe() method
4. Implement map() operator
5. Implement filter() operator
6. Implement static `from()` method
7. Handle cleanup on unsubscribe

## Class Signature

```javascript
class Observable {
  constructor(subscribe) {
    // Your implementation
  }

  subscribe(observer) {
    // Returns subscription
  }

  map(transformFn) {
    // Returns new Observable
  }

  filter(predicateFn) {
    // Returns new Observable
  }

  static from(iterable) {
    // Creates Observable from array/iterable
  }
}
```

