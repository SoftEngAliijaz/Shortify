const express = require("express");
const router = express.Router();
const {
  handleGeneratedShortUrl,
  handleGetAnalytics,
  handleGetAllUrls,
  trackAndRedirect,
} = require("../controllers/url_controller");

router.get("/getAllUrls", handleGetAllUrls);
router.post("/", handleGeneratedShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", trackAndRedirect);

module.exports = router;
