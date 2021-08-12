const subtract = require('./subtract.js'); // Value is function subtract
const operations = require('./operations.js'); // Value is object with keys divide and multiply

console.log('Hello world');

console.log(10 + 5);

const sum = (a, b) => {
  return a + b;
};

console.log(sum(20, 7));

console.log(subtract(14, 6));

console.log(operations.multiply(2, 4));

console.log(operations.divide(25, 3));

const fileSystem = require('fs');

const contents = fileSystem.readFileSync('book.txt', 'utf-8');

console.log(contents);
