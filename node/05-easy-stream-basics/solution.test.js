const fs = require('fs');
const path = require('path');
const {
  createReadStream,
  streamCopy,
  createUppercaseStream,
  streamToString,
  stringToStream,
} = require('./solution');

const testDir = path.join(__dirname, 'test-fixtures');

beforeAll(() => {
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }
  fs.writeFileSync(path.join(testDir, 'source.txt'), 'Hello, World!');
});

afterAll(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
});

describe('createReadStream', () => {
  test('should create a readable stream', (done) => {
    const stream = createReadStream(path.join(testDir, 'source.txt'));
    let data = '';

    stream.on('data', (chunk) => {
      data += chunk;
    });

    stream.on('end', () => {
      expect(data).toBe('Hello, World!');
      done();
    });
  });
});

describe('streamCopy', () => {
  test('should copy file using streams', async () => {
    const source = path.join(testDir, 'source.txt');
    const dest = path.join(testDir, 'copy.txt');

    await streamCopy(source, dest);

    const content = fs.readFileSync(dest, 'utf8');
    expect(content).toBe('Hello, World!');
  });
});

describe('createUppercaseStream', () => {
  test('should transform text to uppercase', async () => {
    const input = stringToStream('hello world');
    const uppercase = createUppercaseStream();

    input.pipe(uppercase);

    const result = await streamToString(uppercase);
    expect(result).toBe('HELLO WORLD');
  });
});

describe('streamToString', () => {
  test('should convert stream to string', async () => {
    const stream = createReadStream(path.join(testDir, 'source.txt'));
    const result = await streamToString(stream);

    expect(result).toBe('Hello, World!');
  });
});

describe('stringToStream', () => {
  test('should convert string to readable stream', async () => {
    const stream = stringToStream('Test string');
    const result = await streamToString(stream);

    expect(result).toBe('Test string');
  });

  test('should emit data events', (done) => {
    const stream = stringToStream('chunk');
    let received = '';

    stream.on('data', (chunk) => {
      received += chunk;
    });

    stream.on('end', () => {
      expect(received).toBe('chunk');
      done();
    });
  });
});

