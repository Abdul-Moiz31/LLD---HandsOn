const fs = require('fs').promises;
const path = require('path');

/**
 * List contents of a directory.
 * @param {string} dirPath - Path to directory
 * @returns {Promise<string[]>} - Array of file/folder names
 */
async function listDirectory(dirPath) {
  // TODO: Implement your solution here
}

/**
 * List directory with detailed file information.
 * @param {string} dirPath - Path to directory
 * @returns {Promise<Object[]>} - Array of { name, isFile, isDirectory, size }
 */
async function listDirectoryDetailed(dirPath) {
  // TODO: Implement your solution here
}

/**
 * Recursively list all files in directory.
 * @param {string} dirPath - Path to directory
 * @returns {Promise<string[]>} - Array of relative file paths
 */
async function listDirectoryRecursive(dirPath) {
  // TODO: Implement your solution here
}

/**
 * Filter files by extension.
 * @param {string} dirPath - Path to directory
 * @param {string} extension - File extension (e.g., '.js')
 * @returns {Promise<string[]>} - Array of matching file names
 */
async function filterByExtension(dirPath, extension) {
  // TODO: Implement your solution here
}

module.exports = {
  listDirectory,
  listDirectoryDetailed,
  listDirectoryRecursive,
  filterByExtension,
};

