# Crypto Utilities

**Difficulty:** Easy

## Problem Statement

Implement common cryptographic utilities using Node.js crypto module.

## Requirements

1. `hashString(str, algorithm)` - Hash string (md5, sha256)
2. `hashFile(path)` - Hash file contents
3. `generateRandomString(length)` - Secure random string
4. `encrypt(text, key)` / `decrypt(encrypted, key)` - AES encryption

## Function Signatures

```javascript
function hashString(str, algorithm = 'sha256') {}
async function hashFile(filePath) {}
function generateRandomString(length) {}
function encrypt(text, key) {}
function decrypt(encrypted, key) {}
```

