const fs = require('fs');
const path = require('path');
const { hashString, hashFile, generateRandomString, encrypt, decrypt } = require('./solution');

describe('hashString', () => {
  test('should hash with sha256', () => {
    const hash = hashString('hello');
    expect(hash).toHaveLength(64);
    expect(hash).toBe(hashString('hello')); // Deterministic
  });

  test('should support different algorithms', () => {
    const md5 = hashString('test', 'md5');
    expect(md5).toHaveLength(32);
  });
});

describe('generateRandomString', () => {
  test('should generate string of correct length', () => {
    const str = generateRandomString(16);
    expect(str).toHaveLength(16);
  });

  test('should generate different strings', () => {
    const str1 = generateRandomString(16);
    const str2 = generateRandomString(16);
    expect(str1).not.toBe(str2);
  });
});

describe('encrypt/decrypt', () => {
  test('should encrypt and decrypt text', () => {
    const key = generateRandomString(32);
    const { encrypted, iv } = encrypt('secret message', key);
    const decrypted = decrypt(encrypted, key, iv);
    expect(decrypted).toBe('secret message');
  });
});

describe('hashFile', () => {
  const testFile = path.join(__dirname, 'test.txt');

  beforeAll(() => fs.writeFileSync(testFile, 'test content'));
  afterAll(() => fs.unlinkSync(testFile));

  test('should hash file contents', async () => {
    const hash = await hashFile(testFile);
    expect(hash).toHaveLength(64);
  });
});

