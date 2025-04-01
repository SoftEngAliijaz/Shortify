const express = require("express");
const urlRouter = require("./routes/url_router");
const connectToDatabase = require("./config");
const URL = require("./models/url_model");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase("mongodb://localhost:27017/url-shortener");

app.use(express.json());
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId.trim(); // Ensure no extra spaces
    console.log(`🔍 Searching for shortId: ${shortId}`);

    // Fetch the entry without updating first, just to check if it exists
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      console.log(`❌ Short ID '${shortId}' not found in database.`);
      return res.status(404).json({ error: "Short URL not found" });
    }

    // If found, update visit history
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
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
