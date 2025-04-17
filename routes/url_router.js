const express = require("express");
const router = express.Router();
const URL = require("../models/url_model");
const { checkAuth } = require("../middlewares/auth_middleware");

router.get("/home", checkAuth, async (req, res) => {
  try {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { user: req.user, urls: allUrls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/", checkAuth, async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.render("home", {
      user: req.user,
      errorMessage: "Invalid URL format. Please try again.",
      urls: await URL.find({ createdBy: req.user._id }),
      id: null,
    });
  }

  const newShortId = nanoid(8);

  const newUrl = new URL({
    shortId: newShortId,
    redirectUrl: url,
    createdBy: req.user._id,
  });

  try {
    await newUrl.save();
    res.redirect(`/?id=${newShortId}`);
  } catch (err) {
    console.error("Error saving URL:", err);
    res.status(500).render("home", {
      user: req.user,
      errorMessage: "There was an error creating the short URL.",
      urls: await URL.find({ createdBy: req.user._id }),
      id: null,
    });
  }
});

router.get("/analytics/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await URL.findOne({ shortId });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    const analytics = {
      clicks: url.visitHistory.length,
      createdAt: url.createdAt,
      lastAccessed:
        url.visitHistory[url.visitHistory.length - 1]?.timestamp || "N/A",
    };

    res.render("analytics", { analytics, shortId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching analytics");
  }
});

router.get("/getAllUrls", async (req, res) => {
  try {
    const urls = await URL.find({ createdBy: req.user._id });

    res.render("home", {
      user: req.user,
      urls: urls,
      id: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching URLs");
  }
});

router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await URL.findOne({ shortId });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    url.visitHistory.push({
      timestamp: new Date(),
      userAgent: req.headers["user-agent"],
    });

    await url.save();

    res.redirect(url.redirectUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during redirect");
  }
});

module.exports = router;
