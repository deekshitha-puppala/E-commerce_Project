const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: "Authentication failed: Missing or invalid Authorization header"
    });
  }

  const token = authHeader.split(' ')[1].trim();

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(401).json({
        message: "Authentication failed: Invalid token payload"
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed: Invalid or expired token"
    });
  }
};

module.exports = {
  authMiddleware
};
