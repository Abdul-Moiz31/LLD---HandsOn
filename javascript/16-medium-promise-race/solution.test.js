const { promiseRace } = require('./solution');

describe('promiseRace', () => {
  test('should resolve with first resolved promise', async () => {
    const promises = [
      new Promise(resolve => setTimeout(() => resolve('slow'), 50)),
      new Promise(resolve => setTimeout(() => resolve('fast'), 10))
    ];

    const result = await promiseRace(promises);
    expect(result).toBe('fast');
  });

  test('should reject with first rejected promise', async () => {
    const promises = [
      new Promise(resolve => setTimeout(() => resolve('slow'), 50)),
      new Promise((_, reject) => setTimeout(() => reject('error'), 10))
    ];

    await expect(promiseRace(promises)).rejects.toBe('error');
  });

  test('should resolve if resolve beats reject', async () => {
    const promises = [
      new Promise(resolve => setTimeout(() => resolve('fast'), 10)),
      new Promise((_, reject) => setTimeout(() => reject('slow'), 50))
    ];

    const result = await promiseRace(promises);
    expect(result).toBe('fast');
  });

  test('should handle immediate resolution', async () => {
    const promises = [
      Promise.resolve('immediate'),
      new Promise(resolve => setTimeout(() => resolve('delayed'), 50))
    ];

    const result = await promiseRace(promises);
    expect(result).toBe('immediate');
  });

  test('should handle non-promise values', async () => {
    const promises = [
      'immediate value',
      new Promise(resolve => setTimeout(() => resolve('delayed'), 50))
    ];

    const result = await promiseRace(promises);
    expect(result).toBe('immediate value');
  });

  test('should handle single promise', async () => {
    const result = await promiseRace([Promise.resolve(42)]);
    expect(result).toBe(42);
  });

  test('should work with timeout pattern', async () => {
    const slow = new Promise(resolve => 
      setTimeout(() => resolve('data'), 100)
    );
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject('Timeout!'), 50)
    );

    await expect(promiseRace([slow, timeout])).rejects.toBe('Timeout!');
  });
});

