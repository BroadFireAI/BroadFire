import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import WaterWaveBackground from './components/WaterWaveBackground';

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen text-gray-900 bg-[#F5F2E8] selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden">
        {/* Technical Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <Navigation />

        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>

          {/* Footer with Water Wave Shader Background */}
          <footer className="relative w-full min-h-[400px] border-t border-gray-200 overflow-hidden">
            {/* Water Wave Shader Background */}
            <div className="absolute inset-0 z-0">
              <WaterWaveBackground />
            </div>

            {/* Footer Content */}
            <div className="relative z-10 h-full flex items-end pb-8">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                    <p>&copy; 2024 BroadFire Ai. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                      <a href="#" className="hover:text-black transition-colors">Privacy</a>
                      <a href="#" className="hover:text-black transition-colors">Terms</a>
                      <a href="#" className="hover:text-black transition-colors">Twitter</a>
                      <a href="#" className="hover:text-black transition-colors">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;