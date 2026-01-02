const { asyncParallel } = require('./solution');

describe('asyncParallel', () => {
  test('should execute all tasks and return results in order', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3)
    ];

    const results = await asyncParallel(tasks);
    expect(results).toEqual([1, 2, 3]);
  });

  test('should handle async tasks with different durations', async () => {
    const tasks = [
      () => new Promise(resolve => setTimeout(() => resolve('slow'), 50)),
      () => new Promise(resolve => setTimeout(() => resolve('fast'), 10)),
      () => new Promise(resolve => setTimeout(() => resolve('medium'), 30))
    ];

    const results = await asyncParallel(tasks);
    expect(results).toEqual(['slow', 'fast', 'medium']);
  });

  test('should respect concurrency limit', async () => {
    let concurrent = 0;
    let maxConcurrent = 0;

    const createTask = (value) => async () => {
      concurrent++;
      maxConcurrent = Math.max(maxConcurrent, concurrent);
      await new Promise(resolve => setTimeout(resolve, 20));
      concurrent--;
      return value;
    };

    const tasks = [1, 2, 3, 4, 5].map(createTask);
    const results = await asyncParallel(tasks, 2);

    expect(results).toEqual([1, 2, 3, 4, 5]);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  test('should reject if any task fails', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.reject(new Error('Task failed')),
      () => Promise.resolve(3)
    ];

    await expect(asyncParallel(tasks)).rejects.toThrow('Task failed');
  });

  test('should handle empty task array', async () => {
    const results = await asyncParallel([]);
    expect(results).toEqual([]);
  });

  test('should handle single task', async () => {
    const tasks = [() => Promise.resolve('only')];
    const results = await asyncParallel(tasks);
    expect(results).toEqual(['only']);
  });

  test('should work with concurrency of 1 (sequential)', async () => {
    const order = [];
    const tasks = [1, 2, 3].map(n => async () => {
      order.push(`start-${n}`);
      await new Promise(resolve => setTimeout(resolve, 10));
      order.push(`end-${n}`);
      return n;
    });

    const results = await asyncParallel(tasks, 1);
    
    expect(results).toEqual([1, 2, 3]);
    expect(order).toEqual([
      'start-1', 'end-1',
      'start-2', 'end-2',
      'start-3', 'end-3'
    ]);
  });

  test('should handle concurrency greater than task count', async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2)
    ];

    const results = await asyncParallel(tasks, 10);
    expect(results).toEqual([1, 2]);
  });
});

