# useAsync Hook

**Difficulty:** Medium

## Problem Statement

Implement a `useAsync` hook that handles async function execution with loading, error, and data states. More flexible than useFetch - works with any async function.

## Examples

### Example 1 - Execute Async Function:
```jsx
function UserProfile({ userId }) {
  const { execute, data, loading, error } = useAsync(
    () => fetchUser(userId),
    false // Don't run immediately
  );

  return (
    <div>
      <button onClick={execute}>Load User</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Name: {data.name}</p>}
    </div>
  );
}
```

### Example 2 - Immediate Execution:
```jsx
function Dashboard() {
  const { data, loading } = useAsync(fetchDashboardData, true);

  if (loading) return <Spinner />;
  return <DashboardContent data={data} />;
}
```

### Example 3 - With Arguments:
```jsx
function Search() {
  const [query, setQuery] = useState('');
  const { execute, data, loading } = useAsync(searchAPI, false);

  const handleSearch = () => {
    execute(query); // Pass arguments to async function
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

## Requirements

1. Return execute function, data, loading, and error
2. Support immediate execution option
3. Pass arguments through execute function
4. Handle cancellation on unmount
5. Track execution status (idle, pending, success, error)

## Hook Signature

```javascript
function useAsync(asyncFunction, immediate = true) {
  // Return { execute, data, loading, error, status }
}
```

