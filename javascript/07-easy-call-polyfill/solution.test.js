require('./solution');

describe('Function.prototype.myCall', () => {
  test('should call function with specified context', () => {
    function getName() {
      return this.name;
    }

    const person = { name: 'Alice' };
    expect(getName.myCall(person)).toBe('Alice');
  });

  test('should pass arguments to the function', () => {
    function greet(greeting) {
      return `${greeting}, ${this.name}!`;
    }

    const person = { name: 'Bob' };
    expect(greet.myCall(person, 'Hello')).toBe('Hello, Bob!');
  });

  test('should pass multiple arguments', () => {
    function introduce(greeting, punctuation) {
      return `${greeting}, I'm ${this.name}${punctuation}`;
    }

    const person = { name: 'Carol' };
    expect(introduce.myCall(person, 'Hi', '!')).toBe("Hi, I'm Carol!");
  });

  test('should work with methods borrowing', () => {
    const numbers = {
      values: [1, 2, 3],
      getSum: function() {
        return this.values.reduce((a, b) => a + b, 0);
      }
    };

    const otherNumbers = { values: [10, 20, 30] };
    expect(numbers.getSum.myCall(otherNumbers)).toBe(60);
  });

  test('should return function result', () => {
    function multiply(a, b) {
      return a * b;
    }

    expect(multiply.myCall(null, 3, 4)).toBe(12);
  });

  test('should handle no arguments', () => {
    function getAnswer() {
      return 42;
    }

    expect(getAnswer.myCall(null)).toBe(42);
  });

  test('should handle undefined/null context', () => {
    function sumArgs(...args) {
      return args.reduce((a, b) => a + b, 0);
    }

    expect(sumArgs.myCall(undefined, 1, 2, 3)).toBe(6);
    expect(sumArgs.myCall(null, 1, 2, 3)).toBe(6);
  });
});

