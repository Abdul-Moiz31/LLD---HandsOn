# File Reader

**Difficulty:** Easy

## Problem Statement

Implement functions to read files using Node.js `fs` module. Cover both callback-based and Promise-based approaches.

## Examples

### Example 1 - Read File Async:
```javascript
const content = await readFileAsync('data.txt');
console.log(content); // File contents as string
```

### Example 2 - Read File with Callback:
```javascript
readFileCallback('data.txt', (err, content) => {
  if (err) throw err;
  console.log(content);
});
```

### Example 3 - Read JSON File:
```javascript
const data = await readJSONFile('config.json');
console.log(data.setting); // Parsed JSON object
```

## Requirements

1. `readFileAsync(path, encoding)` - Returns Promise with file contents
2. `readFileCallback(path, callback)` - Callback-based file reading
3. `readJSONFile(path)` - Read and parse JSON file
4. Handle file not found errors gracefully
5. Support custom encoding (default: utf8)

## Function Signatures

```javascript
async function readFileAsync(filePath, encoding = 'utf8') {
  // Return file contents
}

function readFileCallback(filePath, callback) {
  // Call callback(err, data)
}

async function readJSONFile(filePath) {
  // Return parsed JSON object
}
```

