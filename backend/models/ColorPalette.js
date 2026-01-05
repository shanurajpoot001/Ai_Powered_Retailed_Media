import mongoose from "mongoose"

const paletteSchema = new mongoose.Schema({
  name: String,
  colors: [String],
  brandName: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("ColorPalette", paletteSchema)
