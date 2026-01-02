const fs = require('fs');
const { Transform, Readable } = require('stream');
const { pipeline } = require('stream/promises');

/**
 * Create a readable stream from a file.
 * @param {string} filePath - Path to the file
 * @param {Object} options - Stream options
 * @returns {fs.ReadStream} - File read stream
 */
function createReadStream(filePath, options = {}) {
  // TODO: Implement your solution here
}

/**
 * Copy a file using streams.
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 * @returns {Promise<void>}
 */
async function streamCopy(source, destination) {
  // TODO: Implement your solution here
}

/**
 * Create a transform stream that converts text to uppercase.
 * @returns {Transform} - Transform stream
 */
function createUppercaseStream() {
  // TODO: Implement your solution here
}

/**
 * Convert a readable stream to a string.
 * @param {Readable} stream - Readable stream
 * @returns {Promise<string>} - Stream contents as string
 */
async function streamToString(stream) {
  // TODO: Implement your solution here
}

/**
 * Convert a string to a readable stream.
 * @param {string} string - String to convert
 * @returns {Readable} - Readable stream
 */
function stringToStream(string) {
  // TODO: Implement your solution here
}

module.exports = {
  createReadStream,
  streamCopy,
  createUppercaseStream,
  streamToString,
  stringToStream,
};

