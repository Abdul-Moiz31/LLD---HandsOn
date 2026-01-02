# useToggle Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useToggle` custom hook that manages a boolean state with toggle functionality. This is one of the most common custom hooks.

## Examples

### Example 1 - Basic Toggle:
```jsx
function Modal() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'} Modal
      </button>
      {isOpen && <div className="modal">Modal Content</div>}
    </div>
  );
}
```

### Example 2 - With Initial Value:
```jsx
function DarkModeToggle() {
  const [isDark, toggleDark] = useToggle(true);

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <button onClick={toggleDark}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```

### Example 3 - Set Specific Value:
```jsx
function Sidebar() {
  const [isOpen, toggle, setIsOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setIsOpen(true)}>Always Open</button>
      <button onClick={() => setIsOpen(false)}>Always Close</button>
    </div>
  );
}
```

## Requirements

1. Return current boolean state
2. Return toggle function to flip the state
3. Optionally return setter function for explicit control
4. Accept initial value (default: false)

## Hook Signature

```javascript
function useToggle(initialValue = false) {
  // Return [value, toggle, setValue]
}
```

