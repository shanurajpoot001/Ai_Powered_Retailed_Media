// Simple API testing script
import axios from "axios"

const baseURL = "http://localhost:5000/api"

const tests = {
  async checkHealth() {
    console.log("\n✓ Testing backend health...")
    try {
      const res = await axios.get(`${baseURL}/health`)
      console.log("Backend health:", res.data)
      return true
    } catch (error) {
      console.error("Backend health check failed:", error.message)
      return false
    }
  },

  async checkAIService() {
    console.log("\n✓ Testing AI service connection...")
    try {
      const res = await axios.get("http://localhost:8000/api/health")
      console.log("AI service health:", res.data)
      return true
    } catch (error) {
      console.error("AI service connection failed. Make sure Python service is running.")
      return false
    }
  },

  async getAssets() {
    console.log("\n✓ Testing assets endpoint...")
    try {
      const res = await axios.get(`${baseURL}/uploads`)
      console.log(`Found ${res.data.length} assets`)
      return true
    } catch (error) {
      console.error("Failed to get assets:", error.message)
      return false
    }
  },

  async getPalettes() {
    console.log("\n✓ Testing palettes endpoint...")
    try {
      const res = await axios.get(`${baseURL}/palettes`)
      console.log(`Found ${res.data.length} palettes`)
      return true
    } catch (error) {
      console.error("Failed to get palettes:", error.message)
      return false
    }
  },

  async getCreatives() {
    console.log("\n✓ Testing creatives endpoint...")
    try {
      const res = await axios.get(`${baseURL}/creatives`)
      console.log(`Found ${res.data.length} creatives`)
      return true
    } catch (error) {
      console.error("Failed to get creatives:", error.message)
      return false
    }
  },
}

async function runTests() {
  console.log("=== API Testing Suite ===")

  const results = {
    passed: 0,
    failed: 0,
  }

  for (const [name, test] of Object.entries(tests)) {
    try {
      const passed = await test()
      if (passed) {
        results.passed++
      } else {
        results.failed++
      }
    } catch (error) {
      console.error(`Test ${name} crashed:`, error.message)
      results.failed++
    }
  }

  console.log("\n=== Test Results ===")
  console.log(`Passed: ${results.passed}/${results.passed + results.failed}`)

  if (results.failed === 0) {
    console.log("\n✅ All tests passed!")
  } else {
    console.log(`\n❌ ${results.failed} tests failed`)
  }
}

runTests().catch(console.error)
