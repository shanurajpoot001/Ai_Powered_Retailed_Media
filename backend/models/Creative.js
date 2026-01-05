import mongoose from "mongoose"

const creativeSchema = new mongoose.Schema({
  name: String,
  assets: [mongoose.Schema.Types.ObjectId],
  colorPalette: [String],
  layout: String,
  format: { type: String, enum: ["facebook", "instagram", "display"] },
  guidelines: {
    brandCompliance: Boolean,
    maxFileSize: Number,
  },
  generatedImage: String,
  variations: [String],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Creative", creativeSchema)
