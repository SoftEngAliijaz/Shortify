const express = require("express");
const {
  handleGeneratedShortUrl,
  handleGetAnalytics,
} = require("../controllers/url_controller");

const router = express.Router();

router.post("/", handleGeneratedShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
