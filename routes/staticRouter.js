const express = require("express");
const URL = require("../models/url_model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    res.render("home", { urls: allUrls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
