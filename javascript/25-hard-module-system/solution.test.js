const { ModuleSystem } = require('./solution');

describe('ModuleSystem', () => {
  let ms;

  beforeEach(() => {
    ms = new ModuleSystem();
  });

  describe('basic modules', () => {
    test('should define and require a simple module', () => {
      ms.define('test', (require, module, exports) => {
        exports.value = 42;
      });

      const mod = ms.require('test');
      expect(mod.value).toBe(42);
    });

    test('should support exports with functions', () => {
      ms.define('math', (require, module, exports) => {
        exports.add = (a, b) => a + b;
        exports.multiply = (a, b) => a * b;
      });

      const math = ms.require('math');
      expect(math.add(2, 3)).toBe(5);
      expect(math.multiply(2, 3)).toBe(6);
    });

    test('should support module.exports assignment', () => {
      ms.define('greeter', (require, module, exports) => {
        module.exports = (name) => `Hello, ${name}!`;
      });

      const greet = ms.require('greeter');
      expect(greet('World')).toBe('Hello, World!');
    });

    test('should throw for undefined module', () => {
      expect(() => ms.require('nonexistent')).toThrow();
    });
  });

  describe('dependencies', () => {
    test('should resolve module dependencies', () => {
      ms.define('utils', (require, module, exports) => {
        exports.double = (x) => x * 2;
      });

      ms.define('calculator', (require, module, exports) => {
        const utils = require('utils');
        exports.quadruple = (x) => utils.double(utils.double(x));
      });

      const calc = ms.require('calculator');
      expect(calc.quadruple(5)).toBe(20);
    });

    test('should handle deep dependency chains', () => {
      ms.define('a', (require, module, exports) => {
        exports.value = 'A';
      });

      ms.define('b', (require, module, exports) => {
        const a = require('a');
        exports.value = a.value + 'B';
      });

      ms.define('c', (require, module, exports) => {
        const b = require('b');
        exports.value = b.value + 'C';
      });

      expect(ms.require('c').value).toBe('ABC');
    });
  });

  describe('caching', () => {
    test('should cache module exports', () => {
      let loadCount = 0;

      ms.define('cached', (require, module, exports) => {
        loadCount++;
        exports.value = loadCount;
      });

      const first = ms.require('cached');
      const second = ms.require('cached');

      expect(first).toBe(second);
      expect(loadCount).toBe(1);
    });

    test('should return same instance for cached modules', () => {
      ms.define('singleton', (require, module, exports) => {
        module.exports = { id: Math.random() };
      });

      const a = ms.require('singleton');
      const b = ms.require('singleton');

      expect(a.id).toBe(b.id);
    });
  });

  describe('circular dependencies', () => {
    test('should handle circular dependencies', () => {
      ms.define('a', (require, module, exports) => {
        exports.name = 'A';
        const b = require('b');
        exports.bName = b.name;
      });

      ms.define('b', (require, module, exports) => {
        exports.name = 'B';
        const a = require('a');
        exports.aName = a.name;
      });

      // Should not throw or infinite loop
      const a = ms.require('a');
      expect(a.name).toBe('A');
      expect(a.bName).toBe('B');
    });
  });

  describe('module isolation', () => {
    test('should isolate modules from each other', () => {
      ms.define('counter1', (require, module, exports) => {
        let count = 0;
        exports.increment = () => ++count;
        exports.get = () => count;
      });

      ms.define('counter2', (require, module, exports) => {
        let count = 0;
        exports.increment = () => ++count;
        exports.get = () => count;
      });

      const c1 = ms.require('counter1');
      const c2 = ms.require('counter2');

      c1.increment();
      c1.increment();
      c2.increment();

      expect(c1.get()).toBe(2);
      expect(c2.get()).toBe(1);
    });
  });
});

