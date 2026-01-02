const { compose } = require('./solution');

describe('Compose Function', () => {
  test('should compose functions right-to-left', () => {
    const add5 = (x) => x + 5;
    const multiply2 = (x) => x * 2;
    const subtract3 = (x) => x - 3;

    const composed = compose(subtract3, multiply2, add5);
    expect(composed(10)).toBe(27); // (10 + 5) * 2 - 3
  });

  test('should work with string transformations', () => {
    const toUpperCase = (str) => str.toUpperCase();
    const exclaim = (str) => `${str}!`;
    const greet = (name) => `Hello, ${name}`;

    const shout = compose(exclaim, toUpperCase, greet);
    expect(shout('alice')).toBe('HELLO, ALICE!');
  });

  test('should follow mathematical notation f(g(h(x)))', () => {
    const f = (x) => x + 1;
    const g = (x) => x * 2;
    const h = (x) => x - 3;

    expect(compose(f, g, h)(10)).toBe(15); // f(g(h(10))) = f(g(7)) = f(14) = 15
  });

  test('should handle single function', () => {
    const double = (x) => x * 2;
    const composed = compose(double);
    expect(composed(5)).toBe(10);
  });

  test('should return identity for no functions', () => {
    const composed = compose();
    expect(composed(42)).toBe(42);
    expect(composed('hello')).toBe('hello');
  });

  test('should preserve right-to-left execution order', () => {
    const log = [];
    const fn1 = (x) => { log.push(1); return x; };
    const fn2 = (x) => { log.push(2); return x; };
    const fn3 = (x) => { log.push(3); return x; };

    compose(fn1, fn2, fn3)('test');
    expect(log).toEqual([3, 2, 1]); // Right to left
  });

  test('should work with object transformations', () => {
    const addId = (obj) => ({ ...obj, id: 1 });
    const addTimestamp = (obj) => ({ ...obj, timestamp: 12345 });
    const addName = (obj) => ({ ...obj, name: 'test' });

    const composed = compose(addId, addTimestamp, addName);
    expect(composed({})).toEqual({
      name: 'test',
      timestamp: 12345,
      id: 1
    });
  });
});

