# Event Emitter

**Difficulty:** Medium

## Problem Statement

Implement an `EventEmitter` class that allows subscribing to events, emitting events, and unsubscribing from events. This is a fundamental pattern used in Node.js and many JavaScript libraries.

## Examples

### Example 1 - Basic Usage:
```javascript
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit('greet', 'Alice'); // Logs: "Hello, Alice!"
emitter.emit('greet', 'Bob');   // Logs: "Hello, Bob!"
```

### Example 2 - Multiple Listeners:
```javascript
const emitter = new EventEmitter();

emitter.on('data', (x) => console.log('A:', x));
emitter.on('data', (x) => console.log('B:', x));

emitter.emit('data', 42);
// Logs: "A: 42"
// Logs: "B: 42"
```

### Example 3 - Unsubscribe:
```javascript
const emitter = new EventEmitter();

const handler = (x) => console.log(x);
emitter.on('event', handler);

emitter.emit('event', 'first');  // Logs: "first"
emitter.off('event', handler);
emitter.emit('event', 'second'); // Nothing logged
```

## Requirements

1. `on(event, listener)` - Subscribe to an event
2. `off(event, listener)` - Unsubscribe from an event
3. `emit(event, ...args)` - Emit an event with arguments
4. `once(event, listener)` - Subscribe to an event for one-time execution
5. Support multiple listeners per event
6. Listeners should be called in order of registration

## Class Signature

```javascript
class EventEmitter {
  on(event, listener) {
    // Your implementation here
  }

  off(event, listener) {
    // Your implementation here
  }

  emit(event, ...args) {
    // Your implementation here
  }

  once(event, listener) {
    // Your implementation here
  }
}
```

