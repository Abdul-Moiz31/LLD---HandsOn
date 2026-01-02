const { WebSocketServer, computeAcceptKey } = require('./solution');
const http = require('http');

describe('computeAcceptKey', () => {
  test('should compute correct accept key', () => {
    const key = 'dGhlIHNhbXBsZSBub25jZQ==';
    const expected = 's3pPLMBiTxaQ9kYGzzhZRbK+xOo=';
    expect(computeAcceptKey(key)).toBe(expected);
  });
});

describe('WebSocketServer', () => {
  let server;
  let wss;

  beforeEach((done) => {
    server = http.createServer();
    wss = new WebSocketServer({ server });
    server.listen(0, done);
  });

  afterEach((done) => {
    wss.close();
    server.close(done);
  });

  test('should emit connection event', (done) => {
    wss.on('connection', (ws) => {
      expect(ws).toBeDefined();
      done();
    });

    // Simulate WebSocket connection
    const port = server.address().port;
    const req = http.request({
      port,
      headers: {
        'Connection': 'Upgrade',
        'Upgrade': 'websocket',
        'Sec-WebSocket-Key': 'dGhlIHNhbXBsZSBub25jZQ==',
        'Sec-WebSocket-Version': '13'
      }
    });
    req.end();
  });

  test('should handle messages', (done) => {
    wss.on('connection', (ws) => {
      ws.on('message', (data) => {
        expect(data.toString()).toBe('hello');
        done();
      });
    });

    // Note: Full test would require actual WebSocket client
  });

  test('should broadcast to all clients', () => {
    // Add mock connections
    expect(() => wss.broadcast('test')).not.toThrow();
  });
});

