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
  const sessionId = req.cookies?.uid;
  if (!sessionId) {
    console.log("No session ID found. Redirecting to login.");
    return res.redirect("/login");
  }

  const user = await getUser(sessionId);
  if (!user) {
    console.log("User not found. Redirecting to login.");
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

module.exports = {
  restrictToUserLoggedInOnly,
  checkAuth,
};
