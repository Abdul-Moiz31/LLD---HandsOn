# useUpdateEffect Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useUpdateEffect` custom hook that works like useEffect but skips the first render. It only runs on updates, not on mount.

## Examples

### Example 1 - Skip Initial Fetch:
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  // Don't search on initial render, only when query changes
  useUpdateEffect(() => {
    search(query).then(setResults);
  }, [query]);

  return <ResultsList results={results} />;
}
```

### Example 2 - Notification on Change:
```jsx
function Form({ formData }) {
  useUpdateEffect(() => {
    toast('Form data has been updated');
  }, [formData]);

  return <FormFields data={formData} />;
}
```

### Example 3 - Track Changes:
```jsx
function Counter({ count }) {
  useUpdateEffect(() => {
    console.log('Count changed to:', count);
  }, [count]);

  return <span>{count}</span>;
}
```

## Requirements

1. Skip callback on initial mount
2. Run callback on subsequent renders when dependencies change
3. Support dependency array like useEffect
4. Support cleanup function

## Hook Signature

```javascript
function useUpdateEffect(callback, dependencies) {
  // No return value
}
```

