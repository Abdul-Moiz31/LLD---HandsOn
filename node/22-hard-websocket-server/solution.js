const EventEmitter = require('events');
const crypto = require('crypto');
const http = require('http');

const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

class WebSocketServer extends EventEmitter {
  constructor(options = {}) {
    super();
    // TODO: Initialize server
    // If options.server provided, attach to it
    // Otherwise create own HTTP server
  }

  handleUpgrade(req, socket, head) {
    // TODO: Perform WebSocket handshake
    // 1. Validate upgrade headers
    // 2. Calculate accept key
    // 3. Send upgrade response
    // 4. Create WebSocketConnection
    // 5. Emit 'connection' event
  }

  broadcast(message) {
    // TODO: Send to all connected clients
  }

  close() {
    // TODO: Close all connections and server
  }
}

class WebSocketConnection extends EventEmitter {
  constructor(socket) {
    super();
    // TODO: Initialize connection
  }

  send(data) {
    // TODO: Frame and send data
  }

  close(code = 1000, reason = '') {
    // TODO: Send close frame
  }

  // Private methods
  _parseFrame(buffer) {
    // TODO: Parse WebSocket frame
  }

  _createFrame(data, opcode = 0x01) {
    // TODO: Create WebSocket frame
  }
}

function computeAcceptKey(key) {
  return crypto
    .createHash('sha1')
    .update(key + GUID)
    .digest('base64');
}

module.exports = { WebSocketServer, WebSocketConnection, computeAcceptKey };

