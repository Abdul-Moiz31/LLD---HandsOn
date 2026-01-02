# Child Process

**Difficulty:** Easy

## Problem Statement

Implement utilities for spawning and managing child processes.

## Requirements

1. `execCommand(cmd)` - Execute shell command, return output
2. `spawnProcess(cmd, args)` - Spawn process with output streaming
3. `runScript(scriptPath)` - Run Node.js script
4. `execWithTimeout(cmd, timeout)` - Execute with timeout

## Function Signatures

```javascript
async function execCommand(cmd) {}
function spawnProcess(cmd, args) {}
async function runScript(scriptPath) {}
async function execWithTimeout(cmd, timeout) {}
```

