const { promiseAll } = require('./solution');

describe('promiseAll', () => {
  test('should resolve with array of results', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];

    const result = await promiseAll(promises);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should maintain order of results', async () => {
    const promises = [
      new Promise(resolve => setTimeout(() => resolve('slow'), 50)),
      new Promise(resolve => setTimeout(() => resolve('fast'), 10)),
      new Promise(resolve => setTimeout(() => resolve('medium'), 30))
    ];

    const result = await promiseAll(promises);
    expect(result).toEqual(['slow', 'fast', 'medium']);
  });

  test('should reject when any promise rejects', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject('Error!'),
      Promise.resolve(3)
    ];

    await expect(promiseAll(promises)).rejects.toBe('Error!');
  });

  test('should handle empty array', async () => {
    const result = await promiseAll([]);
    expect(result).toEqual([]);
  });

  test('should handle non-promise values', async () => {
    const promises = [1, 'two', true];
    const result = await promiseAll(promises);
    expect(result).toEqual([1, 'two', true]);
  });

  test('should handle mixed promises and values', async () => {
    const promises = [
      Promise.resolve(1),
      2,
      Promise.resolve(3)
    ];

    const result = await promiseAll(promises);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should reject with first rejection', async () => {
    const promises = [
      new Promise((_, reject) => setTimeout(() => reject('slow error'), 50)),
      new Promise((_, reject) => setTimeout(() => reject('fast error'), 10))
    ];

    await expect(promiseAll(promises)).rejects.toBe('fast error');
  });

  test('should handle single promise', async () => {
    const result = await promiseAll([Promise.resolve(42)]);
    expect(result).toEqual([42]);
  });
});

