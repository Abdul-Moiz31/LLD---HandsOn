# useCounter Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useCounter` custom hook that manages a numeric counter with increment, decrement, and reset functionality.

## Examples

### Example 1 - Basic Counter:
```jsx
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Example 2 - With Step:
```jsx
function StepCounter() {
  const { count, increment, decrement } = useCounter(0, { step: 5 });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+5</button>
      <button onClick={decrement}>-5</button>
    </div>
  );
}
```

### Example 3 - With Min/Max:
```jsx
function BoundedCounter() {
  const { count, increment, decrement } = useCounter(5, {
    min: 0,
    max: 10
  });

  return (
    <div>
      <p>Count: {count} (0-10)</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Requirements

1. Return current count value
2. Return increment function
3. Return decrement function
4. Return reset function (resets to initial value)
5. Return set function for direct value assignment
6. Support options: step, min, max

## Hook Signature

```javascript
function useCounter(initialValue = 0, options = {}) {
  // options: { step: 1, min: -Infinity, max: Infinity }
  // Return { count, increment, decrement, reset, set }
}
```

