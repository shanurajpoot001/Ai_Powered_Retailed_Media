import express from "express"
import multer from "multer"
import sharp from "sharp"
import fs from "fs"
import Asset from "../models/Asset.js"

const router = express.Router()

// Create uploads directory if it doesn't exist
const uploadsDir = "public/uploads"
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

// Upload asset
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const { assetType } = req.body

    // Basic image optimization (only if it's an image)
    if (req.file.mimetype.startsWith("image/")) {
      try {
        await sharp(req.file.path)
          .resize(1200, 800, { withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(req.file.path)
      } catch (sharpError) {
        console.log("Image optimization skipped:", sharpError.message)
        // Continue without optimization if sharp fails
      }
    }

    const asset = new Asset({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      assetType: assetType || "logo",
    })

    await asset.save()
    res.json({ success: true, asset })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ error: error.message })
  }
})

// Get all assets
router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find()
    res.json(assets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
