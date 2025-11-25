import React from 'react';

const EngineeringSection: React.FC = () => {
  return (
    <section className="relative w-full py-32 lg:py-48 border-t border-gray-200 overflow-hidden">

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

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-gray-900 leading-[1.1] tracking-tight">
              Engineering experiments for <span className="italic text-gray-600">safety</span> and <span className="italic text-gray-600">embodied intelligence</span>.
            </h2>

            <div className="w-16 h-1 bg-orange-600 mt-10" />
          </div>

          {/* Right side: Image Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pt-40">

            {/* Card 1: Spatial Intelligence */}
            <div className="flex flex-col gap-4 group">
              <div className="aspect-[4/3] w-full bg-white border border-gray-200 p-2 shadow-sm relative overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gray-900/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-500 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
                  alt="Spatial Intelligence"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Technical Overlay Lines */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none" />
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-500">FIG 1.0</div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Spatial Intelligence
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-serif">
                  Creating AI models that understand 3D geometry and spatial relationships, enabling seamless interaction with complex environments.
                </p>
              </div>
            </div>

            {/* Card 2: Mechanistic Interpretability */}
            <div className="flex flex-col gap-4 group sm:mt-12">
              {/* sm:mt-12 adds a slight offset/stagger effect for visual interest, keeping them side-by-side but not rigid */}
              <div className="aspect-[4/3] w-full bg-white border border-gray-200 p-2 shadow-sm relative overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gray-900/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-500 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800"
                  alt="Mechanistic Interpretability"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-black/5 pointer-events-none" />
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-500">FIG 1.1</div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                  Mechanistic Interpretability
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-serif">
                  Reverse-engineering neural networks to understand the internal algorithms that drive behavior, ensuring transparency and safety.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringSection;