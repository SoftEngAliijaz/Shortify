const { getUser } = require("../services/authService.js");

async function restrictToUserLoggedInOnly(req, res, next) {
  const userUid = req.cookies.uid;

  if (!userUid) {
    return res.redirect("/login");
  }

  const user = await getUser(userUid);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  if (!req.session.user) {
    console.log("No session found. Redirecting to login.");
    return res.redirect("/login");
  }

  req.user = req.session.user; // Access user data from session
  next();
}

module.exports = {
  restrictToUserLoggedInOnly,
  checkAuth,
};
