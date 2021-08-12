const express = require('express');
const chalk = require('chalk');

const app = express();

// app.use will allow me to bind middleware to the application
// middleware is a function that is executed when a request is received
// but that does "intercept" the request, it does not respond, and it allows
// the request to flow through the application
app.use(function (request, response, next) {
  // console.log('A request was received.');
  // Calling next allows the request to move forward
  console.log(chalk.bgBlue.white('A request was made to: ' + request.path));
  next();
});

// We can use express static to serve files without having
// to create route handlers for each individual file
app.use(express.static('public'));

/*
app.use(function (request, response, next) {
  // Iterates over every file inside the public directory
  // Compares request.path with said file path
  // If there is a match, it sends the contents of said file with response.sendFile
  // if not, it calls next
});
*/

// Handle GET requests being made to / path
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/jose', function (request, response) {
  // response.send('Olá Mundo');
  response.sendFile(__dirname + '/views/jose.html');
});

app.get('/stefano', function (request, response) {
  response.send('Ciao Mondo');
});

app.get('/helena', function (request, response) {
  response.send('Hola Mundo');
});

app.get('/styles/main.css', function (request, response) {
  response.sendFile(__dirname + '/public/styles/main.css');
});

app.get('*', function (request, response) {
  response.send('HELLO_WORLD');
});

// app.use(function (request, response, next) {
//   console.log('The request never reaches this middleware.');
//   next();
// });

app.listen(3010);
