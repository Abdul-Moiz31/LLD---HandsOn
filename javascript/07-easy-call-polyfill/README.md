# Function.prototype.call Polyfill

**Difficulty:** Easy

## Problem Statement

Implement your own version of `Function.prototype.call`. The call method calls a function with a given `this` value and arguments provided individually.

## Examples

### Example 1:
```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}

const person = { name: 'Alice' };
greet.myCall(person, 'Hello'); // Returns "Hello, Alice!"
```

### Example 2:
```javascript
function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person = { name: 'Bob' };
introduce.myCall(person, 'Hi', '!'); // Returns "Hi, I'm Bob!"
```

### Example 3:
```javascript
const numbers = {
  values: [1, 2, 3],
  getSum: function() {
    return this.values.reduce((a, b) => a + b, 0);
  }
};

const otherNumbers = { values: [10, 20, 30] };
numbers.getSum.myCall(otherNumbers); // Returns 60
```

## Requirements

1. Invoke the function with the specified `this` context
2. Pass all additional arguments to the function
3. Return the result of the function call
4. Add the method to Function.prototype as `myCall`

## Function Signature

```javascript
Function.prototype.myCall = function(context, ...args) {
  // Your implementation here
};
```

