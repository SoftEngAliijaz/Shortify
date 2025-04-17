const { nanoid } = require("nanoid");
const URL = require("../models/url_model");
const validUrl = require("valid-url");

async function handleGeneratedShortUrl(req, res) {
  try {
    let { url } = req.body;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }

    if (!validUrl.isUri(url)) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter a valid URL." });
    }

    const existing = await URL.findOne({
      redirectUrl: url,
      createdBy: req.user ? req.user._id : null,
    });
    if (existing) {
      return res.render("home", { id: existing.shortId });
    }

    const shortId = nanoid(8);
    const newUrl = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
      createdBy: req.user ? req.user._id : null,
    });

    return res.render("home", { id: newUrl.shortId });
  } catch (error) {
    console.error("Error generating short URL:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const { shortId } = req.params;

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

async function handleGetAllUrls(req, res) {
  try {
    const urls = await URL.find({});

    return res.status(200).json({
      message: "URLs fetched successfully",
      data: urls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}

async function trackAndRedirect(req, res) {
  try {
    const shortId = req.params.shortId.trim();
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error in redirection:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleGeneratedShortUrl,
  handleGetAnalytics,
  handleGetAllUrls,
  trackAndRedirect,
};
