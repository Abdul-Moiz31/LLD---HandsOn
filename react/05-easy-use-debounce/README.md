# useDebounce Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useDebounce` custom hook that returns a debounced value. The value only updates after the specified delay has passed without changes.

## Examples

### Example 1 - Search Input:
```jsx
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      // Only search after user stops typing for 500ms
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Example 2 - Auto-save:
```jsx
function Editor() {
  const [content, setContent] = useState('');
  const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    if (debouncedContent) {
      saveDraft(debouncedContent);
    }
  }, [debouncedContent]);

  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
```

## Requirements

1. Return initial value immediately
2. Update returned value only after delay with no changes
3. Reset timer when value changes
4. Clean up timeout on unmount
5. Handle value changes during delay

## Hook Signature

```javascript
function useDebounce(value, delay) {
  // Return debounced value
}
```

