# Function.prototype.bind Polyfill

**Difficulty:** Easy

## Problem Statement

Implement your own version of `Function.prototype.bind`. The bind method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

## Examples

### Example 1:
```javascript
const person = {
  name: 'Alice',
  greet: function(greeting) {
    return `${greeting}, ${this.name}!`;
  }
};

const greetAlice = person.greet.myBind(person);
greetAlice('Hello'); // Returns "Hello, Alice!"
```

### Example 2 - Partial Application:
```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.myBind(null, 2);
double(5);  // Returns 10
double(10); // Returns 20
```

### Example 3:
```javascript
const obj = { x: 42 };
function getX() {
  return this.x;
}

const boundGetX = getX.myBind(obj);
boundGetX(); // Returns 42
```

## Requirements

1. Set the `this` context to the provided value
2. Support partial application (pre-filling arguments)
3. Combine bound arguments with new arguments when called
4. Add the method to Function.prototype as `myBind`

## Function Signature

```javascript
Function.prototype.myBind = function(context, ...args) {
  // Your implementation here
};
```

