# useTimeout Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useTimeout` custom hook that provides a declarative way to use setTimeout with proper cleanup.

## Examples

### Example 1 - Delayed Action:
```jsx
function DelayedMessage() {
  const [show, setShow] = useState(false);

  useTimeout(() => {
    setShow(true);
  }, 3000);

  return show ? <div>Hello!</div> : <div>Wait for it...</div>;
}
```

### Example 2 - Resetable Timeout:
```jsx
function Notification() {
  const [visible, setVisible] = useState(true);
  const { reset, clear } = useTimeout(() => {
    setVisible(false);
  }, 5000);

  return (
    visible && (
      <div>
        <p>This will disappear in 5 seconds</p>
        <button onClick={reset}>Reset Timer</button>
        <button onClick={clear}>Dismiss Now</button>
      </div>
    )
  );
}
```

## Requirements

1. Execute callback after specified delay
2. Clean up on unmount
3. Return reset function to restart timer
4. Return clear function to cancel timer
5. Handle null delay (don't start timer)

## Hook Signature

```javascript
function useTimeout(callback, delay) {
  // Return { reset, clear }
}
```

