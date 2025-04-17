const express = require("express");
const router = express.Router();
const {
  restrictToUserLoggedInOnly,
} = require("../middlewares/auth_middleware");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// ✅ Add this here:
router.get("/home", restrictToUserLoggedInOnly, (req, res) => {
  res.render("home", { user: req.user });
});

module.exports = router;
