const dotenv = require('dotenv');
dotenv.config();
const app = require('./index');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(PORT);
});
