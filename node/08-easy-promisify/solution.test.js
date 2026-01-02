const { promisify, promisifyAll, callbackify, delay } = require('./solution');

describe('promisify', () => {
  test('should convert callback to promise', async () => {
    const callbackFn = (x, cb) => setTimeout(() => cb(null, x * 2), 10);
    const promiseFn = promisify(callbackFn);
    expect(await promiseFn(5)).toBe(10);
  });

  test('should reject on error', async () => {
    const callbackFn = (cb) => cb(new Error('fail'));
    const promiseFn = promisify(callbackFn);
    await expect(promiseFn()).rejects.toThrow('fail');
  });
});

describe('callbackify', () => {
  test('should convert async to callback', (done) => {
    const asyncFn = async (x) => x * 2;
    const cbFn = callbackify(asyncFn);
    cbFn(5, (err, result) => {
      expect(result).toBe(10);
      done();
    });
  });
});

describe('delay', () => {
  test('should delay execution', async () => {
    const start = Date.now();
    await delay(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(50);
  });
});

describe('promisifyAll', () => {
  test('should add Async methods', async () => {
    const obj = {
      getValue: (cb) => cb(null, 42)
    };
    const promisified = promisifyAll(obj);
    expect(await promisified.getValueAsync()).toBe(42);
  });
});

