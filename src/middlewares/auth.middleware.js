exports.requireAuth = (req, res, next) => {
  req.user = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    role: 'authenticated',
  };
  next();
};
