# Node.js EventEmitter Patterns

**Difficulty:** Easy

## Problem Statement

Practice working with Node.js EventEmitter by implementing common patterns and extending EventEmitter for custom use cases.

## Examples

### Example 1 - Custom Logger:
```javascript
const logger = new CustomLogger();

logger.on('log', (message) => console.log(message));
logger.on('error', (error) => console.error(error));

logger.log('Application started');
logger.error(new Error('Something went wrong'));
```

### Example 2 - Progress Tracker:
```javascript
const tracker = new ProgressTracker(100);

tracker.on('progress', (percent) => console.log(`${percent}% complete`));
tracker.on('complete', () => console.log('Done!'));

tracker.increment(25); // Emits: progress 25
tracker.increment(75); // Emits: progress 100, complete
```

### Example 3 - Once Pattern:
```javascript
const emitter = new MyEmitter();

emitter.once('init', () => console.log('Initialized'));

emitter.emit('init'); // Logs: Initialized
emitter.emit('init'); // Nothing (only once)
```

## Requirements

1. `CustomLogger` - Logger class that extends EventEmitter
2. `ProgressTracker` - Progress tracking with events
3. `createEmitterFromCallback` - Convert callback API to events
4. Practice once, removeListener, and error handling

## Class Signatures

```javascript
class CustomLogger extends EventEmitter {
  log(message) {}
  error(error) {}
  warn(message) {}
}

class ProgressTracker extends EventEmitter {
  constructor(total) {}
  increment(amount) {}
  reset() {}
}
```

