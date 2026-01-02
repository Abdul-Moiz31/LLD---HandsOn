# useLocalStorage Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useLocalStorage` custom hook that syncs state with localStorage, persisting values across page reloads.

## Examples

### Example 1 - Persist Theme:
```jsx
function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
// Value persists after page refresh
```

### Example 2 - Remember User Preferences:
```jsx
function Settings() {
  const [settings, setSettings] = useLocalStorage('settings', {
    notifications: true,
    fontSize: 16
  });

  const toggleNotifications = () => {
    setSettings(prev => ({
      ...prev,
      notifications: !prev.notifications
    }));
  };

  return (
    <button onClick={toggleNotifications}>
      Notifications: {settings.notifications ? 'On' : 'Off'}
    </button>
  );
}
```

## Requirements

1. Initialize from localStorage if value exists
2. Use default value if localStorage is empty
3. Update localStorage when value changes
4. Handle JSON serialization/deserialization
5. Handle localStorage errors gracefully

## Hook Signature

```javascript
function useLocalStorage(key, initialValue) {
  // Return [storedValue, setValue]
}
```

