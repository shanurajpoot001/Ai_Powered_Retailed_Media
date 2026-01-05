"use client"

import { useState } from "react"

export default function CreativeGenerator({ assets, palettes, onGenerate, loading }) {
  const [selectedAssets, setSelectedAssets] = useState([])
  const [selectedPalette, setSelectedPalette] = useState("")
  const [format, setFormat] = useState("facebook")

  const handleGenerate = () => {
    if (selectedAssets.length > 0 && selectedPalette) {
      const palette = palettes.find((p) => p._id === selectedPalette)
      if (palette && palette.colors && palette.colors.length > 0) {
        onGenerate(selectedAssets, palette.colors, format)
        // Reset selections after generation
        setSelectedAssets([])
        setSelectedPalette("")
      } else {
        alert("Please select a valid palette with colors")
      }
    } else {
      if (selectedAssets.length === 0) {
        alert("Please select at least one asset")
      }
      if (!selectedPalette) {
        alert("Please select a color palette")
      }
    }
  }

  return (
    <div className="card generator-section">
      <h2>Generate Creative</h2>

      <div className="options-grid">
        <div>
          <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#999" }}>
            Select Assets
          </label>
          <select
            multiple
            value={selectedAssets}
            onChange={(e) => setSelectedAssets(Array.from(e.target.selectedOptions, (opt) => opt.value))}
            style={{
              width: "100%",
              padding: "10px",
              background: "#0f0f0f",
              border: "1px solid #333",
              borderRadius: "4px",
              color: "#e4e4e7",
              minHeight: "100px",
            }}
          >
            {assets.map((asset) => (
              <option key={asset._id} value={asset._id}>
                {asset.filename} ({asset.assetType})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#999" }}>
            Color Palette
          </label>
          <select
            value={selectedPalette}
            onChange={(e) => setSelectedPalette(e.target.value)}
            className="option-select"
          >
            <option value="">Choose a palette</option>
            {palettes.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.brandName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#999" }}>Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="option-select">
            <option value="facebook">Facebook (1200x628)</option>
            <option value="instagram">Instagram (1080x1080)</option>
            <option value="display">Display Ad (300x250)</option>
          </select>
        </div>
      </div>

      <button
        className="btn"
        onClick={handleGenerate}
        disabled={loading || selectedAssets.length === 0 || !selectedPalette}
        style={{
          marginTop: "20px",
          width: "100%",
        }}
      >
        {loading ? "Generating..." : "Generate Creative"}
      </button>
    </div>
  )
}
