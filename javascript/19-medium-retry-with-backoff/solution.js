/**
 * Retries a function with exponential backoff.
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry options
 * @param {number} options.maxAttempts - Maximum attempts (default: 3)
 * @param {number} options.initialDelay - Initial delay in ms (default: 100)
 * @param {number} options.maxDelay - Maximum delay in ms (default: 10000)
 * @param {number} options.factor - Exponential factor (default: 2)
 * @param {Function} options.shouldRetry - Custom retry condition (default: () => true)
 * @returns {Promise<*>} - Result of successful execution
 */
async function retry(fn, options = {}) {
  // TODO: Implement your solution here
}

module.exports = { retry };

