import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { errorHandler } from "./middleware/errorHandler.js"
import uploadRoutes from "./routes/uploads.js"
import creativeRoutes from "./routes/creatives.js"
import paletteRoutes from "./routes/palettes.js"

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
// Serve generated creatives from AI service
app.use(
  "/generated_creatives",
  express.static(path.join(__dirname, "..", "ai_service", "generated_creatives")),
)

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/retail-creative")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/uploads", uploadRoutes)
app.use("/api/creatives", creativeRoutes)
app.use("/api/palettes", paletteRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the other process or use a different port.`)
    process.exit(1)
  } else {
    throw err
  }
})
