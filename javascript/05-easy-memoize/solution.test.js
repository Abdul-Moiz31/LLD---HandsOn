const { memoize } = require('./solution');

describe('Memoize Function', () => {
  test('should cache results for same arguments', () => {
    const fn = jest.fn((a, b) => a + b);
    const memoizedFn = memoize(fn);

    expect(memoizedFn(1, 2)).toBe(3);
    expect(memoizedFn(1, 2)).toBe(3);
    expect(memoizedFn(1, 2)).toBe(3);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should compute new results for different arguments', () => {
    const fn = jest.fn((a, b) => a + b);
    const memoizedFn = memoize(fn);

    expect(memoizedFn(1, 2)).toBe(3);
    expect(memoizedFn(2, 3)).toBe(5);
    expect(memoizedFn(3, 4)).toBe(7);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('should handle single argument', () => {
    const fn = jest.fn((x) => x * x);
    const memoizedFn = memoize(fn);

    expect(memoizedFn(5)).toBe(25);
    expect(memoizedFn(5)).toBe(25);
    expect(memoizedFn(3)).toBe(9);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('should handle no arguments', () => {
    let counter = 0;
    const fn = jest.fn(() => ++counter);
    const memoizedFn = memoize(fn);

    expect(memoizedFn()).toBe(1);
    expect(memoizedFn()).toBe(1);
    expect(memoizedFn()).toBe(1);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should handle object arguments', () => {
    const fn = jest.fn((obj) => obj.a + obj.b);
    const memoizedFn = memoize(fn);

    expect(memoizedFn({ a: 1, b: 2 })).toBe(3);
    expect(memoizedFn({ a: 1, b: 2 })).toBe(3);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should differentiate between different object arguments', () => {
    const fn = jest.fn((obj) => obj.value);
    const memoizedFn = memoize(fn);

    expect(memoizedFn({ value: 1 })).toBe(1);
    expect(memoizedFn({ value: 2 })).toBe(2);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('should work with fibonacci example', () => {
    const fn = jest.fn();
    const fibonacci = memoize((n) => {
      fn();
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    });

    expect(fibonacci(10)).toBe(55);
    // Without memoization, this would be 177 calls
    // With memoization, it should be 11 calls (0-10)
    expect(fn).toHaveBeenCalledTimes(11);
  });
});

