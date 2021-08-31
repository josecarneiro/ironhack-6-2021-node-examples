const express = require('express');
const path = require('path');
const hbs = require('hbs');
const nodeSassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const morgan = require('morgan');
const Publication = require('./models/publication');
const publicationRouter = require('./routers/publication');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(serveFavicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(
  nodeSassMiddleware({
    dest: path.join(__dirname, 'public/styles'),
    src: path.join(__dirname, 'styles'),
    force: true,
    outputStyle: 'extended',
    prefix: '/styles'
  })
);
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response, next) => {
  Publication.find({})
    .then((publications) => {
      response.render('home', { publications });
    })
    .catch((error) => {
      next(error);
    });
});

app.use('/publication', publicationRouter);

app.all('*', (request, response, next) => {
  next(new Error('NOT_FOUND'));
});

// Catch all error handler
// Express knows this is a catch all error handler because it takes 4 parameters
app.use((error, request, response, next) => {
  console.log(error);
  // 200 - Everything okay
  // 404 - Page not found
  // 401 - Forbiden
  // 500 - Unknown server error
  response.status(error.message === 'NOT_FOUND' ? 404 : 500);
  response.render('error');
});

module.exports = app;
