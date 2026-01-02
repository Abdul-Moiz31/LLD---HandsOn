# API Gateway

**Difficulty:** Hard

## Problem Statement

Implement a simple API gateway that proxies requests to backend services.

## Requirements

1. Route requests to different backends
2. Request/response transformation
3. Rate limiting per route
4. Authentication
5. Load balancing (round-robin)
6. Circuit breaker pattern
7. Request logging

## Class Signature

```javascript
class APIGateway {
  constructor(options) {}
  addRoute(path, options) {}
  createHandler() {}
}
```

