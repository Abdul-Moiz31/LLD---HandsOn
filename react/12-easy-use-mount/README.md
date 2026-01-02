# useMount Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useMount` custom hook that executes a callback only once when the component mounts. This is a semantic wrapper around useEffect for mount-only side effects.

## Examples

### Example 1 - Analytics:
```jsx
function PageView() {
  useMount(() => {
    analytics.trackPageView(window.location.pathname);
  });

  return <div>Page Content</div>;
}
```

### Example 2 - Initial Data Fetch:
```jsx
function Dashboard() {
  const [data, setData] = useState(null);

  useMount(() => {
    fetchDashboardData().then(setData);
  });

  return <div>{data ? 'Loaded' : 'Loading...'}</div>;
}
```

### Example 3 - Focus Input:
```jsx
function SearchForm() {
  const inputRef = useRef(null);

  useMount(() => {
    inputRef.current?.focus();
  });

  return <input ref={inputRef} placeholder="Search..." />;
}
```

## Requirements

1. Execute callback only once on mount
2. Never re-execute on updates
3. Callback should not need dependencies
4. Clean and semantic API

## Hook Signature

```javascript
function useMount(callback) {
  // No return value
}
```

