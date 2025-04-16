const express = require("express");
const path = require("path");
const urlRouter = require("./routes/url_router");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const connectToDatabase = require("./config");
const app = express();

const PORT = process.env.PORT || 3000;

// Connect to DB
connectToDatabase("mongodb://localhost:27017/url-shortener");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.set("json spaces", 2); // For pretty JSON responses

// Routes
app.use("/url", urlRouter); // All dynamic URL-based routes
app.use("/user", userRouter); // for users
app.use("/", staticRouter); // Static rendering

// Listen
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
