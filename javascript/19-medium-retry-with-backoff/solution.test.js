const { retry } = require('./solution');

describe('retry with backoff', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should return result on first success', async () => {
    const fn = jest.fn().mockResolvedValue('success');

    const resultPromise = retry(fn, { maxAttempts: 3 });
    jest.runAllTimers();
    const result = await resultPromise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should retry on failure and succeed', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const resultPromise = retry(fn, { maxAttempts: 5, initialDelay: 100 });
    
    // Advance through retries
    await jest.advanceTimersByTimeAsync(100);
    await jest.advanceTimersByTimeAsync(200);
    
    const result = await resultPromise;
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('should throw after max attempts', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('always fails'));

    const resultPromise = retry(fn, { maxAttempts: 3, initialDelay: 100 });
    
    await jest.advanceTimersByTimeAsync(100);
    await jest.advanceTimersByTimeAsync(200);

    await expect(resultPromise).rejects.toThrow('always fails');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('should use exponential backoff', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const resultPromise = retry(fn, { 
      maxAttempts: 5, 
      initialDelay: 100,
      factor: 2 
    });

    // First attempt fails immediately
    await Promise.resolve();
    expect(fn).toHaveBeenCalledTimes(1);

    // Wait 100ms for second attempt
    await jest.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(2);

    // Wait 200ms for third attempt
    await jest.advanceTimersByTimeAsync(200);
    expect(fn).toHaveBeenCalledTimes(3);

    // Wait 400ms for fourth attempt
    await jest.advanceTimersByTimeAsync(400);
    expect(fn).toHaveBeenCalledTimes(4);

    const result = await resultPromise;
    expect(result).toBe('success');
  });

  test('should respect maxDelay', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const resultPromise = retry(fn, { 
      maxAttempts: 5, 
      initialDelay: 100,
      maxDelay: 150,
      factor: 2 
    });

    await Promise.resolve();
    await jest.advanceTimersByTimeAsync(100); // First retry
    await jest.advanceTimersByTimeAsync(150); // Second retry (capped at 150, not 200)

    const result = await resultPromise;
    expect(result).toBe('success');
  });

  test('should use custom shouldRetry condition', async () => {
    const retryableError = new Error('retry me');
    retryableError.retryable = true;

    const nonRetryableError = new Error('do not retry');
    nonRetryableError.retryable = false;

    const fn = jest.fn()
      .mockRejectedValueOnce(retryableError)
      .mockRejectedValue(nonRetryableError);

    const resultPromise = retry(fn, { 
      maxAttempts: 5,
      initialDelay: 100,
      shouldRetry: (err) => err.retryable === true
    });

    await jest.advanceTimersByTimeAsync(100);

    await expect(resultPromise).rejects.toThrow('do not retry');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

