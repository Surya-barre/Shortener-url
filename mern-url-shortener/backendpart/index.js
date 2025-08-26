import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config(); // ✅ load .env

const app = express();
app.use(cors());
app.use(express.json());

// ✅ connect to MongoDB using .env variable

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api", urlRoutes);
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000; // ✅ use Render's PORT
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
