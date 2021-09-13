const express = require('express');
const routeGuardMiddleware = require('../middleware/route-guard');
const Publication = require('./../models/publication');

const router = new express.Router();

router.get('/', (req, res, next) => {
  Publication.find({})
    .sort({ publishingDate: -1 })
    .limit(20)
    .populate('creator')
    .then((publications) => {
      res.render('home', { publications });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuardMiddleware, (req, res, next) => {
  res.render('private');
});

module.exports = router;
