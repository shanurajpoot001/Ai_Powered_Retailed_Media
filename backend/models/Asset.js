import mongoose from "mongoose"

const assetSchema = new mongoose.Schema({
  filename: String,
  path: String,
  fileType: String,
  assetType: { type: String, enum: ["logo", "packshot", "background"] },
  uploadedAt: { type: Date, default: Date.now },
})

export default mongoose.model("Asset", assetSchema)
