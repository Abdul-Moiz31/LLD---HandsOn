const { Observable } = require('./solution');

describe('Observable', () => {
  describe('basic subscribe', () => {
    test('should emit values to subscriber', () => {
      const values = [];
      const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
      });

      observable.subscribe({ next: (v) => values.push(v) });
      expect(values).toEqual([1, 2, 3]);
    });

    test('should call complete when done', () => {
      const completed = jest.fn();
      const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.complete();
      });

      observable.subscribe({
        next: () => {},
        complete: completed
      });

      expect(completed).toHaveBeenCalledTimes(1);
    });

    test('should call error on error', () => {
      const errorHandler = jest.fn();
      const observable = new Observable((subscriber) => {
        subscriber.error(new Error('Test error'));
      });

      observable.subscribe({
        next: () => {},
        error: errorHandler
      });

      expect(errorHandler).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('unsubscribe', () => {
    test('should stop receiving values after unsubscribe', () => {
      jest.useFakeTimers();
      const values = [];

      const observable = new Observable((subscriber) => {
        let count = 0;
        const id = setInterval(() => subscriber.next(++count), 100);
        return () => clearInterval(id);
      });

      const subscription = observable.subscribe({
        next: (v) => values.push(v)
      });

      jest.advanceTimersByTime(250);
      subscription.unsubscribe();
      jest.advanceTimersByTime(200);

      expect(values).toEqual([1, 2]);
      jest.useRealTimers();
    });

    test('should call cleanup function on unsubscribe', () => {
      const cleanup = jest.fn();
      const observable = new Observable((subscriber) => {
        return cleanup;
      });

      const subscription = observable.subscribe({ next: () => {} });
      subscription.unsubscribe();

      expect(cleanup).toHaveBeenCalledTimes(1);
    });
  });

  describe('map operator', () => {
    test('should transform values', () => {
      const values = [];
      const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
      });

      observable
        .map(x => x * 2)
        .subscribe({ next: (v) => values.push(v) });

      expect(values).toEqual([2, 4, 6]);
    });

    test('should chain multiple maps', () => {
      const values = [];
      const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
      });

      observable
        .map(x => x + 1)
        .map(x => x * 10)
        .subscribe({ next: (v) => values.push(v) });

      expect(values).toEqual([20, 30]);
    });
  });

  describe('filter operator', () => {
    test('should filter values', () => {
      const values = [];
      const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.next(4);
        subscriber.next(5);
      });

      observable
        .filter(x => x % 2 === 0)
        .subscribe({ next: (v) => values.push(v) });

      expect(values).toEqual([2, 4]);
    });
  });

  describe('chaining map and filter', () => {
    test('should work together', () => {
      const values = [];
      const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.next(4);
        subscriber.next(5);
      });

      observable
        .map(x => x * 2)
        .filter(x => x > 4)
        .subscribe({ next: (v) => values.push(v) });

      expect(values).toEqual([6, 8, 10]);
    });
  });

  describe('Observable.from', () => {
    test('should create observable from array', () => {
      const values = [];
      Observable.from([1, 2, 3])
        .subscribe({ next: (v) => values.push(v) });

      expect(values).toEqual([1, 2, 3]);
    });

    test('should call complete after all values', () => {
      const completed = jest.fn();
      Observable.from([1, 2])
        .subscribe({
          next: () => {},
          complete: completed
        });

      expect(completed).toHaveBeenCalledTimes(1);
    });
  });
});

