'use strict';

const express = require('express');
const router = new express.Router();
const routeGuard = require('./../middleware/route-guard');
const Space = require('./../models/space');

router.get('/', (req, res, next) => {
  Space.find({})
    .then((spaces) => {
      res.render('home', { spaces });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

router.get('/space/create', (req, res, next) => {
  res.render('create-space');
});

router.post('/space/create', (req, res, next) => {
  const { name, latitude, longitude } = req.body;
  Space.create({
    name,
    position: {
      coordinates: [longitude, latitude]
    }
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
