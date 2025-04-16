const express = require("express");
const urlRouter = require("./routes/url_router");
const connectToDatabase = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase("mongodb://localhost:27017/url-shortener");

app.use(express.json());
app.set("json spaces", 2);
app.use("/url", urlRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
