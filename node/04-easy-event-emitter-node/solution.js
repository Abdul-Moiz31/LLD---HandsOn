const EventEmitter = require('events');

/**
 * Custom logger that extends EventEmitter.
 * Emits: 'log', 'error', 'warn' events
 */
class CustomLogger extends EventEmitter {
  /**
   * Log an info message.
   * @param {string} message - Message to log
   */
  log(message) {
    // TODO: Implement your solution here
  }

  /**
   * Log an error.
   * @param {Error|string} error - Error to log
   */
  error(error) {
    // TODO: Implement your solution here
  }

  /**
   * Log a warning.
   * @param {string} message - Warning message
   */
  warn(message) {
    // TODO: Implement your solution here
  }
}

/**
 * Progress tracker with events.
 * Emits: 'progress' (percent), 'complete'
 */
class ProgressTracker extends EventEmitter {
  /**
   * @param {number} total - Total units to track
   */
  constructor(total) {
    super();
    // TODO: Initialize state
  }

  /**
   * Increment progress.
   * @param {number} amount - Amount to increment
   */
  increment(amount) {
    // TODO: Implement your solution here
  }

  /**
   * Reset progress to 0.
   */
  reset() {
    // TODO: Implement your solution here
  }

  /**
   * Get current progress percentage.
   * @returns {number} - Percentage (0-100)
   */
  getProgress() {
    // TODO: Implement your solution here
  }
}

/**
 * Convert a callback-based function to an EventEmitter.
 * @param {Function} callbackFn - Function that accepts a callback
 * @returns {EventEmitter} - Emitter that emits 'data' or 'error'
 */
function createEmitterFromCallback(callbackFn) {
  // TODO: Implement your solution here
}

module.exports = { CustomLogger, ProgressTracker, createEmitterFromCallback };

