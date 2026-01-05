export const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Validation failed", details: err.message })
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" })
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  })
}
