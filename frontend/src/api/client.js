import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

// Response interceptor with error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || "Request failed"
    return Promise.reject({ message, status: error.response?.status })
  },
)

export const uploadAsset = (file, assetType) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("assetType", assetType)
  return apiClient.post("/uploads/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export const getAssets = () => apiClient.get("/uploads")
export const getPalettes = () => apiClient.get("/palettes")
export const createPalette = (data) => apiClient.post("/palettes/create", data)
export const generateCreative = (data) => apiClient.post("/creatives/generate", data)
export const getCreatives = () => apiClient.get("/creatives")
