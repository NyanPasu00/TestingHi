const dotenv = require('dotenv');
dotenv.config({ path: '../JsonToken/node_modules/dotenv/lib/main' });
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Bearer token missing");
    return res.status(401).json({ error: "Bearer token missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token expired");
        return res.status(401).json({ error: "Token expired" });
      }
      console.log("Invalid token");
      return res.status(403).json({ error: "Invalid token" });
    }
 
    console.log("Token is valid");
    req.user = user; 
    next();
  });
}

module.exports = { authenticateToken };