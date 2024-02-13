const errorsHandler = (err, req, res, next) => {
  if (!err) return next();

  const code = err.message.split(' | ')[1] || '500';
  res.status(code).send(err.message.split(' | ')[0]);
};

module.exports = errorsHandler;
