# JWT Authentication

**Difficulty:** Medium

## Problem Statement

Implement JWT authentication utilities without external libraries.

## Requirements

1. `generateToken(payload, secret, options)` - Create JWT
2. `verifyToken(token, secret)` - Verify and decode JWT
3. `authMiddleware(secret)` - Express-like auth middleware
4. Handle expiration
5. Proper error handling

## Function Signatures

```javascript
function generateToken(payload, secret, options = {}) {}
function verifyToken(token, secret) {}
function authMiddleware(secret) {}
```

