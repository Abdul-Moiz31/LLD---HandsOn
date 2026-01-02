# useSWR (Stale-While-Revalidate) Hook

**Difficulty:** Hard

## Problem Statement

Implement a `useSWR` hook that provides the stale-while-revalidate caching strategy. This pattern returns cached data immediately (stale), then fetches fresh data (revalidate).

This is a simplified version of the popular SWR library by Vercel.

## Examples

### Example 1 - Basic Usage:
```jsx
function Profile() {
  const { data, error, isLoading, isValidating } = useSWR(
    '/api/user',
    fetcher
  );

  if (error) return <div>Error loading</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <p>{data.name}</p>
      {isValidating && <span>Updating...</span>}
    </div>
  );
}
```

### Example 2 - With Revalidation:
```jsx
function LiveData() {
  const { data, mutate } = useSWR('/api/data', fetcher, {
    refreshInterval: 5000 // Refresh every 5 seconds
  });

  const handleUpdate = async () => {
    await updateData();
    mutate(); // Trigger revalidation
  };

  return <div>{data}</div>;
}
```

### Example 3 - Optimistic Updates:
```jsx
const { data, mutate } = useSWR('/api/todos', fetcher);

const addTodo = async (newTodo) => {
  // Optimistically update
  mutate([...data, newTodo], false);
  
  // Actually update
  await postTodo(newTodo);
  
  // Revalidate
  mutate();
};
```

## Requirements

1. Cache responses by key
2. Return stale data immediately if cached
3. Fetch fresh data in background
4. Provide isLoading (no cache), isValidating (fetching) states
5. Support manual revalidation via mutate()
6. Support refreshInterval option
7. Deduplicate concurrent requests

## Hook Signature

```javascript
function useSWR(key, fetcher, options = {}) {
  // options: { refreshInterval, revalidateOnFocus, dedupingInterval }
  // Return { data, error, isLoading, isValidating, mutate }
}
```

