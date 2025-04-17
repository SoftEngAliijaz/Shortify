const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
require("./config")("mongodb://localhost:27017/url-shortener");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 86400000 },
  })
);

// Views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Static
app.use(express.static(path.resolve(__dirname, "public")));

// Routers
app.get("/", (req, res) => {
  res.redirect("/url/home");
});
app.use("/url", urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
