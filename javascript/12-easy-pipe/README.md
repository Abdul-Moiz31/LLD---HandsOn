# Pipe Function

**Difficulty:** Easy

## Problem Statement

Implement a `pipe` function that performs left-to-right function composition. The output of each function is passed as the input to the next function in the pipeline.

## Examples

### Example 1:
```javascript
const add5 = (x) => x + 5;
const multiply2 = (x) => x * 2;
const subtract3 = (x) => x - 3;

const pipeline = pipe(add5, multiply2, subtract3);

pipeline(10); // ((10 + 5) * 2) - 3 = 27
```

### Example 2:
```javascript
const toLowerCase = (str) => str.toLowerCase();
const trim = (str) => str.trim();
const split = (str) => str.split(' ');

const processText = pipe(trim, toLowerCase, split);

processText('  Hello World  '); // ['hello', 'world']
```

### Example 3:
```javascript
const double = (x) => x * 2;
const result = pipe(double)(5); // 10 (single function)
```

## Requirements

1. Execute functions from left to right
2. Pass the result of each function to the next
3. Handle any number of functions
4. Handle single function
5. Handle no functions (return identity)

## Function Signature

```javascript
function pipe(...fns) {
  // Your implementation here
}
```

