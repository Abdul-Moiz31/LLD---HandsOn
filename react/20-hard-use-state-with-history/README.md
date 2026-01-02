# useState with History Implementation

**Difficulty:** Hard

## Problem Statement

Implement a simplified version of React's `useState` hook that includes history tracking. This helps understand how React manages state and re-renders.

Note: This is an educational exercise. The implementation will use React's actual useState internally but adds history/time-travel features.

## Examples

### Example 1 - Basic State with History:
```jsx
function Counter() {
  const [count, setCount, { history, goTo, pointer }] = useStateWithHistory(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      
      <div>
        <h3>History:</h3>
        {history.map((val, idx) => (
          <button 
            key={idx}
            onClick={() => goTo(idx)}
            style={{ fontWeight: idx === pointer ? 'bold' : 'normal' }}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Example 2 - Time Travel:
```jsx
function TimeTravelDemo() {
  const [state, setState, { back, forward, canBack, canForward }] = useStateWithHistory({});

  return (
    <div>
      <button onClick={back} disabled={!canBack}>← Back</button>
      <button onClick={forward} disabled={!canForward}>Forward →</button>
    </div>
  );
}
```

## Requirements

1. Track all state changes in history array
2. Provide goTo function to jump to any point
3. Provide back/forward navigation
4. Provide canBack/canForward booleans
5. Support functional updates like useState
6. Optionally limit history size

## Hook Signature

```javascript
function useStateWithHistory(initialValue, { maxHistory = 100 } = {}) {
  // Return [value, setValue, { history, pointer, goTo, back, forward, canBack, canForward }]
}
```

