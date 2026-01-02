# Understanding Hoisting

**Difficulty:** Easy

## Problem Statement

Implement functions that demonstrate your understanding of JavaScript hoisting behavior.

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution.

### Task 1: `predictOutput`
Given a code scenario, predict what will be logged. Implement a function that returns the expected output.

### Task 2: `fixHoistingBug`
Fix a buggy function that has hoisting issues.

### Task 3: `demonstrateTDZ`
Demonstrate the Temporal Dead Zone (TDZ) with `let` and `const`.

## Examples

### Example 1 - Variable Hoisting:
```javascript
console.log(x); // What gets logged?
var x = 5;
// Answer: undefined (var is hoisted but not initialized)
```

### Example 2 - Function Hoisting:
```javascript
foo(); // What happens?
function foo() { return 'hello'; }
// Answer: Works! Function declarations are fully hoisted
```

### Example 3 - let/const TDZ:
```javascript
console.log(y); // What happens?
let y = 5;
// Answer: ReferenceError (Temporal Dead Zone)
```

## Key Concepts

- `var` declarations are hoisted and initialized with `undefined`
- Function declarations are fully hoisted (name + body)
- Function expressions are NOT hoisted (only the variable)
- `let` and `const` are hoisted but not initialized (TDZ)

## Function Signatures

```javascript
function predictVarHoisting() {
  // Return what console.log(x) would output before: var x = 5;
}

function predictFunctionHoisting() {
  // Return what calling foo() would return before: function foo() { return 'bar'; }
}

function predictLetHoisting() {
  // Return what type of error occurs when accessing let before declaration
}
```

