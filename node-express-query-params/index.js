const express = require('express');

const app = express();

// URL
// PROTOCOL://ORIGIN/PATH?QUERY

/*
// Request Query
// We can pass arbitrary values
URL that the user visits: http://localhost:3000/?foo=bar&name=stefano
Path we set on the route handler: /
request.query // { foo: 'bar', name: 'stefano' }

// Request Params
URL that the user visits: http://localhost:3000/stefano/post-123/comment-123
Path we set on the route handler: /:username/:postId/:commentId
request.params // { username: 'stefano', postId: 'post-123', commentId: 'comment-123' }
*/

app.get('/', (request, response) => {
  // Request query
  // Request query is a set of key value pairs that can be passed through the request URL
  // formated as:
  // URL?KEY_1=VALUE_1&KEY_2=VALUE_2
  // In my request handler, I can access the values of each of those keys
  // by accessing request.query.KEY_1
  // console.log(request.query);
  // console.log(request.query.name);
  response.send(`Hello ${request.query.name}`);
});

app.get('/foo/:abc/bar/:def', (request, response) => {
  // Request params
  // These are not arbitrary values. I need to specify in my request handler path
  // which keys I want to have available in my request.params object
  // Those keys will be populated with the corresponding values
  // passed in the path portion of the url
  console.log(request.params.abc);
  response.send(`foo ${request.params.abc} ${request.params.def}`);
});

app.get('/search', (request, response) => {
  response.sendFile(__dirname + '/views/search.html');
});

app.get('/results', (request, response) => {
  response.send(request.query.term);
});

app.listen(3000);
