const fs = require('fs');
const path = require('path');
const { readFileAsync, readFileCallback, readJSONFile } = require('./solution');

// Create test fixtures
const testDir = path.join(__dirname, 'test-fixtures');
const testFile = path.join(testDir, 'test.txt');
const testJSON = path.join(testDir, 'test.json');

beforeAll(() => {
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
  fs.writeFileSync(testFile, 'Hello, World!');
  fs.writeFileSync(testJSON, JSON.stringify({ name: 'Test', value: 42 }));
});

afterAll(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
});

describe('readFileAsync', () => {
  test('should read file contents', async () => {
    const content = await readFileAsync(testFile);
    expect(content).toBe('Hello, World!');
  });

  test('should use default utf8 encoding', async () => {
    const content = await readFileAsync(testFile);
    expect(typeof content).toBe('string');
  });

  test('should reject for non-existent file', async () => {
    await expect(readFileAsync('non-existent.txt')).rejects.toThrow();
  });
});

describe('readFileCallback', () => {
  test('should read file with callback', (done) => {
    readFileCallback(testFile, (err, content) => {
      expect(err).toBeNull();
      expect(content).toBe('Hello, World!');
      done();
    });
  });

  test('should pass error for non-existent file', (done) => {
    readFileCallback('non-existent.txt', (err, content) => {
      expect(err).toBeTruthy();
      expect(err.code).toBe('ENOENT');
      done();
    });
  });
});

describe('readJSONFile', () => {
  test('should read and parse JSON file', async () => {
    const data = await readJSONFile(testJSON);
    expect(data).toEqual({ name: 'Test', value: 42 });
  });

  test('should reject for invalid JSON', async () => {
    const invalidJSON = path.join(testDir, 'invalid.json');
    fs.writeFileSync(invalidJSON, 'not valid json');
    
    await expect(readJSONFile(invalidJSON)).rejects.toThrow();
  });

  test('should reject for non-existent file', async () => {
    await expect(readJSONFile('non-existent.json')).rejects.toThrow();
  });
});

