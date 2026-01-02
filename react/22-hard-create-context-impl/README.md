# createContext and useContext Implementation

**Difficulty:** Hard

## Problem Statement

Implement a simplified version of React's Context API including `createContext`, a `Provider` component, and a `useContext` hook.

Note: This is an educational exercise to understand how React Context works internally.

## Examples

### Example 1 - Theme Context:
```jsx
const ThemeContext = createMyContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useMyContext(ThemeContext);
  return <div className={theme}>Themed Toolbar</div>;
}
```

### Example 2 - With Default Value:
```jsx
const UserContext = createMyContext({ name: 'Guest' });

function Profile() {
  // Uses default value if no Provider above
  const user = useMyContext(UserContext);
  return <span>{user.name}</span>;
}
```

### Example 3 - Nested Providers:
```jsx
<ThemeContext.Provider value="dark">
  <OuterComponent />
  <ThemeContext.Provider value="light">
    <InnerComponent /> {/* Gets "light" */}
  </ThemeContext.Provider>
</ThemeContext.Provider>
```

## Requirements

1. createMyContext(defaultValue) returns context object
2. Context.Provider component that provides value to children
3. useMyContext(Context) hook that consumes the context value
4. Support default value when no Provider exists
5. Handle nested Providers (closest one wins)

## Function Signatures

```javascript
function createMyContext(defaultValue) {
  // Returns { Provider, _currentValue }
}

function useMyContext(context) {
  // Returns the current context value
}
```

