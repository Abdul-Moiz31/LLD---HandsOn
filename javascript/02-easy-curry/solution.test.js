const { curry } = require('./solution');

describe('Curry Function', () => {
  test('should curry a function with 3 arguments - one at a time', () => {
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);
    
    expect(curriedAdd(1)(2)(3)).toBe(6);
  });

  test('should curry a function with 3 arguments - mixed groups', () => {
    const add = (a, b, c) => a + b + c;
    const curriedAdd = curry(add);
    
    expect(curriedAdd(1, 2)(3)).toBe(6);
    expect(curriedAdd(1)(2, 3)).toBe(6);
    expect(curriedAdd(1, 2, 3)).toBe(6);
  });

  test('should curry a function with 2 arguments', () => {
    const multiply = (a, b) => a * b;
    const curriedMultiply = curry(multiply);
    
    expect(curriedMultiply(3)(4)).toBe(12);
    expect(curriedMultiply(3, 4)).toBe(12);
  });

  test('should allow partial application and reuse', () => {
    const multiply = (a, b) => a * b;
    const curriedMultiply = curry(multiply);
    const double = curriedMultiply(2);
    
    expect(double(5)).toBe(10);
    expect(double(10)).toBe(20);
    expect(double(100)).toBe(200);
  });

  test('should work with string concatenation', () => {
    const greet = (greeting, name) => `${greeting}, ${name}!`;
    const curriedGreet = curry(greet);
    const sayHello = curriedGreet('Hello');
    
    expect(sayHello('Alice')).toBe('Hello, Alice!');
    expect(sayHello('Bob')).toBe('Hello, Bob!');
  });

  test('should handle functions with single argument', () => {
    const identity = (x) => x;
    const curriedIdentity = curry(identity);
    
    expect(curriedIdentity(42)).toBe(42);
  });

  test('should handle functions with many arguments', () => {
    const sum5 = (a, b, c, d, e) => a + b + c + d + e;
    const curriedSum5 = curry(sum5);
    
    expect(curriedSum5(1)(2)(3)(4)(5)).toBe(15);
    expect(curriedSum5(1, 2)(3, 4)(5)).toBe(15);
    expect(curriedSum5(1, 2, 3, 4, 5)).toBe(15);
  });
});

