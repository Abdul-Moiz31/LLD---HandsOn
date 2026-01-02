/**
 * Predict what value is returned when accessing a var before its declaration.
 * @returns {*} - The hoisted value
 */
function predictVarHoisting() {
  // Try to access x before it's declared
  // Due to hoisting, x exists but is undefined
  try {
    return x; // This will return undefined (not throw an error)
  } catch (e) {
    return e;
  } finally {
    var x = 5; // This is hoisted to the top of the function
  }
}

/**
 * Predict if a function declaration can be called before it appears in code.
 * @returns {boolean} - true if callable, false otherwise
 */
function isFunctionDeclarationHoisted() {
  // Try to call the function before it's declared
  try {
    const result = testFunction(); // This should work due to hoisting
    return result === 'I am hoisted!';
  } catch (e) {
    return false; // If it throws, hoisting didn't work
  }
  
  // Function declaration - hoisted to the top
  function testFunction() {
    return 'I am hoisted!';
  }
}

/**
 * Predict if a function expression (var foo = function() {}) can be called before declaration.
 * @returns {boolean} - true if callable, false otherwise
 */
function isFunctionExpressionHoisted() {
  // Try to call the function expression before it's assigned
  try {
    const result = foo(); // This should fail
    return true; // If it doesn't fail, return true
  } catch (e) {
    // If it's a TypeError (foo is not a function), hoisting didn't work for the function
    // If it's a ReferenceError, the variable wasn't hoisted at all
    return false;
  }
  
  // Function expression - only the variable is hoisted, not the function
  var foo = function() {
    return 'I am a function expression!';
  };
}

/**
 * Return the type of error thrown when accessing a let/const before declaration.
 * @returns {string} - The error type name
 */
function getTDZErrorType() {
  try {
    // Try to access y before it's declared
    const value = y; // This will throw ReferenceError
    return 'No error'; // Should never reach here
  } catch (e) {
    // Return the error type name
    return e.constructor.name; // Should be 'ReferenceError'
  } finally {
    let y = 5; // let/const are hoisted but in TDZ
  }
}

/**
 * Demonstrate understanding by predicting output of this code:
 * 
 * var a = 1;
 * function outer() {
 *   console.log(a); // What is logged here?
 *   var a = 2;
 * }
 * outer();
 * 
 * @returns {*} - What gets logged
 */
function predictNestedHoisting() {
  var a = 1; // Outer scope variable
  
  function outer() {
    // Try to access a before local declaration
    // Local var a is hoisted, shadowing outer a
    try {
      return a; // This will be undefined, not 1
    } catch (e) {
      return e;
    } finally {
      var a = 2; // Local variable hoisted to top of function
    }
  }
  
  return outer(); // Call the function and return what it logs
}

module.exports = {
  predictVarHoisting,
  isFunctionDeclarationHoisted,
  isFunctionExpressionHoisted,
  getTDZErrorType,
  predictNestedHoisting,
};