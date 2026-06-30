exports.notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
};

exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({
    error: 'Internal Server Error',
    code: 'DB_TRANSACTION_FAILURE',
  });
};
