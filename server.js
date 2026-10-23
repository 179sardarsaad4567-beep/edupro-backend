// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization", "Bypass-Tunnel-Remainder"],
// }));
// app.use(express.json());

// let mongoConnection;

// async function connectToDatabase() {
//   if (mongoose.connection.readyState === 1) return;
//   if (!process.env.MONGODB_URI) {
//     throw new Error("MONGODB_URI is not configured");
//   }

//   if (!mongoConnection) {
//     mongoConnection = mongoose.connect(process.env.MONGODB_URI)
//       .then(() => console.log("✅ MongoDB connected"))
//       .catch((err) => {
//         mongoConnection = null;
//         throw err;
//       });
//   }

//   await mongoConnection;
// }

// app.use(async (req, res, next) => {
//   try {
//     await connectToDatabase();
//     next();
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//     next(err);
//   }
// });

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/students", require("./routes/students"));
// app.use("/api/teachers", require("./routes/teachers"));
// app.use("/api/courses", require("./routes/courses"));
// app.use("/api/notices", require("./routes/notices"));
// app.use("/api/attendance", require("./routes/attendance"));
// app.use("/api/results", require("./routes/results"));
// app.use("/api/fees", require("./routes/fees"));
// app.use("/api/users", require("./routes/users"));

// app.get("/", (req, res) => {
//   res.json({ message: "EduSphere Pro Backend is running!" });
// });

// async function start() {
//   try {
//     await connectToDatabase();
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
//     });
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//   }
// }

// module.exports = app;
// module.exports.connectToDatabase = connectToDatabase;

// if (require.main === module) {
//   start();
// }



import axios from "axios";

const api = axios.create({
  baseURL: "https://lazy-turtles-arrive.loca.lt/api",
  headers: {
    "Content-Type": "application/json",
    "Bypass-Tunnel-Reminder": "true"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("edusphere_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;