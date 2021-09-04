const routeGuardMiddleware = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error('UNAUTHORIZED');
    error.status = 401;
    next(error);
  }
};

module.exports = routeGuardMiddleware;
