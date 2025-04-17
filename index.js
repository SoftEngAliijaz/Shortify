const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/url_router");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
require("./config")("mongodb://localhost:27017/url-shortener");

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies
app.use(
  session({
    secret: "your-secret-key", // Secret key for session encryption
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: { httpOnly: true, maxAge: 86400000 }, // Cookie settings
  })
);

// View engine setup
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.resolve("./views")); // Set the views directory

// Serve static files
app.use(express.static(path.resolve(__dirname, "public")));

// Route setup
app.get("/", (req, res) => {
  res.redirect("/url/home"); // Redirect root to /url/home
});
app.use("/url", urlRouter); // URL-related routes
app.use("/user", userRouter); // User-related routes
app.use("/", staticRouter); // Static file routes

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
