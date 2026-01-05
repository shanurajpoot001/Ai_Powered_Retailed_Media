"use client"

import { useState } from "react"

export default function PaletteManager({ onCreatePalette, palettes, loading }) {
  const [brandName, setBrandName] = useState("")
  const [paletteName, setPaletteName] = useState("")
  const [colors, setColors] = useState(["#1e40af", "#60a5fa", "#bfdbfe"])

  const handleCreatePalette = () => {
    if (brandName && paletteName && colors.length > 0) {
      onCreatePalette(paletteName, colors, brandName)
      setBrandName("")
      setPaletteName("")
    }
  }

  const updateColor = (index, newColor) => {
    const newColors = [...colors]
    newColors[index] = newColor
    setColors(newColors)
  }

  return (
    <div className="card">
      <h2>Color Palettes</h2>

      <input
        type="text"
        placeholder="Brand name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          background: "#0f0f0f",
          border: "1px solid #333",
          borderRadius: "4px",
          color: "#e4e4e7",
        }}
      />

      <input
        type="text"
        placeholder="Palette name"
        value={paletteName}
        onChange={(e) => setPaletteName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          background: "#0f0f0f",
          border: "1px solid #333",
          borderRadius: "4px",
          color: "#e4e4e7",
        }}
      />

      <h3 style={{ fontSize: "13px", marginBottom: "10px", color: "#999" }}>Colors</h3>
      <div className="palette-colors">
        {colors.map((color, idx) => (
          <input
            key={idx}
            type="color"
            value={color}
            onChange={(e) => updateColor(idx, e.target.value)}
            className="color-input"
          />
        ))}
      </div>

      <button
        className="btn"
        onClick={handleCreatePalette}
        disabled={loading}
        style={{ marginTop: "20px", width: "100%" }}
      >
        {loading ? "Creating..." : "Create Palette"}
      </button>

      {palettes.length > 0 && (
        <div className="file-list" style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "13px", marginBottom: "10px", color: "#999" }}>Saved Palettes ({palettes.length})</h3>
          {palettes.map((p) => (
            <div key={p._id} className="file-item">
              <span>{p.name}</span>
              <span style={{ color: "#666" }}>{p.brandName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
