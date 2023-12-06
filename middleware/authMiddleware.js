const jwt = require('jsonwebtoken');
 
 function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.json({ success: false, message: 'Unauthorized: Token not provided.' });
    }
  
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {
        return res.json({ success: false, message: 'Unauthorized: Invalid token.' });
      } 
      req.user = user;
      next();
    });
  }

  module.exports = authenticateToken;