/**
 * Observable implementation for reactive programming.
 */
class Observable {
  /**
   * @param {Function} subscribe - Function that receives a subscriber
   */
  constructor(subscribe) {
    // TODO: Store the subscribe function
  }

  /**
   * Subscribe to this Observable.
   * @param {Object} observer - Object with next, error, complete methods
   * @returns {Object} - Subscription with unsubscribe method
   */
  subscribe(observer) {
    // TODO: Implement your solution here
  }

  /**
   * Transform emitted values.
   * @param {Function} transformFn - Transformation function
   * @returns {Observable} - New Observable with transformed values
   */
  map(transformFn) {
    // TODO: Implement your solution here
  }

  /**
   * Filter emitted values.
   * @param {Function} predicateFn - Predicate function
   * @returns {Observable} - New Observable with filtered values
   */
  filter(predicateFn) {
    // TODO: Implement your solution here
  }

  /**
   * Create Observable from an iterable.
   * @param {Iterable} iterable - Array or iterable
   * @returns {Observable} - Observable that emits each value
   */
  static from(iterable) {
    // TODO: Implement your solution here
  }
}

module.exports = { Observable };

