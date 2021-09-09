'use strict';

const express = require('express');
const router = new express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const Submission = require('./../models/submission');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ih174test@gmail.com',
    pass: 'IHRMT102020@lis'
  }
});

// const upload = multer({ dest: 'uploads/' });

// For the locally stored file to keep it's original name
// we need to create a storage object and pass it to multer
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'uploads/');
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   }
// });

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    // This will make it so that all files are considered
    // "raw" and cloudinary features such as image transformations
    // aren't usable
    resource_type: 'raw',
    public_id: (req, file) => {
      // return file.originalname;
      const parts = file.originalname.split('.');
      const extension = parts[parts.length - 1];
      const randomName = `${String(Math.random()).replace(
        '.',
        ''
      )}.${extension}`;
      return randomName;
    }
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Hello World!' });
});

const fs = require('fs');
const hbs = require('hbs');
const handlebars = hbs.handlebars;
const path = require('path');

const renderHandlebarsTemplate = (file, data) => {
  return fs.promises
    .readFile(file, { encoding: 'utf-8' })
    .then((contents) => {
      console.log(contents);
      return handlebars.compile(contents)(data);
    })
    .catch((error) => {
      return error;
    });
};

router.post('/upload-file', upload.single('attachment'), (req, res, next) => {
  const url = req.file.path;
  const receiver = req.body.receiver;
  Submission.create({
    receiver,
    attachment: url
  })
    .then((submission) => {
      return renderHandlebarsTemplate(
        path.join(__dirname, '..', 'email-templates/sent-file.hbs'),
        { url }
      );
    })
    .then((html) => {
      return transporter.sendMail({
        to: receiver,
        subject: 'Someone sent you a file',
        html: html
      });
    })
    .then(() => {
      res.redirect('/confirmation');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/confirmation', (req, res) => {
  res.render('confirmation');
});

module.exports = router;
