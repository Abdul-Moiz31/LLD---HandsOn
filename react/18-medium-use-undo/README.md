# useUndo Hook

**Difficulty:** Medium

## Problem Statement

Implement a `useUndo` hook that provides undo/redo functionality for any state value.

## Examples

### Example 1 - Text Editor:
```jsx
function TextEditor() {
  const { value, setValue, undo, redo, canUndo, canRedo } = useUndo('');

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  );
}
```

### Example 2 - Drawing App:
```jsx
function DrawingCanvas() {
  const { value: strokes, setValue: setStrokes, undo, redo, reset } = useUndo([]);

  const addStroke = (stroke) => {
    setStrokes([...strokes, stroke]);
  };

  return (
    <div>
      <Canvas strokes={strokes} onStroke={addStroke} />
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <button onClick={reset}>Clear All</button>
    </div>
  );
}
```

## Requirements

1. Track state history
2. Provide undo function
3. Provide redo function
4. Provide canUndo/canRedo booleans
5. Reset function to clear history
6. Limit history size (optional)

## Hook Signature

```javascript
function useUndo(initialValue) {
  // Return { value, setValue, undo, redo, canUndo, canRedo, reset }
}
```

