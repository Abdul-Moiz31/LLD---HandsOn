const { pipe } = require('./solution');

describe('Pipe Function', () => {
  test('should pipe multiple functions left-to-right', () => {
    const add5 = (x) => x + 5;
    const multiply2 = (x) => x * 2;
    const subtract3 = (x) => x - 3;

    const pipeline = pipe(add5, multiply2, subtract3);
    expect(pipeline(10)).toBe(27); // ((10 + 5) * 2) - 3
  });

  test('should work with string transformations', () => {
    const toLowerCase = (str) => str.toLowerCase();
    const trim = (str) => str.trim();
    const split = (str) => str.split(' ');

    const processText = pipe(trim, toLowerCase, split);
    expect(processText('  Hello World  ')).toEqual(['hello', 'world']);
  });

  test('should handle single function', () => {
    const double = (x) => x * 2;
    const pipeline = pipe(double);
    expect(pipeline(5)).toBe(10);
  });

  test('should return identity for no functions', () => {
    const pipeline = pipe();
    expect(pipeline(42)).toBe(42);
    expect(pipeline('hello')).toBe('hello');
  });

  test('should work with array transformations', () => {
    const double = (arr) => arr.map(x => x * 2);
    const filter = (arr) => arr.filter(x => x > 5);
    const sum = (arr) => arr.reduce((a, b) => a + b, 0);

    const pipeline = pipe(double, filter, sum);
    expect(pipeline([1, 2, 3, 4, 5])).toBe(24); // [6, 8, 10] sum = 24
  });

  test('should preserve execution order', () => {
    const log = [];
    const fn1 = (x) => { log.push(1); return x; };
    const fn2 = (x) => { log.push(2); return x; };
    const fn3 = (x) => { log.push(3); return x; };

    pipe(fn1, fn2, fn3)('test');
    expect(log).toEqual([1, 2, 3]);
  });

  test('should work with object transformations', () => {
    const addId = (obj) => ({ ...obj, id: 1 });
    const addTimestamp = (obj) => ({ ...obj, timestamp: 12345 });

    const pipeline = pipe(addId, addTimestamp);
    expect(pipeline({ name: 'test' })).toEqual({
      name: 'test',
      id: 1,
      timestamp: 12345
    });
  });
});

