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
  if (!req.cookies.uid) {
    return res.redirect("/login");
  }
  const userId = req.cookies.uid;
  const user = await getUser(userId);
  if (!user) {
    return res.redirect("/login");
  }
  user;
  next();
}

module.exports = { restrictToUserLoggedInOnly, checkAuth };
