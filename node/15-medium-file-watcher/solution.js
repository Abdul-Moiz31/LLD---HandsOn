const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class FileWatcher extends EventEmitter {
  constructor(options = {}) {
    super();
    // TODO: Initialize with options (ignored, debounceMs)
  }

  watch(watchPath) {
    // TODO: Start watching path, emit 'add', 'change', 'delete'
  }

  unwatch(watchPath) {
    // TODO: Stop watching path
  }

  close() {
    // TODO: Close all watchers
  }
}

module.exports = { FileWatcher };

