# File Watcher

**Difficulty:** Medium

## Problem Statement

Implement a file watcher utility using Node.js fs.watch or chokidar-like patterns.

## Requirements

1. Watch file/directory for changes
2. Emit events: 'add', 'change', 'delete'
3. Support glob patterns
4. Debounce rapid changes
5. Ignore patterns (node_modules, .git)

## Class Signature

```javascript
class FileWatcher extends EventEmitter {
  constructor(options) {}
  watch(path) {}
  unwatch(path) {}
  close() {}
}
```

