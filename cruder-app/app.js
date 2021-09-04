const path = require('path');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');
const nodeSassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const Publication = require('./models/publication');
const baseRouter = require('./routes/index');
const publicationRouter = require('./routes/publication');
const userDeserializerMiddleware = require('./middleware/user-deserializer');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(serveFavicon(path.join(__dirname, 'public/favicon.ico')));
app.use(
  nodeSassMiddleware({
    dest: path.join(__dirname, 'public/styles'),
    src: path.join(__dirname, 'styles'),
    force: true,
    outputStyle: 'extended',
    prefix: '/styles'
  })
);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60
    })
  })
);

app.use(userDeserializerMiddleware);

app.get('/', (request, response, next) => {
  Publication.find({})
    .sort({ publishingDate: -1 })
    .limit(20)
    .populate('creator')
    .then((publications) => {
      console.log(publications);
      response.render('home', { publications });
    })
    .catch((error) => {
      next(error);
    });
});

app.use('/', baseRouter);
app.use('/publication', publicationRouter);

app.all('*', (request, response, next) => {
  next(new Error('NOT_FOUND'));
});

// Catch all error handler
// Express knows this is a catch all error handler because it takes 4 parameters
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: process.env.NODE_ENV !== 'production' ? error : {}
  });
});

module.exports = app;
