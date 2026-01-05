import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 sticky top-0 z-50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              AI
            </div>
            <h1 className="text-2xl font-bold text-white">Creative Builder</h1>
          </div>
          <Link href="https://github.com" target="_blank" className="text-slate-300 hover:text-white transition">
            GitHub
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">AI-Powered Retail Media Creative Builder</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Create professional, guideline-compliant creatives with AI assistance. A complete MERN + Python stack for
            generating high-quality retail media assets.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#getting-started"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </a>
            <a
              href="#architecture"
              className="border border-blue-600 text-blue-400 hover:bg-blue-600/10 px-8 py-3 rounded-lg font-semibold transition"
            >
              Architecture
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: "⚡", title: "Fast Setup", desc: "Docker Compose ready in seconds" },
          { icon: "🎨", title: "Creative AI", desc: "Python FastAPI for image processing" },
          { icon: "🔗", title: "Full Stack", desc: "Frontend, Backend, and AI Service" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-600/50 transition"
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{stat.title}</h3>
            <p className="text-slate-400">{stat.desc}</p>
          </div>
        ))}
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="max-w-7xl mx-auto px-6 py-16 mb-20">
        <h3 className="text-3xl font-bold text-white mb-8">Getting Started</h3>

        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                1
              </span>
              Docker Compose (Recommended)
            </h4>
            <div className="bg-slate-900 rounded p-4 overflow-x-auto mb-4">
              <code className="text-green-400 font-mono text-sm">docker-compose up -d</code>
            </div>
            <p className="text-slate-300 mb-3">This starts all three services:</p>
            <ul className="space-y-2 text-slate-300">
              <li>✓ Frontend: http://localhost:3000</li>
              <li>✓ Backend: http://localhost:5000</li>
              <li>✓ AI Service: http://localhost:8000</li>
              <li>✓ MongoDB: port 27017</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                2
              </span>
              Manual Setup
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-300 font-semibold mb-2">Backend:</p>
                <div className="bg-slate-900 rounded p-3">
                  <code className="text-green-400 font-mono text-sm">cd backend && npm install && npm run dev</code>
                </div>
              </div>
              <div>
                <p className="text-slate-300 font-semibold mb-2">AI Service:</p>
                <div className="bg-slate-900 rounded p-3">
                  <code className="text-green-400 font-mono text-sm">
                    cd ai_service && pip install -r requirements.txt && python main.py
                  </code>
                </div>
              </div>
              <div>
                <p className="text-slate-300 font-semibold mb-2">Frontend:</p>
                <div className="bg-slate-900 rounded p-3">
                  <code className="text-green-400 font-mono text-sm">cd frontend && npm install && npm run dev</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="max-w-7xl mx-auto px-6 py-16 mb-20">
        <h3 className="text-3xl font-bold text-white mb-8">Architecture</h3>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "📱 Frontend",
              tech: "React + Vite",
              features: ["Asset Upload", "Palette Manager", "Creative Generator", "Dark UI"],
            },
            {
              title: "🔧 Backend",
              tech: "Node.js/Express",
              features: ["Asset API", "MongoDB Integration", "File Handling", "Error Management"],
            },
            {
              title: "🤖 AI Service",
              tech: "Python FastAPI",
              features: ["Image Processing", "Creative Generation", "Format Support", "Quality Optimization"],
            },
          ].map((service, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h4 className="text-2xl font-bold text-white mb-2">{service.title}</h4>
              <p className="text-blue-400 font-semibold mb-4">{service.tech}</p>
              <ul className="space-y-2">
                {service.features.map((feature, j) => (
                  <li key={j} className="text-slate-300 flex items-center gap-2">
                    <span className="text-blue-400">▸</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h4 className="text-xl font-bold text-white mb-4">Data Flow</h4>
          <div className="text-slate-300 space-y-3 font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="text-blue-400">1.</span>
              <span>User uploads assets → Frontend sends to Backend</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400">2.</span>
              <span>Backend stores in MongoDB, optimizes with Sharp</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400">3.</span>
              <span>User creates color palette → Stored in MongoDB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400">4.</span>
              <span>Generate request → Backend calls AI Service</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400">5.</span>
              <span>AI generates variations → Results saved to DB</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-400">6.</span>
              <span>Frontend displays previews to user</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-20">
        <h3 className="text-3xl font-bold text-white mb-8">Features</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Asset Management", desc: "Upload logos, packshots, backgrounds with auto-optimization" },
            { title: "Color Palettes", desc: "Create and manage brand-specific color schemes" },
            { title: "AI Generation", desc: "Auto-generate creative variations in multiple formats" },
            { title: "Format Support", desc: "Facebook, Instagram, Display Ads with optimized sizes" },
            { title: "Image Processing", desc: "Background removal, enhancement, resizing, cropping" },
            { title: "Guideline Validation", desc: "Ensure compliance with brand rules and retailer requirements" },
          ].map((feature, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* API Endpoints */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-20">
        <h3 className="text-3xl font-bold text-white mb-8">API Endpoints</h3>

        <div className="space-y-4">
          {[
            { method: "POST", path: "/api/uploads/upload", desc: "Upload an asset" },
            { method: "GET", path: "/api/uploads", desc: "Get all assets" },
            { method: "POST", path: "/api/palettes/create", desc: "Create color palette" },
            { method: "GET", path: "/api/palettes", desc: "Get all palettes" },
            { method: "POST", path: "/api/creatives/generate", desc: "Generate creative" },
            { method: "GET", path: "/api/creatives", desc: "Get all creatives" },
          ].map((endpoint, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-4">
              <span
                className={`font-mono font-bold px-3 py-1 rounded ${
                  endpoint.method === "POST" ? "bg-green-900 text-green-300" : "bg-blue-900 text-blue-300"
                }`}
              >
                {endpoint.method}
              </span>
              <span className="font-mono text-slate-300 flex-1">{endpoint.path}</span>
              <span className="text-slate-400">{endpoint.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-20">
        <h3 className="text-3xl font-bold text-white mb-8">Troubleshooting</h3>

        <div className="space-y-4">
          {[
            {
              issue: "AI service unavailable",
              solution: "Ensure Python service runs on port 8000: curl http://localhost:8000/api/health",
            },
            { issue: "MongoDB connection error", solution: "Ensure MongoDB is running or use: docker-compose up" },
            { issue: "CORS errors", solution: "Backend CORS is configured for localhost. Check port numbers." },
            {
              issue: "Upload fails",
              solution: "Check that public/uploads directory exists or runs with proper permissions",
            },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <p className="text-red-400 font-semibold mb-2">{item.issue}</p>
              <p className="text-slate-300">{item.solution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-t from-slate-900 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to build?</h3>
          <p className="text-slate-300 mb-8">Start with Docker Compose or follow manual setup instructions above</p>
          <a
            href="#getting-started"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 text-center text-slate-400">
        <p>AI-Powered Retail Media Creative Builder • Hackathon Prototype 2025</p>
      </footer>
    </main>
  )
}
