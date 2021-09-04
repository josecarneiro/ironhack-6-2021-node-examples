const User = require('./../models/user');

const userDeserializerMiddleware = (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    // Deserializing the user
    User.findById(userId)
      .then((user) => {
        // Ensure that user is available to request handling function
        // through the req.user property
        req.user = user;
        // Ensure that user is available to every template that is rendered
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
};

module.exports = userDeserializerMiddleware;
