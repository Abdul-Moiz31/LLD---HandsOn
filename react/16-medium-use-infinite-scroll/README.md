# useInfiniteScroll Hook

**Difficulty:** Medium

## Problem Statement

Implement a `useInfiniteScroll` hook that detects when user scrolls near the bottom and triggers a load more callback. Used for infinite scrolling lists.

## Examples

### Example 1 - Basic Usage:
```jsx
function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    const newItems = await fetchItems(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(p => p + 1);
    setHasMore(newItems.length > 0);
  };

  const { loaderRef, loading } = useInfiniteScroll({
    loadMore,
    hasMore
  });

  return (
    <div>
      {items.map(item => <Item key={item.id} {...item} />)}
      <div ref={loaderRef}>
        {loading && <Spinner />}
      </div>
    </div>
  );
}
```

### Example 2 - With Threshold:
```jsx
function Feed() {
  const { loaderRef } = useInfiniteScroll({
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    threshold: 200 // Load when 200px from bottom
  });

  // ...
}
```

## Requirements

1. Return a ref to attach to loader element
2. Use Intersection Observer for detection
3. Call loadMore when loader is visible
4. Respect hasMore flag (stop when no more data)
5. Track loading state
6. Support threshold option

## Hook Signature

```javascript
function useInfiniteScroll({ loadMore, hasMore, threshold = 100 }) {
  // Return { loaderRef, loading }
}
```

