# Virtual List Component

**Difficulty:** Hard

## Problem Statement

Implement a `VirtualList` component that efficiently renders large lists by only rendering items visible in the viewport. This is essential for performance when dealing with thousands of items.

## Examples

### Example 1 - Basic Virtual List:
```jsx
function App() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`
  }));

  return (
    <VirtualList
      items={items}
      height={400}
      itemHeight={50}
      renderItem={({ item, style }) => (
        <div style={style} key={item.id}>
          {item.text}
        </div>
      )}
    />
  );
}
```

### Example 2 - With Dynamic Content:
```jsx
<VirtualList
  items={users}
  height={600}
  itemHeight={80}
  overscan={5}  // Render 5 extra items above/below viewport
  renderItem={({ item, index, style }) => (
    <UserCard style={style} user={item} />
  )}
/>
```

## Requirements

1. Only render visible items (+ optional overscan)
2. Maintain scroll position
3. Handle scroll events efficiently (throttle/debounce)
4. Calculate which items to render based on scroll position
5. Apply correct positioning via style prop
6. Support overscan for smoother scrolling

## Component Props

```javascript
VirtualList.propTypes = {
  items: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,      // Container height
  itemHeight: PropTypes.number.isRequired,  // Height of each item
  renderItem: PropTypes.func.isRequired,    // ({ item, index, style }) => element
  overscan: PropTypes.number,               // Extra items to render (default: 3)
};
```

## Component Signature

```jsx
function VirtualList({ items, height, itemHeight, renderItem, overscan = 3 }) {
  // Return scrollable container with positioned items
}
```

