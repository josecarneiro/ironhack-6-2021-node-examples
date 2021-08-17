const fileSystem = require('fs');

// Chaining promises

fileSystem.promises
  .readFile('./a.txt', 'utf-8')
  .then((data) => {
    console.log('Contents of a.txt', data);
    return fileSystem.promises.readFile('./b.txt', 'utf-8');
  })
  .then((data) => {
    console.log('Contents of b.txt', data);
    return fileSystem.promises.readFile('./c.txt', 'utf-8');
  })
  .then((data) => {
    console.log('Contents of c.txt', data);
    return fileSystem.promises.readFile('./d.txt', 'utf-8');
  })
  .then((data) => {
    console.log('Contents of d.txt', data);
  })
  .catch((error) => {
    console.log(error);
  });

console.log('A');
console.log('B');
