const { parseJSON } = require('./solution');

describe('JSON Parser', () => {
  describe('primitives', () => {
    test('should parse null', () => {
      expect(parseJSON('null')).toBe(null);
    });

    test('should parse true', () => {
      expect(parseJSON('true')).toBe(true);
    });

    test('should parse false', () => {
      expect(parseJSON('false')).toBe(false);
    });
  });

  describe('numbers', () => {
    test('should parse integers', () => {
      expect(parseJSON('42')).toBe(42);
      expect(parseJSON('0')).toBe(0);
      expect(parseJSON('-17')).toBe(-17);
    });

    test('should parse decimals', () => {
      expect(parseJSON('3.14')).toBe(3.14);
      expect(parseJSON('-2.5')).toBe(-2.5);
      expect(parseJSON('0.123')).toBe(0.123);
    });

    test('should parse scientific notation', () => {
      expect(parseJSON('1e10')).toBe(1e10);
      expect(parseJSON('2.5e-3')).toBe(0.0025);
    });
  });

  describe('strings', () => {
    test('should parse simple strings', () => {
      expect(parseJSON('"hello"')).toBe('hello');
      expect(parseJSON('""')).toBe('');
    });

    test('should parse strings with spaces', () => {
      expect(parseJSON('"hello world"')).toBe('hello world');
    });

    test('should parse escape sequences', () => {
      expect(parseJSON('"hello\\nworld"')).toBe('hello\nworld');
      expect(parseJSON('"tab\\there"')).toBe('tab\there');
      expect(parseJSON('"quote\\"here"')).toBe('quote"here');
      expect(parseJSON('"back\\\\slash"')).toBe('back\\slash');
    });
  });

  describe('arrays', () => {
    test('should parse empty array', () => {
      expect(parseJSON('[]')).toEqual([]);
    });

    test('should parse array of numbers', () => {
      expect(parseJSON('[1, 2, 3]')).toEqual([1, 2, 3]);
    });

    test('should parse array of strings', () => {
      expect(parseJSON('["a", "b", "c"]')).toEqual(['a', 'b', 'c']);
    });

    test('should parse mixed arrays', () => {
      expect(parseJSON('[1, "two", true, null]')).toEqual([1, 'two', true, null]);
    });

    test('should parse nested arrays', () => {
      expect(parseJSON('[1, [2, 3], [4, [5]]]')).toEqual([1, [2, 3], [4, [5]]]);
    });
  });

  describe('objects', () => {
    test('should parse empty object', () => {
      expect(parseJSON('{}')).toEqual({});
    });

    test('should parse simple object', () => {
      expect(parseJSON('{"name": "Alice"}')).toEqual({ name: 'Alice' });
    });

    test('should parse object with multiple properties', () => {
      expect(parseJSON('{"name": "Alice", "age": 30}')).toEqual({
        name: 'Alice',
        age: 30
      });
    });

    test('should parse nested objects', () => {
      expect(parseJSON('{"user": {"name": "Bob"}}')).toEqual({
        user: { name: 'Bob' }
      });
    });

    test('should parse objects with arrays', () => {
      expect(parseJSON('{"numbers": [1, 2, 3]}')).toEqual({
        numbers: [1, 2, 3]
      });
    });
  });

  describe('whitespace handling', () => {
    test('should handle extra whitespace', () => {
      expect(parseJSON('  42  ')).toBe(42);
      expect(parseJSON('  [  1  ,  2  ]  ')).toEqual([1, 2]);
      expect(parseJSON('  {  "a"  :  1  }  ')).toEqual({ a: 1 });
    });

    test('should handle newlines and tabs', () => {
      expect(parseJSON('{\n\t"key": "value"\n}')).toEqual({ key: 'value' });
    });
  });

  describe('error handling', () => {
    test('should throw on invalid JSON', () => {
      expect(() => parseJSON('{')).toThrow();
      expect(() => parseJSON('[1, 2,')).toThrow();
      expect(() => parseJSON('undefined')).toThrow();
      expect(() => parseJSON("{'key': 'value'}")).toThrow(); // Single quotes
    });
  });

  describe('complex JSON', () => {
    test('should parse complex nested structure', () => {
      const json = `{
        "users": [
          {"name": "Alice", "age": 30, "active": true},
          {"name": "Bob", "age": 25, "active": false}
        ],
        "count": 2,
        "metadata": null
      }`;

      expect(parseJSON(json)).toEqual({
        users: [
          { name: 'Alice', age: 30, active: true },
          { name: 'Bob', age: 25, active: false }
        ],
        count: 2,
        metadata: null
      });
    });
  });
});

