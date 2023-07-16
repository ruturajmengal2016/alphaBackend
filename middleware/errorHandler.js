const errorHandler = (err, req, res, next) => {
  if (err) {
    res.send(err.message);
  }
  next();
};

module.exports = errorHandler;
