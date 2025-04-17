const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/auth_middleware");

router.get("/", checkAuth, async (req, res) => {
  try {
    const urls = await URL.find({ createdBy: req.user._id });
    const newShortId = req.query.newShortId || null;
    res.render("home", {
      user: req.user,
      urls,
      newShortId,
      errorMessage: null,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/home", checkAuth, (req, res) => {
  res.render("home", { user: req.user });
});

module.exports = router;
