/**
 * Event Emitter implementation.
 */
class EventEmitter {
  constructor() {
    // TODO: Initialize your data structure
  }

  /**
   * Subscribe to an event.
   * @param {string} event - Event name
   * @param {Function} listener - Callback function
   */
  on(event, listener) {
    // TODO: Implement your solution here
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event - Event name
   * @param {Function} listener - Callback function to remove
   */
  off(event, listener) {
    // TODO: Implement your solution here
  }

  /**
   * Emit an event with arguments.
   * @param {string} event - Event name
   * @param {...*} args - Arguments to pass to listeners
   */
  emit(event, ...args) {
    // TODO: Implement your solution here
  }

  /**
   * Subscribe to an event for one-time execution.
   * @param {string} event - Event name
   * @param {Function} listener - Callback function
   */
  once(event, listener) {
    // TODO: Implement your solution here
  }
}

module.exports = { EventEmitter };

