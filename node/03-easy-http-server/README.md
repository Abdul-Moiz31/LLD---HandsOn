# Simple HTTP Server

**Difficulty:** Easy

## Problem Statement

Implement a simple HTTP server using Node.js `http` module without any frameworks.

## Examples

### Example 1 - Basic Server:
```javascript
const server = createServer((req, res) => {
  if (req.url === '/') {
    res.end('Hello, World!');
  }
});

server.listen(3000);
```

### Example 2 - JSON Response:
```javascript
const server = createJSONServer({
  '/api/users': { users: ['Alice', 'Bob'] },
  '/api/status': { status: 'ok' }
});
```

## Requirements

1. `createServer(handler)` - Create HTTP server with request handler
2. `createJSONServer(routes)` - Create server that responds with JSON
3. Handle different HTTP methods (GET, POST)
4. Parse request body for POST requests
5. Set appropriate headers

## Function Signatures

```javascript
function createServer(handler) {
  // Return http.Server instance
}

function createJSONServer(routes) {
  // Return server that responds with JSON for matching routes
}

function parseBody(req) {
  // Return Promise<string> with request body
}
```

