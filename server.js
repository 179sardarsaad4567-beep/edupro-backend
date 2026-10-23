require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"] }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/teachers", require("./routes/teachers"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/notices", require("./routes/notices"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/results", require("./routes/results"));
app.use("/api/fees", require("./routes/fees"));
app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.json({ message: "EduSphere Pro Backend is running!" });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

start();