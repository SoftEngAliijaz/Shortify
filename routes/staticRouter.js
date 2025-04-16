const express = require("express");
const URL = require("../models/url_model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
