const http = require('http');

const server = http.createServer(function (request, response) {
  const url = request.url;
  let message;
  switch (url) {
    case '/jose':
      message = 'Olá Mundo';
      break;
    case '/stefano':
      message = 'Ciao Mondo';
      break;
    case '/helena':
      message = 'Hola Mundo';
      break;
    default:
      message = 'Hello World';
      break;
  }
  console.log('Request received');
  response.write(message);
  response.end();
});

// 3000-3999 5000-5999 8000-8999
server.listen(3000);

// google.com
// browser makes request to domain name system
// asking "what machine does google.com refer to?"
// dns service will respond with machine address
// 192.123.343.232
// Browser will issue request to 192.123.343.232:80

// localhost
// refers to the machine itself
// 127.0.0.1
// localhost:3000
