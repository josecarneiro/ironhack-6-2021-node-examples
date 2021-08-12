const multiply = (a, b) => a * b;

const divide = (a, b) => {
  return a / b;
};

// Export multiple values from .js file
// use exports.NAME_OF_VALUE = value;
exports.multiply = multiply;
exports.divide = divide;
