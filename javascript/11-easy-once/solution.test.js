const { once } = require('./solution');

describe('Once Function', () => {
  test('should only call the function once', () => {
    const fn = jest.fn(() => 'result');
    const onceFn = once(fn);

    onceFn();
    onceFn();
    onceFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should return the first result for all calls', () => {
    let counter = 0;
    const onceFn = once(() => ++counter);

    expect(onceFn()).toBe(1);
    expect(onceFn()).toBe(1);
    expect(onceFn()).toBe(1);
    expect(counter).toBe(1);
  });

  test('should return same reference for object results', () => {
    const onceFn = once(() => ({ value: 42 }));

    const result1 = onceFn();
    const result2 = onceFn();

    expect(result1).toBe(result2);
  });

  test('should pass arguments on first call', () => {
    const fn = jest.fn((a, b) => a + b);
    const onceFn = once(fn);

    expect(onceFn(2, 3)).toBe(5);
    expect(onceFn(10, 20)).toBe(5); // Still returns first result

    expect(fn).toHaveBeenCalledWith(2, 3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should preserve this context', () => {
    const obj = {
      value: 100,
      getValue: once(function() {
        return this.value;
      })
    };

    expect(obj.getValue()).toBe(100);
  });

  test('should handle undefined return value', () => {
    const fn = jest.fn(() => undefined);
    const onceFn = once(fn);

    expect(onceFn()).toBe(undefined);
    expect(onceFn()).toBe(undefined);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should handle null return value', () => {
    const fn = jest.fn(() => null);
    const onceFn = once(fn);

    expect(onceFn()).toBe(null);
    expect(onceFn()).toBe(null);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

