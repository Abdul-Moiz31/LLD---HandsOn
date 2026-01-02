# Stream Basics

**Difficulty:** Easy

## Problem Statement

Implement functions that work with Node.js streams for efficient data processing.

## Examples

### Example 1 - Stream File:
```javascript
const stream = createReadStream('large-file.txt');
stream.on('data', chunk => console.log(chunk.length));
stream.on('end', () => console.log('Done'));
```

### Example 2 - Pipe Streams:
```javascript
await streamCopy('source.txt', 'destination.txt');
```

### Example 3 - Transform Stream:
```javascript
const uppercase = createUppercaseStream();
process.stdin.pipe(uppercase).pipe(process.stdout);
// Input: hello → Output: HELLO
```

## Requirements

1. `createReadStream(path)` - Create readable stream from file
2. `streamCopy(src, dest)` - Copy file using streams
3. `createUppercaseStream()` - Transform stream to uppercase
4. `streamToString(stream)` - Convert stream to string
5. `stringToStream(string)` - Convert string to readable stream

## Function Signatures

```javascript
function createReadStream(filePath, options) {
  // Return fs.ReadStream
}

async function streamCopy(source, destination) {
  // Copy using streams
}

function createUppercaseStream() {
  // Return Transform stream
}

async function streamToString(stream) {
  // Return Promise<string>
}

function stringToStream(string) {
  // Return Readable stream
}
```

