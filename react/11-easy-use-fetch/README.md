# useFetch Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useFetch` custom hook that handles data fetching with loading and error states.

## Examples

### Example 1 - Basic Fetch:
```jsx
function UserList() {
  const { data, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Example 2 - With Options:
```jsx
function CreatePost() {
  const { data, loading, error } = useFetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'New Post' })
  });

  // ...
}
```

### Example 3 - Refetch:
```jsx
function RefreshableData() {
  const { data, loading, refetch } = useFetch('/api/data');

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch} disabled={loading}>
        Refresh
      </button>
    </div>
  );
}
```

## Requirements

1. Return data, loading, and error states
2. Fetch data on mount
3. Handle fetch errors
4. Provide refetch function
5. Cancel fetch on unmount
6. Support fetch options

## Hook Signature

```javascript
function useFetch(url, options = {}) {
  // Return { data, loading, error, refetch }
}
```

