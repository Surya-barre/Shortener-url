import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true, unique: true },
    shortCode: { type: String, required: true, unique: true },
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Url", urlSchema);
