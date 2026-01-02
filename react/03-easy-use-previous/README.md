# usePrevious Hook

**Difficulty:** Easy

## Problem Statement

Implement a `usePrevious` custom hook that returns the previous value of a variable. This is useful for comparing current and previous props or state.

## Examples

### Example 1 - Track Previous State:
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### Example 2 - Compare Props:
```jsx
function UserProfile({ userId }) {
  const previousUserId = usePrevious(userId);

  useEffect(() => {
    if (previousUserId !== userId) {
      console.log(`User changed from ${previousUserId} to ${userId}`);
    }
  }, [userId, previousUserId]);

  return <div>User: {userId}</div>;
}
```

## Requirements

1. Return the value from the previous render
2. Return undefined on first render
3. Update the stored value after each render
4. Work with any value type

## Hook Signature

```javascript
function usePrevious(value) {
  // Return previous value
}
```

