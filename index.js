const express = require("express");
const urlRouter = require("./routes/url_router");
const path = require("path");
const connectToDatabase = require("./config");
const { handleGetAllUrls } = require("./controllers/url_controller");
const URL = require("./models/url_model");
const staticRouter = require("./routes/staticRouter");
const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase("mongodb://localhost:27017/url-shortener");

///setting ejs and view
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);
app.use("/url", urlRouter);
app.use("/", staticRouter);

/// to show ejs rendering
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({}); // Make sure this returns an array
  res.render("home", { urls: allUrls });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
