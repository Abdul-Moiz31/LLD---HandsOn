# useClickOutside Hook

**Difficulty:** Easy

## Problem Statement

Implement a `useClickOutside` custom hook that detects clicks outside a referenced element. Commonly used for closing dropdowns, modals, and popovers.

## Examples

### Example 1 - Dropdown:
```jsx
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>
      )}
    </div>
  );
}
```

### Example 2 - Modal:
```jsx
function Modal({ onClose }) {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  return (
    <div className="overlay">
      <div ref={modalRef} className="modal">
        <h2>Modal Title</h2>
        <p>Modal content...</p>
      </div>
    </div>
  );
}
```

## Requirements

1. Accept a ref and a callback
2. Call callback when clicking outside the ref element
3. Don't call callback when clicking inside
4. Clean up event listener on unmount
5. Handle the case when ref is not attached

## Hook Signature

```javascript
function useClickOutside(ref, callback) {
  // No return value
}
```

