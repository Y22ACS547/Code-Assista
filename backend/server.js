// server.js

// ✅ Load environment variables FIRST (VERY IMPORTANT)
require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug (temporary – helps confirm env is loaded)
console.log(
  "GEMINI_API_KEY loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    userId: req.userId,
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error("MongoDB connection error:", err.message)
  );

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
