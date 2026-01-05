import express from "express"
import Creative from "../models/Creative.js"
import Asset from "../models/Asset.js"
import { aiClient } from "../utils/apiClient.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Generate creative with AI service
router.post("/generate", async (req, res) => {
  try {
    const { assets, colorPalette, format, guidelines } = req.body

    // Validate input
    if (!assets || assets.length === 0) {
      return res.status(400).json({ error: "Assets are required" })
    }

    if (!colorPalette || colorPalette.length === 0) {
      return res.status(400).json({ error: "Color palette is required" })
    }

    // Fetch asset details from database
    const assetDocs = await Asset.find({ _id: { $in: assets } })
    if (assetDocs.length === 0) {
      return res.status(400).json({ error: "No valid assets found" })
    }

    // Convert asset paths to full file paths for AI service
    const assetPaths = assetDocs.map(asset => {
      // Return full path relative to backend root
      return path.join(__dirname, "..", "public", asset.path)
    })

    // Call AI service to generate creative
    let aiResponse
    try {
      aiResponse = await aiClient.post("/api/generate", {
        assets: assetPaths,
        colorPalette,
        format: format || "facebook",
        guidelines: guidelines || { brandCompliance: true, maxFileSize: 500000 },
      })
    } catch (aiError) {
      console.error("AI Service Error:", aiError.message)
      // Fallback: create creative without AI-generated image
      const creative = new Creative({
        name: `Creative-${Date.now()}`,
        assets,
        colorPalette,
        format: format || "facebook",
        guidelines: guidelines || { brandCompliance: true, maxFileSize: 500000 },
        generatedImage: null,
        variations: [],
      })
      await creative.save()
      return res.status(503).json({
        error: aiError.response?.data?.detail || "AI service unavailable. Creative saved without image.",
        creative
      })
    }

    // Save creative with AI-generated image
    const creative = new Creative({
      name: `Creative-${Date.now()}`,
      assets,
      colorPalette,
      format: format || "facebook",
      guidelines: guidelines || { brandCompliance: true, maxFileSize: 500000 },
      generatedImage: aiResponse.data.generatedImage,
      variations: aiResponse.data.variations || [],
    })

    await creative.save()
    res.json({ success: true, creative })
  } catch (error) {
    console.error("Creative generation error:", error)
    res.status(500).json({ error: error.message })
  }
})

// Get all creatives
router.get("/", async (req, res) => {
  try {
    const creatives = await Creative.find()
    res.json(creatives)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
