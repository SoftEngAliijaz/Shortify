const { nanoid } = require("nanoid");
const URL = require("../models/url_model");

async function handleGeneratedShortUrl(req, res) {
  try {
    let { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ errorMessage: "Valid URL is required" });
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }

    const shortId = nanoid(8);

    const newUrl = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    return res.status(201).json({ shortId: newUrl.shortId });
  } catch (error) {
    console.error("Error generating short URL:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const { shortId } = req.params;

    if (!shortId) {
      return res.status(400).json({ errorMessage: "Short ID is required" });
    }

    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ errorMessage: "Short URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}

module.exports = { handleGeneratedShortUrl, handleGetAnalytics };
