const express = require('express');
const Publication = require('./../models/publication');
const Comment = require('./../models/comment');

const publicationRouter = express.Router();

publicationRouter.get('/create', (request, response) => {
  response.render('publish');
});

publicationRouter.post('/create', (request, response, next) => {
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

publicationRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;
  // We need to create an auxiliary variable so that every parameter in the promise chain
  // is accessible in the last .then callback of the promise chain
  let publication;
  Publication.findById(id)
    .then((document) => {
      publication = document;
      return Comment.find({
        publication: id
      });
    })
    .then((comments) => {
      response.render('publication-detail', { publication, comments });
    })
    .catch((error) => {
      next(error);
    });
});

publicationRouter.get('/:id/edit', (request, response, next) => {
  const id = request.params.id;
  Publication.findById(id)
    .then((publication) => {
      response.render('publication-edit', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

publicationRouter.post('/:id/edit', (request, response, next) => {
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

publicationRouter.post('/:id/delete', (request, response, next) => {
  const id = request.params.id;
  Publication.findByIdAndDelete(id)
    .then(() => {
      response.redirect(`/`);
    })
    .catch((error) => {
      next(error);
    });
});

publicationRouter.post('/:id/comment', (request, response, next) => {
  const id = request.params.id;
  const message = request.body.message;
  Comment.create({
    publication: id,
    message
  })
    .then(() => {
      response.redirect(`/publication/${id}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = publicationRouter;
