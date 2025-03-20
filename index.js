const express = require("express");
const urlRouter = require("./routes/url_router.js"); // ✅ Ensure the correct import
const connectToDatabase = require("./config");
const URL = require("./models/url_model");
const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase("mongodb://localhost:27017/url-shortener");

app.use(express.json());

app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
