const express = require('express');
const hbs = require('hbs');

const app = express();

// We need to tell hbs where partial templates are located
hbs.registerPartials(__dirname + '/views/partials');

// Express needs to know which templating engine to use
// We need to set the option 'view engine' to the name of the package
// that will render our views
app.set('view engine', 'hbs');

// We need to tell express where to look up our view templates
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
  // response.render takes the name of the view that should be rendered
  // plus a data object that contains properties that will be available to our
  // the template being rendered
  // After express has rendered this template using the templating engine set
  // in options "view engine", the resulting HTML is going to be sent as a reponse
  response.render('index', {
    message: 'Ciao Mondo',
    article: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  });
});

app.get('/helena', (request, response) => {
  response.render('index', { message: 'Hola Mundo' });
});

app.get('/jose', (request, response) => {
  response.render('profile', {
    name: 'José Carneiro',
    nationality: 'Portuguese',
    location: {
      country: 'Portugal',
      city: 'Lisbon'
    },
    pets: [
      { name: 'Panda', species: 'dog', isWellBehaved: true },
      { name: 'Whiskers', species: 'cat', isWellBehaved: false }
    ],
    favoriteBeverages: ['Water', 'Iced Coffee']
  });
});

app.listen(3000);
