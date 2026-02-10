import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Research from './pages/Research';
import Publications from './pages/Publications';
import Treatises from './pages/Treatises';
import TreatisePost from './pages/TreatisePost';
import WorldModels from './pages/WorldModels';

const WaterWaveBackground = lazy(() => import('./components/WaterWaveBackground'));

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen text-[#0A0A0A] bg-white selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
        {/* Technical Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <Navigation />

        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/treatises" element={<Treatises />} />
            <Route path="/treatises/:slug" element={<TreatisePost />} />
            <Route path="/world-models" element={<WorldModels />} />
          </Routes>

          {/* Footer with Water Wave Shader Background */}
          <footer className="relative w-full min-h-[500px] border-t border-[#E5E5E5] overflow-hidden">
            {/* Water Wave Shader Background - Interactive */}
            <div className="absolute inset-0 z-0">
              <Suspense
                fallback={
                  <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100" />
                }
              >
                <WaterWaveBackground />
              </Suspense>
            </div>

            {/* Footer Content - Positioned at bottom, pointer-events-none to allow shader interaction */}
            <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 pointer-events-none">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="bg-white/90 backdrop-blur-sm p-6 shadow-lg pointer-events-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center text-[#525252] text-sm">
                    <p>&copy; 2025 BroadFire AI. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                      <a href="/privacy" className="hover:text-[#0A0A0A] transition-colors">
                        Privacy
                      </a>
                      <a href="/terms" className="hover:text-[#0A0A0A] transition-colors">
                        Terms
                      </a>
                      <a
                        href="https://twitter.com/broadfire_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#0A0A0A] transition-colors"
                      >
                        Twitter
                      </a>
                      <a
                        href="https://github.com/broadfire-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#0A0A0A] transition-colors"
                      >
                        GitHub
                      </a>
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
