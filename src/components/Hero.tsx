import React from 'react';
import { ArrowRight, Cpu, Network, Zap } from 'lucide-react';
import FireBackground from './FireBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-transparent pt-20 lg:pt-0">

      {/*
        Fire Background - Positioned to cover the entire RIGHT side of the screen.
      */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-[90vh] z-0 pointer-events-none mix-blend-multiply">
           <FireBackground className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Gap between columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-32 items-center min-h-[calc(100vh-80px)]">

          {/* Left Column: Text Content */}
          <div className="relative flex flex-col items-start text-left z-10 order-2 lg:order-1 pb-12 lg:pb-0">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm mb-8 animate-fade-in-up z-10">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Advancing Artificial Intelligence
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-extrabold tracking-tighter text-gray-900 relative z-10 mb-6">
              <span className="block mb-2">BroadFire</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 drop-shadow-sm">
                Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-lg md:text-xl text-gray-700 mb-10 leading-relaxed z-10 font-medium">
              Pioneering the future of <span className="text-black font-bold decoration-orange-400 decoration-2 underline-offset-2">Embodied Agents</span>, <span className="text-black font-bold decoration-purple-400 decoration-2 underline-offset-2">Spatial Intelligence</span>, and <span className="text-black font-bold decoration-blue-400 decoration-2 underline-offset-2">Edge AI</span>. We bridge the gap between high-performance computing and physical reality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto z-10">
              <button className="group relative px-8 py-4 bg-black text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-lg hover:shadow-orange-500/20">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Research <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto shadow-sm">
                Read Publications
              </button>
            </div>

            {/* Stats / Quick Info */}
            <div className="mt-16 grid grid-cols-3 gap-8 w-full max-w-lg border-t border-gray-300 pt-8 z-10">
              <div className="flex flex-col items-start gap-1">
                <Cpu className="w-5 h-5 text-gray-900 mb-1" />
                <span className="text-xl font-bold text-gray-900">HPC</span>
                <span className="text-xs text-gray-600 font-medium">Supercomputing</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <Network className="w-5 h-5 text-gray-900 mb-1" />
                <span className="text-xl font-bold text-gray-900">Edge AI</span>
                <span className="text-xs text-gray-600 font-medium">Real-time</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <Zap className="w-5 h-5 text-gray-900 mb-1" />
                <span className="text-xl font-bold text-gray-900">Robotics</span>
                <span className="text-xs text-gray-600 font-medium">Embodied</span>
              </div>
            </div>
          </div>

          {/* Right Column: Empty now, serving as spacing for the background shader */}
          <div className="hidden lg:block relative w-full h-full order-1 lg:order-2 z-20 pointer-events-none">
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
