const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectToDatabase(url) {
  try {
    await mongoose.connect(url);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
