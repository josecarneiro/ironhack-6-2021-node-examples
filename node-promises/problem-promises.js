const fileSystem = require('fs');

fileSystem.promises
  .readFile('./a.txt', 'utf-8')
  .then((data) => {
    console.log(data);
    fileSystem.promises
      .readFile('./b.txt', 'utf-8')
      .then((data) => {
        console.log(data);
        fileSystem.promises
          .readFile('./c.txt', 'utf-8')
          .then((data) => {
            console.log(data);
            fileSystem.promises
              .readFile('./d.txt', 'utf-8')
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
