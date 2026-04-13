const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const housesRouter = require("./routes/houses");
const authRouter = require("./routes/auth");
const { ensureHouses } = require("./utils/seed");

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/houses", housesRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      console.log("MongoDB connected");
      await ensureHouses();
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
    });
} else {
  console.warn("MONGO_URI not set. Skipping MongoDB connection.");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
