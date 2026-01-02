# Buffer Utilities

**Difficulty:** Easy

## Problem Statement

Implement utilities for working with Node.js Buffers.

## Requirements

1. `stringToBuffer(str, encoding)` - Convert string to Buffer
2. `bufferToString(buffer, encoding)` - Convert Buffer to string
3. `concatBuffers(...buffers)` - Concatenate multiple Buffers
4. `compareBuffers(buf1, buf2)` - Compare two Buffers

## Function Signatures

```javascript
function stringToBuffer(str, encoding = 'utf8') {}
function bufferToString(buffer, encoding = 'utf8') {}
function concatBuffers(...buffers) {}
function compareBuffers(buf1, buf2) {}
```

