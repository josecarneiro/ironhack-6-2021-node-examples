const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const Publication = require('./models/publication');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
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

app.post('/publish', (request, response) => {
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

app.get('/publication/:id', (request, response) => {
  const id = request.params.id;
  Publication.findById(id)
    .then((publication) => {
      response.render('publication-detail', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/error', (request, response) => {
  response.render('error');
});

app.get('*', (request, response) => {
  response.render('error');
});

// Catch all error handler
app.use((error, request, response, next) => {
  response.render('error');
});

const MONGODB_URI = 'mongodb://localhost:27017/cruder';

mongoose
  .connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000);
  });
