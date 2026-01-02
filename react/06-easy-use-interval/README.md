# useInterval Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useInterval` custom hook that sets up an interval and properly cleans it up. Based on Dan Abramov's famous blog post about declarative intervals in React.

## Examples

### Example 1 - Simple Timer:
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  return <div>Seconds: {seconds}</div>;
}
```

### Example 2 - Pausable Counter:
```jsx
function PausableCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => setCount(c => c + 1),
    isRunning ? 100 : null // null pauses the interval
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
```

## Key Challenge

A naive setInterval implementation has a stale closure problem - the callback captures old state values. Your hook should ensure the callback always has access to the latest values.

## Requirements

1. Call callback at specified interval
2. Clean up on unmount
3. Handle changing callbacks (no stale closures)
4. Support null delay to pause interval
5. Restart interval when delay changes

## Hook Signature

```javascript
function useInterval(callback, delay) {
  // No return value
}
```

