# Rate Limiter Middleware

**Difficulty:** Medium

## Problem Statement

Implement a rate limiter middleware for Node.js HTTP servers.

## Requirements

1. Limit requests per IP per time window
2. Configurable limits and window size
3. Return 429 Too Many Requests when exceeded
4. Support different strategies (fixed window, sliding window)
5. Include rate limit headers in response

## Function Signature

```javascript
function createRateLimiter(options) {
  // options: { windowMs, maxRequests, keyGenerator }
  // Return middleware (req, res, next) => void
}
```

