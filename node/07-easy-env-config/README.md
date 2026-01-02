# Environment Configuration

**Difficulty:** Easy

## Problem Statement

Implement functions for managing environment variables and configuration.

## Requirements

1. `getEnv(key, defaultValue)` - Get env variable with default
2. `requireEnv(key)` - Get env variable or throw
3. `loadEnvFile(path)` - Parse .env file format
4. `createConfig(schema)` - Create validated config object

## Function Signatures

```javascript
function getEnv(key, defaultValue) {}
function requireEnv(key) {}
async function loadEnvFile(filePath) {}
function createConfig(schema) {}
```

