# Directory Lister

**Difficulty:** Easy

## Problem Statement

Implement functions to list directory contents with various options like filtering and recursive listing.

## Examples

### Example 1 - List Directory:
```javascript
const files = await listDirectory('./src');
console.log(files); // ['index.js', 'utils.js', 'components/']
```

### Example 2 - List with Details:
```javascript
const files = await listDirectoryDetailed('./src');
// [{ name: 'index.js', isFile: true, size: 1024 }, ...]
```

### Example 3 - Recursive Listing:
```javascript
const allFiles = await listDirectoryRecursive('./src');
// ['index.js', 'utils/helper.js', 'utils/format.js', ...]
```

## Requirements

1. `listDirectory(path)` - List files and folders in directory
2. `listDirectoryDetailed(path)` - Include file stats (size, isFile, isDirectory)
3. `listDirectoryRecursive(path)` - Recursively list all files
4. `filterByExtension(path, ext)` - Filter by file extension
5. Handle non-existent directory errors

## Function Signatures

```javascript
async function listDirectory(dirPath) {
  // Return array of file/folder names
}

async function listDirectoryDetailed(dirPath) {
  // Return array of { name, isFile, isDirectory, size }
}

async function listDirectoryRecursive(dirPath) {
  // Return array of all file paths (relative)
}

async function filterByExtension(dirPath, extension) {
  // Return files matching extension (e.g., '.js')
}
```

