const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('home');
});

const API_KEY = '596e5cb0';

app.get('/results', (request, response) => {
  const term = request.query.term;
  axios
    .get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`)
    .then((result) => {
      response.render('results', {
        movies: result.data.Search
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/movie/:id', (request, response) => {
  const id = request.params.id;
  axios
    .get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
    .then((result) => {
      const movie = result.data;
      response.render('detail', {
        movie: movie
      });
    });
});

app.get('*', (request, response) => {
  response.render('error');
});

app.listen(3000);
