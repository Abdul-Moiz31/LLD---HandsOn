const http = require('http');
const { createServer, createJSONServer, parseBody, parseJSONBody } = require('./solution');

const makeRequest = (server, options = {}) => {
  return new Promise((resolve, reject) => {
    const port = server.address().port;
    const req = http.request({
      hostname: 'localhost',
      port,
      path: options.path || '/',
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
};

describe('createServer', () => {
  let server;

  afterEach((done) => {
    if (server) server.close(done);
    else done();
  });

  test('should create a working HTTP server', async () => {
    server = createServer((req, res) => {
      res.end('Hello');
    });

    await new Promise(resolve => server.listen(0, resolve));

    const response = await makeRequest(server);
    expect(response.data).toBe('Hello');
  });

  test('should handle different routes', async () => {
    server = createServer((req, res) => {
      if (req.url === '/hello') res.end('Hello');
      else if (req.url === '/world') res.end('World');
      else res.end('Not Found');
    });

    await new Promise(resolve => server.listen(0, resolve));

    const res1 = await makeRequest(server, { path: '/hello' });
    expect(res1.data).toBe('Hello');

    const res2 = await makeRequest(server, { path: '/world' });
    expect(res2.data).toBe('World');
  });
});

describe('createJSONServer', () => {
  let server;

  afterEach((done) => {
    if (server) server.close(done);
    else done();
  });

  test('should respond with JSON for defined routes', async () => {
    server = createJSONServer({
      '/api/users': { users: ['Alice', 'Bob'] }
    });

    await new Promise(resolve => server.listen(0, resolve));

    const response = await makeRequest(server, { path: '/api/users' });
    expect(JSON.parse(response.data)).toEqual({ users: ['Alice', 'Bob'] });
    expect(response.headers['content-type']).toContain('application/json');
  });

  test('should return 404 for undefined routes', async () => {
    server = createJSONServer({
      '/api/users': { users: [] }
    });

    await new Promise(resolve => server.listen(0, resolve));

    const response = await makeRequest(server, { path: '/api/unknown' });
    expect(response.status).toBe(404);
  });
});

describe('parseBody', () => {
  let server;

  afterEach((done) => {
    if (server) server.close(done);
    else done();
  });

  test('should parse request body', async () => {
    let receivedBody;

    server = createServer(async (req, res) => {
      receivedBody = await parseBody(req);
      res.end('ok');
    });

    await new Promise(resolve => server.listen(0, resolve));

    await makeRequest(server, {
      method: 'POST',
      body: 'test body content'
    });

    expect(receivedBody).toBe('test body content');
  });
});

describe('parseJSONBody', () => {
  let server;

  afterEach((done) => {
    if (server) server.close(done);
    else done();
  });

  test('should parse JSON body', async () => {
    let receivedJSON;

    server = createServer(async (req, res) => {
      receivedJSON = await parseJSONBody(req);
      res.end('ok');
    });

    await new Promise(resolve => server.listen(0, resolve));

    await makeRequest(server, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' })
    });

    expect(receivedJSON).toEqual({ name: 'Test' });
  });
});

