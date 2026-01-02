# Curry Function

**Difficulty:** Easy

## Problem Statement

Implement a `curry` function that transforms a function with multiple arguments into a sequence of functions, each taking a single argument.

Currying is a technique where a function with multiple arguments is transformed into a sequence of nested functions. Each function takes exactly one argument.

## Examples

### Example 1:
```javascript
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

curriedAdd(1)(2)(3); // Returns 6
curriedAdd(1, 2)(3); // Returns 6
curriedAdd(1)(2, 3); // Returns 6
curriedAdd(1, 2, 3); // Returns 6
```

### Example 2:
```javascript
function multiply(a, b) {
  return a * b;
}

const curriedMultiply = curry(multiply);
const double = curriedMultiply(2);

double(5);  // Returns 10
double(10); // Returns 20
```

### Example 3:
```javascript
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const curriedGreet = curry(greet);
const sayHello = curriedGreet('Hello');

sayHello('Alice'); // Returns "Hello, Alice!"
sayHello('Bob');   // Returns "Hello, Bob!"
```

## Requirements

1. The curried function should accept arguments one at a time or in groups
2. When enough arguments are provided, execute the original function
3. Handle functions with any number of arguments

## Function Signature

```javascript
function curry(fn) {
  // Your implementation here
}
```

