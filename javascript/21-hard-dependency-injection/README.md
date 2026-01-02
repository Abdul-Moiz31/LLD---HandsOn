# Dependency Injection Container

**Difficulty:** Hard

## Problem Statement

Implement a Dependency Injection (DI) container that can register dependencies, resolve them with their dependencies, and support different scopes (singleton vs transient).

DI is a design pattern that allows for loose coupling and better testability.

## Examples

### Example 1 - Basic Registration and Resolution:
```javascript
const container = new DIContainer();

container.register('logger', () => ({
  log: (msg) => console.log(msg)
}));

const logger = container.resolve('logger');
logger.log('Hello!'); // Logs: "Hello!"
```

### Example 2 - Dependencies:
```javascript
container.register('config', () => ({ apiUrl: 'https://api.example.com' }));

container.register('apiClient', (c) => ({
  config: c.resolve('config'),
  fetch: function(endpoint) {
    return fetch(this.config.apiUrl + endpoint);
  }
}));

const client = container.resolve('apiClient');
// client.config is automatically injected
```

### Example 3 - Singletons:
```javascript
container.register('database', () => new Database(), { singleton: true });

const db1 = container.resolve('database');
const db2 = container.resolve('database');
db1 === db2; // true (same instance)
```

## Requirements

1. `register(name, factory, options)` - Register a dependency
2. `resolve(name)` - Resolve a dependency (with its dependencies)
3. Support singleton scope (same instance returned)
4. Support transient scope (new instance each time)
5. Detect circular dependencies
6. Support factory functions that receive the container

## Class Signature

```javascript
class DIContainer {
  register(name, factory, options = {}) {
    // Register a dependency
  }

  resolve(name) {
    // Resolve a dependency
  }
}
```

