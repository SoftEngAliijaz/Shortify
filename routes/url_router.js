const express = require("express");
const router = express.Router();
const {
  handleGeneratedShortUrl,
  handleGetAnalytics,
} = require("../controllers/url_controller");

router.post("/", handleGeneratedShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
