# Function.prototype.apply Polyfill

**Difficulty:** Easy

## Problem Statement

Implement your own version of `Function.prototype.apply`. The apply method calls a function with a given `this` value and arguments provided as an array.

## Examples

### Example 1:
```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };
greet.myApply(person, ['Hello', '!']); // Returns "Hello, Alice!"
```

### Example 2:
```javascript
const numbers = [5, 6, 2, 3, 7];
Math.max.myApply(null, numbers); // Returns 7
```

### Example 3:
```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum.myApply(null, [1, 2, 3, 4, 5]); // Returns 15
```

## Requirements

1. Invoke the function with the specified `this` context
2. Accept arguments as an array (or array-like object)
3. Return the result of the function call
4. Handle cases where args is null or undefined
5. Add the method to Function.prototype as `myApply`

## Function Signature

```javascript
Function.prototype.myApply = function(context, args) {
  // Your implementation here
};
```

