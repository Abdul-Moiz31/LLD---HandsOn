const crypto = require('crypto');

function base64UrlEncode(data) {
  // TODO: Base64 URL encode
}

function base64UrlDecode(data) {
  // TODO: Base64 URL decode
}

function generateToken(payload, secret, options = {}) {
  // TODO: Create JWT (header.payload.signature)
  // Support expiresIn option
}

function verifyToken(token, secret) {
  // TODO: Verify signature, check expiration, return payload
}

function authMiddleware(secret) {
  // TODO: Return middleware that extracts and verifies JWT
  // from Authorization: Bearer <token> header
}

module.exports = { generateToken, verifyToken, authMiddleware };

