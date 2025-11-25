import React from 'react';
import MissionShader from './MissionShader';

const EngineeringSection: React.FC = () => {
  return (
    <section className="relative w-full py-32 lg:py-48 bg-[#F5F2E8] border-t border-gray-200 overflow-hidden">
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
      
      {/* Decorative Technical Markers */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-12 left-8 w-3 h-3 border-l-2 border-t-2 border-black/20" />
          <div className="absolute bottom-12 right-8 w-3 h-3 border-r-2 border-b-2 border-black/20" />
          <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-black/10" />
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-black/5 dashed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Side: Content */}
          <div className="flex flex-col items-start pr-0 lg:pr-12">
             <div className="inline-block px-3 py-1 mb-6 border border-gray-300 rounded-full text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/50 backdrop-blur-sm">
                Mission Statement
             </div>
             
             {/* Updated typography to match Hero section */}
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tighter">
               Engineering experiments for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-purple-600">safety</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-purple-600">spatial intelligence</span>.
             </h2>
             
             <div className="w-16 h-1 bg-orange-600 mt-10" />
          </div>
          
          {/* Right side: 3D Raymarching Shader */}
          <div className="w-full lg:pt-32 h-[600px] flex flex-col justify-end">
             <div className="relative w-full h-full border border-gray-900 bg-black rounded-sm overflow-hidden shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
                 <div className="absolute inset-0 z-10 pointer-events-none border-[0.5px] border-white/10" />
                 <MissionShader />
             </div>
             <div className="mt-3 flex justify-between items-center font-mono text-xs text-gray-400 tracking-wider">
                <span>RAYMARCH_ENGINE_V1</span>
                <span>METABALL_SIMULATION</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringSection;