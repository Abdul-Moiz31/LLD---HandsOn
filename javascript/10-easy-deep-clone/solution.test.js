const { deepClone } = require('./solution');

describe('Deep Clone', () => {
  test('should clone primitive values', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  test('should clone simple objects', () => {
    const original = { a: 1, b: 2 };
    const clone = deepClone(original);

    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });

  test('should clone nested objects', () => {
    const original = {
      name: 'Alice',
      address: { city: 'NYC', zip: '10001' }
    };
    const clone = deepClone(original);

    clone.address.city = 'LA';
    expect(original.address.city).toBe('NYC');
    expect(clone.address.city).toBe('LA');
  });

  test('should clone arrays', () => {
    const original = [1, 2, [3, 4]];
    const clone = deepClone(original);

    clone[2].push(5);
    expect(original[2]).toEqual([3, 4]);
    expect(clone[2]).toEqual([3, 4, 5]);
  });

  test('should clone Date objects', () => {
    const original = { date: new Date('2024-01-01') };
    const clone = deepClone(original);

    expect(clone.date).toEqual(original.date);
    expect(clone.date).not.toBe(original.date);
    expect(clone.date instanceof Date).toBe(true);
  });

  test('should clone complex nested structures', () => {
    const original = {
      users: [
        { name: 'Alice', tags: ['admin', 'user'] },
        { name: 'Bob', tags: ['user'] }
      ],
      metadata: {
        created: new Date('2024-01-01'),
        settings: { theme: 'dark' }
      }
    };

    const clone = deepClone(original);
    clone.users[0].tags.push('moderator');
    clone.metadata.settings.theme = 'light';

    expect(original.users[0].tags).toEqual(['admin', 'user']);
    expect(original.metadata.settings.theme).toBe('dark');
  });

  test('should handle empty objects and arrays', () => {
    expect(deepClone({})).toEqual({});
    expect(deepClone([])).toEqual([]);
  });

  test('should handle objects with null prototype values', () => {
    const original = { a: null, b: undefined, c: 0, d: '' };
    const clone = deepClone(original);

    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
  });
});

