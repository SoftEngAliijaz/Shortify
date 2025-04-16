const express = require("express");
const router = express.Router();
const {
  handleGeneratedShortUrl,
  handleGetAnalytics,
  handleGetAllUrls,
  trackAndRedirect,
} = require("../controllers/url_controller");

router.post("/", handleGeneratedShortUrl); // Create short URL
router.get("/analytics/:shortId", handleGetAnalytics); // Analytics by shortId
router.get("/getAllUrls", handleGetAllUrls); // All stored URLs
router.get("/:shortId", trackAndRedirect); // Redirection

module.exports = router;
