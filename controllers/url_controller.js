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
      return res.render("home", {
        errorMessage: "Please enter a valid URL.",
        user: req.user,
        urls: await URL.find({ createdBy: req.user ? req.user._id : null }),
      });
    }

    // Check if URL already exists for this user
    const existing = await URL.findOne({
      redirectUrl: url,
      createdBy: req.user ? req.user._id : null,
    });

    if (existing) {
      const urls = await URL.find({
        createdBy: req.user ? req.user._id : null,
      });
      return res.render("home", {
        newShortId: existing.shortId,
        user: req.user,
        urls,
      });
    }

    // Create new short URL
    const shortId = nanoid(8);
    const newUrl = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
      createdBy: req.user ? req.user._id : null,
    });

    const urls = await URL.find({ createdBy: req.user ? req.user._id : null });
    return res.render("home", {
      newShortId: newUrl.shortId,
      user: req.user,
      urls,
    });
  } catch (error) {
    console.error("Error generating short URL:", error);
    res.status(500).render("home", {
      errorMessage: "Internal server error",
      user: req.user,
      urls: [],
    });
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
    const urls = await URL.find({ createdBy: req.user._id });

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
