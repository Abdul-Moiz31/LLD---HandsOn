const { TaskQueue } = require('./solution');

describe('TaskQueue', () => {
  let queue;

  afterEach(() => {
    if (queue) queue.clear();
  });

  test('should process tasks', async () => {
    queue = new TaskQueue({ concurrency: 1 });
    const results = [];

    await Promise.all([
      queue.add(async () => { results.push(1); return 1; }),
      queue.add(async () => { results.push(2); return 2; }),
    ]);

    expect(results).toEqual([1, 2]);
  });

  test('should respect concurrency', async () => {
    queue = new TaskQueue({ concurrency: 2 });
    let concurrent = 0;
    let maxConcurrent = 0;

    const task = async () => {
      concurrent++;
      maxConcurrent = Math.max(maxConcurrent, concurrent);
      await new Promise(r => setTimeout(r, 50));
      concurrent--;
    };

    await Promise.all([
      queue.add(task),
      queue.add(task),
      queue.add(task),
      queue.add(task),
    ]);

    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  test('should prioritize tasks', async () => {
    queue = new TaskQueue({ concurrency: 1 });
    const order = [];

    queue.add(async () => order.push('low'), { priority: 1 });
    queue.add(async () => order.push('high'), { priority: 10 });
    queue.add(async () => order.push('medium'), { priority: 5 });

    await new Promise(r => setTimeout(r, 100));
    expect(order[0]).toBe('high');
  });

  test('should retry failed tasks', async () => {
    queue = new TaskQueue({ concurrency: 1, retries: 2, retryDelay: 10 });
    let attempts = 0;

    const result = await queue.add(async () => {
      attempts++;
      if (attempts < 3) throw new Error('fail');
      return 'success';
    });

    expect(result).toBe('success');
    expect(attempts).toBe(3);
  });

  test('should emit events', (done) => {
    queue = new TaskQueue({ concurrency: 1 });

    queue.on('task-complete', (result) => {
      expect(result).toBe('done');
      done();
    });

    queue.add(async () => 'done');
  });
});

