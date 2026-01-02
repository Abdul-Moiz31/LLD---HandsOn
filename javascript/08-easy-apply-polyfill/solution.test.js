require('./solution');

describe('Function.prototype.myApply', () => {
  test('should call function with specified context', () => {
    function getName() {
      return this.name;
    }

    const person = { name: 'Alice' };
    expect(getName.myApply(person)).toBe('Alice');
  });

  test('should pass arguments as array', () => {
    function greet(greeting, punctuation) {
      return `${greeting}, ${this.name}${punctuation}`;
    }

    const person = { name: 'Bob' };
    expect(greet.myApply(person, ['Hello', '!'])).toBe('Hello, Bob!');
  });

  test('should work like Math.max with array', () => {
    function max(...numbers) {
      return Math.max(...numbers);
    }

    expect(max.myApply(null, [5, 6, 2, 3, 7])).toBe(7);
  });

  test('should handle empty args array', () => {
    function getAnswer() {
      return 42;
    }

    expect(getAnswer.myApply(null, [])).toBe(42);
  });

  test('should handle null/undefined args', () => {
    function getAnswer() {
      return 42;
    }

    expect(getAnswer.myApply(null, null)).toBe(42);
    expect(getAnswer.myApply(null, undefined)).toBe(42);
  });

  test('should return function result', () => {
    function sum(...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    }

    expect(sum.myApply(null, [1, 2, 3, 4, 5])).toBe(15);
  });

  test('should work with methods', () => {
    const calculator = {
      base: 10,
      add: function(a, b) {
        return this.base + a + b;
      }
    };

    const otherCalc = { base: 100 };
    expect(calculator.add.myApply(otherCalc, [5, 3])).toBe(108);
  });
});

