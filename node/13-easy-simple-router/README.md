# Simple Router

**Difficulty:** Easy

## Problem Statement

Implement a simple HTTP router without using Express or other frameworks.

## Requirements

1. `Router` class with `get`, `post`, `put`, `delete` methods
2. Route matching with path parameters
3. Middleware support
4. 404 handling

## Class Signature

```javascript
class Router {
  get(path, handler) {}
  post(path, handler) {}
  put(path, handler) {}
  delete(path, handler) {}
  use(middleware) {}
  handle(req, res) {}
}
```

