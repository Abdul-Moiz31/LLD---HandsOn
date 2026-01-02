const {
  predictVarHoisting,
  isFunctionDeclarationHoisted,
  isFunctionExpressionHoisted,
  getTDZErrorType,
  predictNestedHoisting,
} = require('./solution');

describe('Hoisting Understanding', () => {
  describe('predictVarHoisting', () => {
    test('should return undefined for var hoisting', () => {
      expect(predictVarHoisting()).toBe(undefined);
    });
  });

  describe('isFunctionDeclarationHoisted', () => {
    test('should return true - function declarations are fully hoisted', () => {
      expect(isFunctionDeclarationHoisted()).toBe(true);
    });

    test('verify function declaration hoisting works', () => {
      // This actually works due to hoisting
      expect(hoistedFn()).toBe('I am hoisted!');
      
      function hoistedFn() {
        return 'I am hoisted!';
      }
    });
  });

  describe('isFunctionExpressionHoisted', () => {
    test('should return false - function expressions are not callable before declaration', () => {
      expect(isFunctionExpressionHoisted()).toBe(false);
    });
  });

  describe('getTDZErrorType', () => {
    test('should return ReferenceError for TDZ access', () => {
      expect(getTDZErrorType()).toBe('ReferenceError');
    });

    test('verify TDZ behavior with let', () => {
      expect(() => {
        const testTDZ = () => {
          console.log(x);
          let x = 5;
        };
        testTDZ();
      }).toThrow(ReferenceError);
    });
  });

  describe('predictNestedHoisting', () => {
    test('should return undefined due to local var hoisting shadowing outer', () => {
      expect(predictNestedHoisting()).toBe(undefined);
    });

    test('verify nested hoisting behavior', () => {
      var a = 1;
      let result;
      function outer() {
        result = a; // Captures hoisted undefined
        var a = 2;
      }
      outer();
      expect(result).toBe(undefined);
    });
  });
});

