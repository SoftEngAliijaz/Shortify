const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  restrictToUserLoggedInOnly,
  checkAuth,
} = require("./middlewares/auth_middleware");
const urlRouter = require("./routes/url_router");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const connectToDatabase = require("./config");
const app = express();

const PORT = process.env.PORT || 3000;

connectToDatabase("mongodb://localhost:27017/url-shortener");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.set("json spaces", 2);

app.use("/url", restrictToUserLoggedInOnly, urlRouter);
app.use("/user", checkAuth, userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
