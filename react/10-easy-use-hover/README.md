# useHover Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useHover` custom hook that tracks whether an element is being hovered.

## Examples

### Example 1 - Basic Hover:
```jsx
function HoverCard() {
  const [hoverRef, isHovered] = useHover();

  return (
    <div
      ref={hoverRef}
      style={{
        background: isHovered ? 'lightblue' : 'white',
        padding: '20px'
      }}
    >
      {isHovered ? 'Hovering!' : 'Hover over me'}
    </div>
  );
}
```

### Example 2 - Tooltip:
```jsx
function TooltipButton() {
  const [ref, isHovered] = useHover();

  return (
    <div style={{ position: 'relative' }}>
      <button ref={ref}>Hover for info</button>
      {isHovered && (
        <div className="tooltip">
          This is helpful information
        </div>
      )}
    </div>
  );
}
```

## Requirements

1. Return a ref to attach to the element
2. Return boolean indicating hover state
3. Handle mouseenter and mouseleave events
4. Clean up event listeners on unmount
5. Handle ref changes

## Hook Signature

```javascript
function useHover() {
  // Return [ref, isHovered]
}
```

