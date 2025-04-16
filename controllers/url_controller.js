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

    return res.render("home", { id: newUrl.shortId });

    // return res.status(201).json({ shortId: newUrl.shortId });
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

async function handleGetAllUrls(req, res) {
  try {
    const urls = await URL.find({});

    if (!urls || urls.length === 0) {
      return res.status(404).json({ errorMessage: "No URLs found" });
    }

    return res
      .status(200)
      .json({ message: "URLs fetched successfully", data: urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}

async function trackAndRedirect(req, res) {
  try {
    const shortId = req.params.shortId.trim();
    console.log(`🔍 Searching for shortId: ${shortId}`);

    const entry = await URL.findOne({ shortId });

    if (!entry) {
      console.log(`❌ Short ID '${shortId}' not found in database.`);
      return res.status(404).json({ error: "Short URL not found" });
    }

    await URL.updateOne(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    console.log(`✅ Redirecting to: ${entry.redirectUrl}`);
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("🚨 Error in redirection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGeneratedShortUrl,
  handleGetAnalytics,
  handleGetAllUrls,
  trackAndRedirect,
};
