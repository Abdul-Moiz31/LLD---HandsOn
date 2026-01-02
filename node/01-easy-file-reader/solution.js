const fs = require('fs');
const path = require('path');

/**
 * Read file asynchronously using Promises.
 * @param {string} filePath - Path to the file
 * @param {string} encoding - File encoding (default: 'utf8')
 * @returns {Promise<string>} - File contents
 */
async function readFileAsync(filePath, encoding = 'utf8') {
  // TODO: Implement your solution here
}

/**
 * Read file using callback pattern.
 * @param {string} filePath - Path to the file
 * @param {Function} callback - Callback function (err, data)
 */
function readFileCallback(filePath, callback) {
  // TODO: Implement your solution here
}

/**
 * Read and parse a JSON file.
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Object>} - Parsed JSON object
 */
async function readJSONFile(filePath) {
  // TODO: Implement your solution here
}

module.exports = { readFileAsync, readFileCallback, readJSONFile };

