# Path Utilities

**Difficulty:** Easy

## Problem Statement

Implement utility functions for working with file paths using Node.js `path` module.

## Requirements

1. `resolvePath(...paths)` - Resolve to absolute path
2. `getFileInfo(filePath)` - Return { dir, name, ext, base }
3. `joinPaths(...paths)` - Join path segments
4. `isAbsolute(path)` - Check if path is absolute
5. `getRelativePath(from, to)` - Get relative path

## Function Signatures

```javascript
function resolvePath(...paths) {}
function getFileInfo(filePath) {}
function joinPaths(...paths) {}
function isAbsolute(pathStr) {}
function getRelativePath(from, to) {}
```

