import axios from "axios"

export const aiClient = axios.create({
  baseURL: process.env.AI_SERVICE_URL || "http://localhost:8000",
  timeout: 30000,
})

export const handleAIError = (error) => {
  if (error.response?.status === 500) {
    throw new Error("AI service error: " + error.response.data.detail)
  }
  throw new Error("Failed to reach AI service")
}
