const express = require('express');
const Publication = require('../models/publication');
const Comment = require('../models/comment');
const routeGuardMiddleware = require('./../middleware/route-guard');

const publicationRouter = express.Router();

publicationRouter.get('/create', routeGuardMiddleware, (req, res) => {
  res.render('publish');
});

publicationRouter.post('/create', routeGuardMiddleware, (req, res, next) => {
  const { title, url } = req.body;
  Publication.create({
    title,
    url,
    creator: req.user._id
  })
    .then((publication) => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

publicationRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  // We need to create an auxiliary variable so that every parameter in the promise chain
  // is accessible in the last .then callback of the promise chain
  let publication;
  Publication.findById(id)
    .populate('creator') // Populating creator property asks mongoose to lookup the document that corresponds to the id stored in the creator property
    .then((document) => {
      publication = document;
      return Comment.find({ publication: id }).populate('creator');
    })
    .then((comments) => {
      res.render('publication-detail', { publication, comments });
    })
    .catch((error) => {
      next(error);
    });
});

publicationRouter.get('/:id/edit', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  Publication.findById(id)
    .then((publication) => {
      res.render('publication-edit', { publication });
    })
    .catch((error) => {
      next(error);
    });
});

publicationRouter.post('/:id/edit', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const url = req.body.url;
  Publication.findOneAndUpdate(
    { _id: id, creator: req.user._id },
    { title, url }
  )
    .then((publication) => {
      if (publication) {
        res.redirect(`/publication/${id}`);
      } else {
        throw new Error('NOT_ALLOWED_TO_EDIT_PUBLICATION');
      }
    })
    .catch((error) => {
      next(error);
    });
  /*
  Publication.findById(id)
    .then((publication) => {
      if (publication.creator === req.user._id) {
        // publication.title = title;
        // publication.url = url;
        // publication.set({ title, url });
        // return publication.save();
        return Publication.findByIdAndUpdate(id, { title, url });
      } else {
        throw new Error('NOT_PUBLICATION_CREATOR');
      }
    })
    .then(() => {
      res.redirect(`/publication/${id}`);
    })
    .catch((error) => {
      next(error);
    });
  */
});

publicationRouter.post(
  '/:id/delete',
  routeGuardMiddleware,
  (req, res, next) => {
    const id = req.params.id;
    Publication.findOneAndDelete({ _id: id, creator: req.user._id })
      .then((publication) => {
        if (publication) {
          res.redirect(`/`);
        } else {
          throw new Error('NOT_ALLOWED_TO_DELETE_PUBLICATION');
        }
      })
      .catch((error) => {
        next(error);
      });
  }
);

publicationRouter.post(
  '/:id/comment',
  routeGuardMiddleware,
  (req, res, next) => {
    const id = req.params.id;
    const message = req.body.message;
    Comment.create({
      publication: id,
      message,
      creator: req.user._id
    })
      .then(() => {
        res.redirect(`/publication/${id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

publicationRouter.post('/:id/vote', routeGuardMiddleware, (req, res, next) => {
  const id = req.params.id;
  Publication.findByIdAndUpdate(id, { $inc: { score: 1 } })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = publicationRouter;
