# useEventListener Hook

**Difficulty:** Medium

## Problem Statement

Implement a `useEventListener` hook that provides a declarative way to add event listeners to elements or window/document.

## Examples

### Example 1 - Window Event:
```jsx
function KeyboardHandler() {
  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  return <div>Press Escape to close</div>;
}
```

### Example 2 - Element Event:
```jsx
function ClickTracker() {
  const buttonRef = useRef(null);

  useEventListener('click', (event) => {
    console.log('Button clicked!', event);
  }, buttonRef);

  return <button ref={buttonRef}>Track Clicks</button>;
}
```

### Example 3 - Scroll Tracking:
```jsx
function ScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEventListener('scroll', () => {
    setScrollY(window.scrollY);
  });

  return <div>Scroll position: {scrollY}px</div>;
}
```

## Requirements

1. Add event listener on mount
2. Remove event listener on unmount
3. Support window, document, and element refs
4. Handle changing handlers without re-adding listener
5. Support event options (passive, capture, etc.)

## Hook Signature

```javascript
function useEventListener(eventName, handler, element = window, options = {}) {
  // No return value
}
```

