export default function PreviewSection({ creatives }) {
  if (creatives.length === 0) {
    return (
      <div className="preview-area">
        <h3>Generated Creatives</h3>
        <div style={{ textAlign: "center", color: "#666", padding: "40px" }}>
          No creatives generated yet. Upload assets and click generate to see previews here.
        </div>
      </div>
    )
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath
    // Otherwise, construct URL from backend
    const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'
    return `${baseUrl}${imagePath}`
  }

  return (
    <div className="preview-area">
      <h3>Generated Creatives ({creatives.length})</h3>
      <div className="preview-grid">
        {creatives.map((creative, idx) => (
          <div key={creative._id || idx} className="preview-card">
            {creative.generatedImage && (
              <div className="preview-image">
                <img 
                  src={getImageUrl(creative.generatedImage)} 
                  alt={`Creative ${idx + 1}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <div style={{ display: 'none', padding: '20px', textAlign: 'center', color: '#666' }}>
                  Image loading...
                </div>
              </div>
            )}
            {!creative.generatedImage && (
              <div className="preview-image" style={{ padding: '20px', textAlign: 'center' }}>
                Preview (Format: {creative.format})
              </div>
            )}
            <div className="preview-info">
              <div style={{ marginBottom: "5px" }}>
                <strong>Format:</strong> {creative.format}
              </div>
              <div style={{ marginBottom: "5px" }}>
                <strong>Created:</strong> {creative.createdAt ? new Date(creative.createdAt).toLocaleDateString() : 'N/A'}
              </div>
              <div>
                <strong>Variations:</strong> {creative.variations?.length || 0}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
