import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/urlshortener")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error(err));


app.use("/api", urlRoutes);
app.use("/", urlRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
