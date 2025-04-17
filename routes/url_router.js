const express = require("express");
const router = express.Router();
const URL = require("../models/url_model");
const { checkAuth } = require("../middlewares/auth_middleware");

router.get("/home", checkAuth, async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  try {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { user: req.user, urls: allUrls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
