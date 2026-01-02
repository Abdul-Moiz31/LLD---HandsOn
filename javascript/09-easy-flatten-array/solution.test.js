const { flatten } = require('./solution');

describe('Flatten Array', () => {
  test('should flatten one level deep', () => {
    const arr = [1, [2, [3, [4]]]];
    expect(flatten(arr, 1)).toEqual([1, 2, [3, [4]]]);
  });

  test('should flatten two levels deep', () => {
    const arr = [1, [2, [3, [4]]]];
    expect(flatten(arr, 2)).toEqual([1, 2, 3, [4]]);
  });

  test('should fully flatten when no depth specified', () => {
    const arr = [1, [2, [3, [4]]]];
    expect(flatten(arr)).toEqual([1, 2, 3, 4]);
  });

  test('should handle mixed nested arrays', () => {
    const arr = [[1, 2], [3, [4, 5]], 6];
    expect(flatten(arr, 1)).toEqual([1, 2, 3, [4, 5], 6]);
    expect(flatten(arr)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('should handle already flat array', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(flatten(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  test('should handle empty arrays', () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([[], [], []])).toEqual([]);
  });

  test('should handle depth of 0', () => {
    const arr = [1, [2, 3]];
    expect(flatten(arr, 0)).toEqual([1, [2, 3]]);
  });

  test('should not modify original array', () => {
    const arr = [1, [2, [3]]];
    const original = JSON.stringify(arr);
    flatten(arr);
    expect(JSON.stringify(arr)).toBe(original);
  });

  test('should handle arrays with different types', () => {
    const arr = [1, ['a', [true, [null]]]];
    expect(flatten(arr)).toEqual([1, 'a', true, null]);
  });
});

