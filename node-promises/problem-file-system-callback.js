const fileSystem = require('fs');

// fileSystem.readFileSync();

fileSystem.readFile('./a.txt', 'utf-8', (error, data) => {
  console.log(data);
  fileSystem.readFile('./b.txt', 'utf-8', (error, data) => {
    console.log(data);
    fileSystem.readFile('./c.txt', 'utf-8', (error, data) => {
      console.log(data);
      fileSystem.readFile('./d.txt', 'utf-8', (error, data) => {
        console.log(data);
      });
    });
  });
});
