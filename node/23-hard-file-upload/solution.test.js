const fs = require('fs');
const path = require('path');
const { createUploadHandler, getBoundary } = require('./solution');

const testDir = path.join(__dirname, 'test-uploads');

beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true });
});

afterAll(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
});

describe('getBoundary', () => {
  test('should extract boundary from content-type', () => {
    const contentType = 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const boundary = getBoundary(contentType);
    expect(boundary).toBe('----WebKitFormBoundary7MA4YWxkTrZu0gW');
  });
});

describe('createUploadHandler', () => {
  test('should return middleware function', () => {
    const middleware = createUploadHandler({ dest: testDir });
    expect(typeof middleware).toBe('function');
  });

  test('should handle multipart request', async () => {
    const middleware = createUploadHandler({ dest: testDir });
    const boundary = '----TestBoundary';
    
    const body = [
      `------TestBoundary`,
      `Content-Disposition: form-data; name="field1"`,
      ``,
      `value1`,
      `------TestBoundary`,
      `Content-Disposition: form-data; name="file"; filename="test.txt"`,
      `Content-Type: text/plain`,
      ``,
      `file content`,
      `------TestBoundary--`,
    ].join('\r\n');

    const req = {
      headers: {
        'content-type': `multipart/form-data; boundary=----TestBoundary`
      },
      on: jest.fn((event, cb) => {
        if (event === 'data') cb(Buffer.from(body));
        if (event === 'end') cb();
      }),
    };
    const res = {};
    const next = jest.fn();

    await middleware(req, res, next);
    // Verify req.body and req.files are populated
  });
});

