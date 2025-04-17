const express = require("express");
const router = express.Router();
const URL = require("../models/url_model");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { urls: allUrls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/login", (req, res) => {
  res.render("login"); // Renders views/login.ejs
});

router.get("/signup", (req, res) => {
  res.render("signup"); // Renders views/signup.ejs
});

router.get("/", (req, res) => {
  res.render("home"); // Default landing page (can be updated)
});

/// example router for home
router.get("/home", (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  // Render home page for logged-in user
  res.render("home", { user: req.user });
});

module.exports = router;
