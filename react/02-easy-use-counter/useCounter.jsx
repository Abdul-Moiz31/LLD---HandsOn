import { useState, useCallback } from 'react';

/**
 * Custom hook for managing a counter.
 * @param {number} initialValue - Initial count value
 * @param {Object} options - Configuration options
 * @param {number} options.step - Increment/decrement step (default: 1)
 * @param {number} options.min - Minimum value (default: -Infinity)
 * @param {number} options.max - Maximum value (default: Infinity)
 * @returns {Object} - { count, increment, decrement, reset, set }
 */
function useCounter(initialValue = 0, options = {}) {
  // TODO: Implement your solution here
}

export { useCounter };

