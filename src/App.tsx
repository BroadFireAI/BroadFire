import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import EngineeringSection from './components/EngineeringSection';

function App() {
  return (
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
        <Hero />
        <EngineeringSection />

        {/* Footer */}
        <footer className="w-full py-12 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; 2024 BroadFire Ai. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
              <a href="#" className="hover:text-black transition-colors">Twitter</a>
              <a href="#" className="hover:text-black transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;