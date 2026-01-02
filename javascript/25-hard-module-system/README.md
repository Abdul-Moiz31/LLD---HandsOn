# Simple Module System

**Difficulty:** Hard

## Problem Statement

Implement a simple CommonJS-like module system that can define modules, resolve dependencies, and handle circular references.

This exercise helps understand how Node.js require() works under the hood.

## Examples

### Example 1 - Basic Module:
```javascript
const moduleSystem = new ModuleSystem();

moduleSystem.define('math', (require, module, exports) => {
  exports.add = (a, b) => a + b;
  exports.multiply = (a, b) => a * b;
});

const math = moduleSystem.require('math');
math.add(2, 3);      // 5
math.multiply(2, 3); // 6
```

### Example 2 - Module with Dependencies:
```javascript
moduleSystem.define('utils', (require, module, exports) => {
  exports.double = (x) => x * 2;
});

moduleSystem.define('calculator', (require, module, exports) => {
  const utils = require('utils');
  
  exports.quadruple = (x) => utils.double(utils.double(x));
});

const calc = moduleSystem.require('calculator');
calc.quadruple(5); // 20
```

### Example 3 - Module.exports:
```javascript
moduleSystem.define('greeter', (require, module, exports) => {
  module.exports = function(name) {
    return `Hello, ${name}!`;
  };
});

const greet = moduleSystem.require('greeter');
greet('World'); // "Hello, World!"
```

## Requirements

1. `define(name, factory)` - Define a module with a factory function
2. `require(name)` - Load and return a module's exports
3. Factory receives: `require`, `module`, `exports`
4. Module caching (load once, reuse)
5. Handle circular dependencies gracefully
6. Throw error for undefined modules

## Class Signature

```javascript
class ModuleSystem {
  define(name, factory) {
    // Register a module
  }

  require(name) {
    // Load and return module exports
  }
}
```

