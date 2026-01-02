/**
 * Dependency Injection Container.
 */
class DIContainer {
  constructor() {
    // TODO: Initialize your data structures
  }

  /**
   * Register a dependency.
   * @param {string} name - Dependency name
   * @param {Function} factory - Factory function that creates the dependency
   * @param {Object} options - Options (singleton: boolean)
   */
  register(name, factory, options = {}) {
    // TODO: Implement your solution here
  }

  /**
   * Resolve a dependency by name.
   * @param {string} name - Dependency name
   * @returns {*} - The resolved dependency
   */
  resolve(name) {
    // TODO: Implement your solution here
  }
}

module.exports = { DIContainer };

