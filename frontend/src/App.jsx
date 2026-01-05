"use client"

import { useState, useEffect } from "react"
import AssetUploader from "./components/AssetUploader"
import PaletteManager from "./components/PaletteManager"
import CreativeGenerator from "./components/CreativeGenerator"
import PreviewSection from "./components/PreviewSection"
import { uploadAsset, getAssets, getPalettes, createPalette, generateCreative, getCreatives } from "./api/client"

function App() {
  const [assets, setAssets] = useState([])
  const [palettes, setPalettes] = useState([])
  const [creatives, setCreatives] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAssets()
    fetchPalettes()
    fetchCreatives()
  }, [])

  const fetchCreatives = async () => {
    try {
      const res = await getCreatives()
      setCreatives(res.data)
    } catch (err) {
      console.error("Failed to load creatives:", err)
    }
  }

  const fetchAssets = async () => {
    try {
      const res = await getAssets()
      setAssets(res.data)
    } catch (err) {
      setError("Failed to load assets")
    }
  }

  const fetchPalettes = async () => {
    try {
      const res = await getPalettes()
      setPalettes(res.data)
    } catch (err) {
      setError("Failed to load palettes")
    }
  }

  const handleAssetUpload = async (file, assetType) => {
    try {
      setLoading(true)
      setError("")
      const res = await uploadAsset(file, assetType)
      setAssets([...assets, res.data.asset])
      setMessage("Asset uploaded successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setError(err.message || "Failed to upload asset")
    } finally {
      setLoading(false)
    }
  }

  const handlePaletteCreate = async (name, colors, brandName) => {
    try {
      setLoading(true)
      setError("")
      const res = await createPalette({ name, colors, brandName })
      setPalettes([...palettes, res.data.palette])
      setMessage("Palette created successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setError(err.message || "Failed to create palette")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateCreative = async (selectedAssets, selectedPalette, format) => {
    try {
      setLoading(true)
      setError("")
      const res = await generateCreative({
        assets: selectedAssets,
        colorPalette: selectedPalette,
        format,
        guidelines: {
          brandCompliance: true,
          maxFileSize: 500000,
        },
      })
      setCreatives([...creatives, res.data.creative])
      setMessage("Creative generated successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setError(err.message || "Failed to generate creative. Ensure AI service is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>AI-Powered Retail Media Creative Builder</h1>
        <p>Create professional, guideline-compliant creatives with AI assistance</p>
      </header>

      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <div className="main-grid">
        <AssetUploader onUpload={handleAssetUpload} assets={assets} loading={loading} />
        <PaletteManager onCreatePalette={handlePaletteCreate} palettes={palettes} loading={loading} />
      </div>

      <div className="main-grid">
        <CreativeGenerator assets={assets} palettes={palettes} onGenerate={handleGenerateCreative} loading={loading} />
      </div>

      <PreviewSection creatives={creatives} />
    </div>
  )
}

export default App
