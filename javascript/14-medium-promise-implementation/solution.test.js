const { MyPromise } = require('./solution');

describe('MyPromise', () => {
  test('should resolve with a value', (done) => {
    const promise = new MyPromise((resolve) => {
      resolve('success');
    });

    promise.then((value) => {
      expect(value).toBe('success');
      done();
    });
  });

  test('should reject with a reason', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject('error');
    });

    promise.catch((reason) => {
      expect(reason).toBe('error');
      done();
    });
  });

  test('should handle async resolution', (done) => {
    const promise = new MyPromise((resolve) => {
      setTimeout(() => resolve('async success'), 10);
    });

    promise.then((value) => {
      expect(value).toBe('async success');
      done();
    });
  });

  test('should chain .then() calls', (done) => {
    const promise = new MyPromise((resolve) => resolve(1));

    promise
      .then((value) => value + 1)
      .then((value) => value * 2)
      .then((value) => {
        expect(value).toBe(4);
        done();
      });
  });

  test('should handle .catch() after .then()', (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject(new Error('oops'));
    });

    promise
      .then((value) => value)
      .catch((error) => {
        expect(error.message).toBe('oops');
        done();
      });
  });

  test('should handle error thrown in .then()', (done) => {
    const promise = new MyPromise((resolve) => resolve('ok'));

    promise
      .then(() => {
        throw new Error('then error');
      })
      .catch((error) => {
        expect(error.message).toBe('then error');
        done();
      });
  });

  test('should handle returning a promise from .then()', (done) => {
    const promise = new MyPromise((resolve) => resolve(1));

    promise
      .then((value) => {
        return new MyPromise((resolve) => {
          setTimeout(() => resolve(value + 10), 10);
        });
      })
      .then((value) => {
        expect(value).toBe(11);
        done();
      });
  });

  test('should only resolve once', (done) => {
    let resolveCount = 0;

    const promise = new MyPromise((resolve) => {
      resolve('first');
      resolve('second');
    });

    promise.then((value) => {
      resolveCount++;
      expect(value).toBe('first');
    });

    setTimeout(() => {
      expect(resolveCount).toBe(1);
      done();
    }, 50);
  });
});

