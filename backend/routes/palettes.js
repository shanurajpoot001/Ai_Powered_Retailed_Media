import express from "express"
import ColorPalette from "../models/ColorPalette.js"

const router = express.Router()

// Create color palette
router.post("/create", async (req, res) => {
  try {
    const { name, colors, brandName } = req.body
    const palette = new ColorPalette({ name, colors, brandName })
    await palette.save()
    res.json({ success: true, palette })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all palettes
router.get("/", async (req, res) => {
  try {
    const palettes = await ColorPalette.find()
    res.json(palettes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
