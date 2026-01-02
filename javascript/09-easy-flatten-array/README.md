# Flatten Array

**Difficulty:** Easy

## Problem Statement

Implement a `flatten` function that flattens a nested array to a specified depth. If no depth is provided, it should completely flatten the array.

This is similar to `Array.prototype.flat()`.

## Examples

### Example 1:
```javascript
const arr = [1, [2, [3, [4]]]];

flatten(arr, 1);    // [1, 2, [3, [4]]]
flatten(arr, 2);    // [1, 2, 3, [4]]
flatten(arr);       // [1, 2, 3, 4] (fully flattened)
```

### Example 2:
```javascript
const arr = [[1, 2], [3, [4, 5]], 6];

flatten(arr, 1);    // [1, 2, 3, [4, 5], 6]
flatten(arr);       // [1, 2, 3, 4, 5, 6]
```

### Example 3:
```javascript
const arr = [1, 2, 3];
flatten(arr);       // [1, 2, 3] (already flat)
```

## Requirements

1. Flatten arrays to specified depth (default: Infinity for complete flattening)
2. Handle deeply nested arrays
3. Preserve non-array elements
4. Return a new array (don't modify original)

## Function Signature

```javascript
function flatten(arr, depth = Infinity) {
  // Your implementation here
}
```

