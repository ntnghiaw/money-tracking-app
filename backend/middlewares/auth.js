const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_KEY = process.env.JWT_KEY;

const verifyTokenMiddleware = (req, res, next) => {
  // Get the token from the request headers
  // req (request) object has a property called headers
  // The headers property is an object that contains the HTTP request headers
  // The authorization header contains the token

  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent in the Authorization header
  // const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_KEY);
    console.log(decoded);

    req.user = decoded; // Attach user information to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyTokenMiddleware;
