const express = require("express");
const URL = require("../models/url_model");
const router = express.Router();

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

module.exports = router;
