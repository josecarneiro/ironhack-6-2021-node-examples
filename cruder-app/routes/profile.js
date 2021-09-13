const express = require('express');
const Publication = require('../models/publication');
const User = require('../models/user');
const routeGuardMiddleware = require('../middleware/route-guard');
const upload = require('../middleware/file-upload');

const profileRouter = express.Router();

profileRouter.get('/edit', routeGuardMiddleware, (req, res, next) => {
  res.render('profile/edit');
});

profileRouter.post(
  '/edit',
  routeGuardMiddleware,
  upload.single('picture'),
  (req, res, next) => {
    const { name, email } = req.body;
    const id = req.user._id;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    User.findByIdAndUpdate(id, {
      name,
      email,
      picture
    })
      .then((document) => {
        res.redirect(`/profile/${id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

profileRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let profile;
  User.findById(id)
    .then((document) => {
      profile = document;
      return Publication.find({ creator: id }).sort({ publishingDate: -1 });
    })
    .then((publications) => {
      const ownProfile =
        req.user && String(req.user._id) === String(profile._id);
      res.render('profile/detail', {
        profile,
        publications,
        ownProfile
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = profileRouter;
