require('./solution');

describe('Function.prototype.myBind', () => {
  test('should bind this context', () => {
    const obj = { name: 'Alice' };
    function greet() {
      return `Hello, ${this.name}`;
    }

    const boundGreet = greet.myBind(obj);
    expect(boundGreet()).toBe('Hello, Alice');
  });

  test('should pass arguments', () => {
    const obj = { name: 'Bob' };
    function greet(greeting) {
      return `${greeting}, ${this.name}!`;
    }

    const boundGreet = greet.myBind(obj);
    expect(boundGreet('Hi')).toBe('Hi, Bob!');
  });

  test('should support partial application', () => {
    function multiply(a, b) {
      return a * b;
    }

    const double = multiply.myBind(null, 2);
    expect(double(5)).toBe(10);
    expect(double(10)).toBe(20);
  });

  test('should combine bound and called arguments', () => {
    function sum(a, b, c) {
      return a + b + c;
    }

    const sumWith5 = sum.myBind(null, 5);
    expect(sumWith5(3, 2)).toBe(10);

    const sumWith5And3 = sum.myBind(null, 5, 3);
    expect(sumWith5And3(2)).toBe(10);
  });

  test('should work with methods', () => {
    const person = {
      name: 'Carol',
      introduce: function(greeting, punctuation) {
        return `${greeting}, I'm ${this.name}${punctuation}`;
      }
    };

    const introduce = person.introduce.myBind(person, 'Hello');
    expect(introduce('!')).toBe("Hello, I'm Carol!");
  });

  test('should handle null context', () => {
    function getThis() {
      return this;
    }

    const boundFn = getThis.myBind(null);
    // In non-strict mode, null becomes global; in strict mode, stays null
    const result = boundFn();
    expect(result === null || result === undefined || typeof result === 'object').toBe(true);
  });

  test('should work with object as context', () => {
    const counter = {
      count: 0,
      increment: function(amount) {
        this.count += amount;
        return this.count;
      }
    };

    const boundIncrement = counter.increment.myBind(counter, 5);
    expect(boundIncrement()).toBe(5);
    expect(boundIncrement()).toBe(10);
  });
});

