const { getUser } = require("../services/authService");

function checkAuth(req, res, next) {
  const token = req.cookies.uid;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const user = getUser(token);
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.redirect("/login");
  }
}

module.exports = {
  checkAuth,
};
