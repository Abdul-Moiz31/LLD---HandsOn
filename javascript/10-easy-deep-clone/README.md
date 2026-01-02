# Deep Clone

**Difficulty:** Easy

## Problem Statement

Implement a `deepClone` function that creates a deep copy of an object. The clone should be completely independent of the original - modifying the clone should not affect the original.

## Examples

### Example 1:
```javascript
const original = {
  name: 'Alice',
  age: 30,
  address: {
    city: 'NYC',
    zip: '10001'
  }
};

const clone = deepClone(original);
clone.address.city = 'LA';

console.log(original.address.city); // 'NYC' (unchanged)
console.log(clone.address.city);    // 'LA'
```

### Example 2:
```javascript
const original = {
  numbers: [1, 2, [3, 4]],
  date: new Date('2024-01-01')
};

const clone = deepClone(original);
clone.numbers[2].push(5);

console.log(original.numbers[2]); // [3, 4] (unchanged)
console.log(clone.numbers[2]);    // [3, 4, 5]
```

## Requirements

1. Deep copy all nested objects and arrays
2. Handle primitive values (string, number, boolean, null, undefined)
3. Handle Date objects
4. Handle arrays (including nested arrays)
5. Handle circular references (bonus)

## Function Signature

```javascript
function deepClone(obj) {
  // Your implementation here
}
```

