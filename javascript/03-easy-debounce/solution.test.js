const { debounce } = require('./solution');

describe('Debounce Function', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should delay function execution', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should reset timer on subsequent calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    jest.advanceTimersByTime(50);
    debouncedFn();
    jest.advanceTimersByTime(50);
    debouncedFn();
    jest.advanceTimersByTime(50);

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should pass the latest arguments', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('third');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should preserve this context', () => {
    const fn = jest.fn(function() {
      return this.value;
    });
    const debouncedFn = debounce(fn, 100);
    const obj = { value: 42, debouncedFn };

    obj.debouncedFn();
    jest.advanceTimersByTime(100);

    expect(fn.mock.instances[0]).toBe(obj);
  });

  test('should handle multiple arguments', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('a', 'b', 'c');
    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('a', 'b', 'c');
  });

  test('should allow multiple debounced calls after delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('first');
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    debouncedFn('second');
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

