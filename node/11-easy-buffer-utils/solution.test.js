const { stringToBuffer, bufferToString, concatBuffers, compareBuffers } = require('./solution');

describe('Buffer Utilities', () => {
  test('stringToBuffer should create buffer', () => {
    const buf = stringToBuffer('hello');
    expect(Buffer.isBuffer(buf)).toBe(true);
    expect(buf.toString()).toBe('hello');
  });

  test('bufferToString should convert to string', () => {
    const buf = Buffer.from('world');
    expect(bufferToString(buf)).toBe('world');
  });

  test('concatBuffers should combine buffers', () => {
    const result = concatBuffers(Buffer.from('hello'), Buffer.from(' '), Buffer.from('world'));
    expect(result.toString()).toBe('hello world');
  });

  test('compareBuffers should compare correctly', () => {
    expect(compareBuffers(Buffer.from('abc'), Buffer.from('abc'))).toBe(true);
    expect(compareBuffers(Buffer.from('abc'), Buffer.from('def'))).toBe(false);
  });
});

