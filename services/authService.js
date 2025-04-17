const jwt = require("jsonwebtoken");
const secret = "keyiskey";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET || secret,
    {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    }
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET || secret);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
