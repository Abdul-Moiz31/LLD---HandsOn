const fs = require('fs').promises;

function getEnv(key, defaultValue = undefined) {
  // TODO: Implement
}

function requireEnv(key) {
  // TODO: Implement - throw if not found
}

async function loadEnvFile(filePath) {
  // TODO: Parse KEY=value format, return object
}

function createConfig(schema) {
  // TODO: Create config from schema with type coercion
}

module.exports = { getEnv, requireEnv, loadEnvFile, createConfig };

