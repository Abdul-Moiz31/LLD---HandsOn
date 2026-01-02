# Compose Function

**Difficulty:** Easy

## Problem Statement

Implement a `compose` function that performs right-to-left function composition. This is the opposite of pipe - the rightmost function is executed first.

Compose is commonly used in functional programming and is the mathematical standard for function composition: (f ∘ g)(x) = f(g(x)).

## Examples

### Example 1:
```javascript
const add5 = (x) => x + 5;
const multiply2 = (x) => x * 2;
const subtract3 = (x) => x - 3;

const composed = compose(subtract3, multiply2, add5);

composed(10); // (10 + 5) * 2 - 3 = 27
// Execution order: add5 -> multiply2 -> subtract3
```

### Example 2:
```javascript
const toUpperCase = (str) => str.toUpperCase();
const exclaim = (str) => `${str}!`;
const greet = (name) => `Hello, ${name}`;

const shout = compose(exclaim, toUpperCase, greet);

shout('alice'); // "HELLO, ALICE!"
```

### Example 3:
```javascript
// Mathematical notation: f(g(h(x)))
const f = (x) => x + 1;
const g = (x) => x * 2;
const h = (x) => x - 3;

compose(f, g, h)(10); // f(g(h(10))) = f(g(7)) = f(14) = 15
```

## Requirements

1. Execute functions from right to left
2. Pass the result of each function to the next
3. Handle any number of functions
4. Handle single function
5. Handle no functions (return identity)

## Function Signature

```javascript
function compose(...fns) {
  // Your implementation here
}
```

