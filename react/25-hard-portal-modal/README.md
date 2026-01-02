# Portal and Modal System

**Difficulty:** Hard

## Problem Statement

Implement a Portal component and a Modal system that renders content outside the normal React tree while maintaining React's event bubbling behavior.

## Examples

### Example 1 - Basic Portal:
```jsx
function App() {
  return (
    <div>
      <h1>App Content</h1>
      <Portal container={document.body}>
        <div className="tooltip">I'm rendered at body level!</div>
      </Portal>
    </div>
  );
}
```

### Example 2 - Modal Component:
```jsx
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Confirmation</Modal.Header>
        <Modal.Body>Are you sure you want to proceed?</Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
```

### Example 3 - With Backdrop and Close on Escape:
```jsx
<Modal 
  isOpen={isOpen} 
  onClose={handleClose}
  closeOnBackdrop={true}
  closeOnEscape={true}
>
  <Modal.Body>Modal content here</Modal.Body>
</Modal>
```

## Requirements

### Portal:
1. Render children into a DOM node outside parent hierarchy
2. Create container element if not provided
3. Clean up container on unmount

### Modal:
1. Use Portal to render at document.body
2. Render backdrop overlay
3. Support isOpen prop to control visibility
4. Call onClose when backdrop clicked (optional)
5. Call onClose on Escape key (optional)
6. Trap focus within modal
7. Prevent body scroll when open
8. Provide compound components (Header, Body, Footer)

## Component Signatures

```jsx
function Portal({ children, container }) {
  // Render children into container
}

function Modal({ isOpen, onClose, children, closeOnBackdrop, closeOnEscape }) {
  // Render modal with backdrop
}

Modal.Header = function ModalHeader({ children }) {};
Modal.Body = function ModalBody({ children }) {};
Modal.Footer = function ModalFooter({ children }) {};
```

