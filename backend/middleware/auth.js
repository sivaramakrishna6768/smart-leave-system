const jwt = require('jsonwebtoken');

const auth = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden - Access denied' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };
};

module.exports = auth;
