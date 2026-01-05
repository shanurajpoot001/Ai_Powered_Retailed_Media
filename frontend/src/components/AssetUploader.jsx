"use client"

import { useState } from "react"

export default function AssetUploader({ onUpload, assets, loading }) {
  const [activeType, setActiveType] = useState("logo")

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onUpload(file, activeType)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) onUpload(file, activeType)
  }

  return (
    <div className="card">
      <h2>Upload Assets</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {["logo", "packshot", "background"].map((type) => (
          <button
            key={type}
            className="btn btn-small"
            onClick={() => setActiveType(type)}
            style={{ background: activeType === type ? "#1e40af" : "#333" }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div 
        className="upload-area" 
        onDrop={handleDrop} 
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('file-input').click()}
        style={{ cursor: 'pointer' }}
      >
        <input 
          id="file-input"
          type="file" 
          accept="image/*" 
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <div style={{ pointerEvents: "none" }}>
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>📁</div>
          <div className="upload-text">Click to upload or drag and drop</div>
          <div className="upload-text" style={{ marginTop: "5px", fontSize: "12px" }}>
            PNG, JPG up to 10MB
          </div>
        </div>
      </div>

      {assets.length > 0 && (
        <div className="file-list">
          <h3 style={{ fontSize: "13px", marginBottom: "10px", color: "#999" }}>Uploaded Assets ({assets.length})</h3>
          {assets.map((asset) => (
            <div key={asset._id} className="file-item">
              <span>{asset.filename}</span>
              <span style={{ color: "#666" }}>{asset.assetType}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
