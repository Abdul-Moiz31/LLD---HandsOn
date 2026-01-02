const { CustomLogger, ProgressTracker, createEmitterFromCallback } = require('./solution');

describe('CustomLogger', () => {
  let logger;

  beforeEach(() => {
    logger = new CustomLogger();
  });

  test('should emit log event', (done) => {
    logger.on('log', (message) => {
      expect(message).toBe('Test message');
      done();
    });

    logger.log('Test message');
  });

  test('should emit error event', (done) => {
    const error = new Error('Test error');

    logger.on('error', (err) => {
      expect(err).toBe(error);
      done();
    });

    logger.error(error);
  });

  test('should emit warn event', (done) => {
    logger.on('warn', (message) => {
      expect(message).toBe('Warning!');
      done();
    });

    logger.warn('Warning!');
  });

  test('should handle multiple listeners', () => {
    const messages = [];

    logger.on('log', (m) => messages.push(`A: ${m}`));
    logger.on('log', (m) => messages.push(`B: ${m}`));

    logger.log('test');

    expect(messages).toEqual(['A: test', 'B: test']);
  });
});

describe('ProgressTracker', () => {
  test('should emit progress events', (done) => {
    const tracker = new ProgressTracker(100);
    const progressValues = [];

    tracker.on('progress', (percent) => {
      progressValues.push(percent);
    });

    tracker.increment(25);
    tracker.increment(25);

    setTimeout(() => {
      expect(progressValues).toEqual([25, 50]);
      done();
    }, 10);
  });

  test('should emit complete when reaching 100%', (done) => {
    const tracker = new ProgressTracker(100);

    tracker.on('complete', () => {
      done();
    });

    tracker.increment(100);
  });

  test('should calculate percentage correctly', () => {
    const tracker = new ProgressTracker(200);

    tracker.increment(50);
    expect(tracker.getProgress()).toBe(25);

    tracker.increment(50);
    expect(tracker.getProgress()).toBe(50);
  });

  test('should reset progress', () => {
    const tracker = new ProgressTracker(100);

    tracker.increment(50);
    expect(tracker.getProgress()).toBe(50);

    tracker.reset();
    expect(tracker.getProgress()).toBe(0);
  });

  test('should not exceed 100%', () => {
    const tracker = new ProgressTracker(100);

    tracker.increment(150);
    expect(tracker.getProgress()).toBe(100);
  });
});

describe('createEmitterFromCallback', () => {
  test('should emit data on success', (done) => {
    const callbackFn = (cb) => {
      setTimeout(() => cb(null, 'result'), 10);
    };

    const emitter = createEmitterFromCallback(callbackFn);

    emitter.on('data', (data) => {
      expect(data).toBe('result');
      done();
    });
  });

  test('should emit error on failure', (done) => {
    const error = new Error('Failed');
    const callbackFn = (cb) => {
      setTimeout(() => cb(error), 10);
    };

    const emitter = createEmitterFromCallback(callbackFn);

    emitter.on('error', (err) => {
      expect(err).toBe(error);
      done();
    });
  });
});

