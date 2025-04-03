const jwt = require("jsonwebtoken");
const AuthSchema = require("../models/Auth");
const { jwtDecode } = require("jwt-decode");

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    // Check if authorization header is present and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Extract token from the authorization header
        token = req.headers.authorization.split(" ")[1];

        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find user by decoded ID and exclude password field
        req.user = await AuthSchema.findById(decoded.id);

        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        // Handle token verification errors
        res.status(401).json({ msg: "Invalid or expired token", error }); // Unauthorized status code
      }
    }
    // If no token is found in the authorization header
    if (!token) {
      res.status(401).json({ msg: "Not Authorized" }); // Throw error
    }
  } catch (err) {
    res.status(401).json({ msg: "Not Authorized" }); // Throw error
  }
};

const GoogleAuthMiddleware = async (req, res, next) => {
  try {
    let token;
    // Check if authorization header is present and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Extract token from the authorization header
        token = req.headers.authorization.split(" ")[1];
        // Verify the token and decode its payload
        const decoded = jwtDecode(token);
        // Find user by decoded ID and exclude password field
        req.user = await AuthSchema.findOne({ email: decoded.email });

        next(); // Proceed to the next middleware or route handler
      } catch (error) {
        // Handle token verification errors
        res.status(401).json({ msg: "Invalid or expired token", error }); // Unauthorized status code
      }
    }
    // If no token is found in the authorization header
    if (!token) {
      res.status(401).json({ msg: "Not Authorized" }); // Throw error
    }
  } catch (err) {
    res.status(401).json({ msg: "Not Authorized" }); // Throw error
  }
};

module.exports = { authMiddleware, GoogleAuthMiddleware };
