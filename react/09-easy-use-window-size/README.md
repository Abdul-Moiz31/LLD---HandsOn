# useWindowSize Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useWindowSize` custom hook that tracks the browser window dimensions and updates on resize.

## Examples

### Example 1 - Responsive Component:
```jsx
function ResponsiveLayout() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window: {width} x {height}</p>
      {width < 768 ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
```

### Example 2 - Canvas Sizing:
```jsx
function FullscreenCanvas() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
  }, [width, height]);

  return <canvas ref={canvasRef} />;
}
```

## Requirements

1. Return current window width and height
2. Update on window resize
3. Debounce resize events (optional but recommended)
4. Clean up event listener on unmount
5. Handle SSR (window undefined)

## Hook Signature

```javascript
function useWindowSize() {
  // Return { width, height }
}
```

