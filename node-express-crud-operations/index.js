const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const Publication = require('./models/publication');
const nodeSassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const morgan = require('morgan');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(serveFavicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.static('public'));
app.use(morgan('combined'));
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

app.get('/publish', (request, response) => {
  response.render('publish');
});

app.post('/publish', (request, response, next) => {
  const title = request.body.title;
  const url = request.body.url;
  // const { title, url } = request.body;
  Publication.create({
    title,
    url
  })
    .then((publication) => {
      response.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/publication/:id', (request, response, next) => {
  const id = request.params.id;
  Publication.findById(id)
    .then((publication) => {
      response.render('publication-detail', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/publication/:id/edit', (request, response, next) => {
  const id = request.params.id;
  Publication.findById(id)
    .then((publication) => {
      response.render('publication-edit', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/publication/:id/edit', (request, response, next) => {
  const id = request.params.id;
  const title = request.body.title;
  const url = request.body.url;
  Publication.findByIdAndUpdate(id, { title, url })
    .then(() => {
      response.redirect(`/publication/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/publication/:id/delete', (request, response, next) => {
  const id = request.params.id;
  Publication.findByIdAndDelete(id)
    .then(() => {
      response.redirect(`/`);
    })
    .catch((error) => {
      next(error);
    });
});

app.get('*', (request, response, next) => {
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

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(3000);
});
