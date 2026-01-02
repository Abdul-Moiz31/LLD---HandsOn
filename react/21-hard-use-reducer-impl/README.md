# useReducer Implementation

**Difficulty:** Hard

## Problem Statement

Implement a custom `useReducer` hook from scratch using only `useState`. This helps understand how useReducer works internally and the reducer pattern.

## Examples

### Example 1 - Counter Reducer:
```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

function Counter() {
  const [state, dispatch] = useMyReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### Example 2 - With Init Function:
```jsx
const init = (initialCount) => ({ count: initialCount * 2 });

function DoubleCounter({ initialCount }) {
  const [state, dispatch] = useMyReducer(reducer, initialCount, init);
  // Initial state will be { count: initialCount * 2 }
}
```

## Requirements

1. Accept reducer function and initial state
2. Return current state and dispatch function
3. Call reducer with current state and action
4. Support optional init function (lazy initialization)
5. Ensure dispatch is stable (same reference across renders)

## Hook Signature

```javascript
function useMyReducer(reducer, initialArg, init) {
  // Return [state, dispatch]
}
```

