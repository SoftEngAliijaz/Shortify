const { getUser } = require("../services/authService.js");
const { sessionIdToUserMap } = require("../services/authService");

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

function checkAuth(req, res, next) {
  const sessionId = req.cookies?.uid;
  if (!sessionId) return res.redirect("/login");

  const user = sessionIdToUserMap.get(sessionId);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

module.exports = {
  restrictToUserLoggedInOnly,
  checkAuth,
};
