const { getUser } = require("../services/authService");

async function restrictToUserLoggedInOnly(req, res, next) {
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
    console.log("JWT error:", err.message);
    return res.redirect("/login");
  }
}

async function checkAuth(req, res, next) {
  const token = req.cookies.uid;
  if (!token) {
    return res.redirect("/login");
  }

  const user = getUser(token);
  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

module.exports = {
  restrictToUserLoggedInOnly,
  checkAuth,
};
