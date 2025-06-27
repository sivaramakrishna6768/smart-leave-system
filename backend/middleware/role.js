const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Access denied for role: ${req.user.role}` });
    }
    next();
  };
};

module.exports = { restrictTo };
