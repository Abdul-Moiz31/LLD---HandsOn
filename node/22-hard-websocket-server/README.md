# WebSocket Server

**Difficulty:** Hard

## Problem Statement

Implement a WebSocket server from scratch using only Node.js core modules.

## Requirements

1. WebSocket handshake (upgrade from HTTP)
2. Parse WebSocket frames
3. Send text and binary messages
4. Handle ping/pong
5. Close handshake
6. Room/channel support

## Class Signature

```javascript
class WebSocketServer extends EventEmitter {
  constructor(options) {}
  handleUpgrade(req, socket, head) {}
  broadcast(message) {}
  close() {}
}

class WebSocketConnection extends EventEmitter {
  constructor(socket) {}
  send(data) {}
  close(code, reason) {}
}
```

