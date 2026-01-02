const { throttle } = require('./solution');

describe('Throttle Function', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should execute immediately on first call', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should ignore calls within the time limit', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should allow call after time limit has passed', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('should pass arguments correctly', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn('arg1', 'arg2');
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  test('should preserve this context', () => {
    const fn = jest.fn(function() {
      return this.value;
    });
    const throttledFn = throttle(fn, 100);
    const obj = { value: 42, throttledFn };

    obj.throttledFn();
    expect(fn.mock.instances[0]).toBe(obj);
  });

  test('should handle rapid calls over multiple intervals', () => {
    const fn = jest.fn();
    const throttledFn = throttle(fn, 100);

    // First call goes through
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);

    // These are ignored
    jest.advanceTimersByTime(30);
    throttledFn();
    jest.advanceTimersByTime(30);
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(1);

    // After 100ms, next call goes through
    jest.advanceTimersByTime(40);
    throttledFn();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

