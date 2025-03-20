const { nanoid } = require("nanoid");
const URL = require("../models/url_model");

async function handleGeneratedShortUrl(req, res) {
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({ errorMessage: "URL is Required" });
  }

  const redirectUrl = body.url;
  const shortId = nanoid(8);

  const newUrl = await URL.create({
    shortId: shortId,
    redirectUrl: redirectUrl,
    visitHistory: [],
  });

  return res.status(201).json({ shortId: newUrl.shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ errorMessage: "Short ID is Required" });
  }

  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ errorMessage: "Short URL not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGeneratedShortUrl, handleGetAnalytics };
