const { exec, spawn } = require('child_process');
const { promisify } = require('util');

async function execCommand(cmd) {
  // TODO: Execute command and return stdout
}

function spawnProcess(cmd, args = []) {
  // TODO: Return spawned process
}

async function runScript(scriptPath) {
  // TODO: Run node script
}

async function execWithTimeout(cmd, timeout) {
  // TODO: Execute with timeout, reject on timeout
}

module.exports = { execCommand, spawnProcess, runScript, execWithTimeout };

