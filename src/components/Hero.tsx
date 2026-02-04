import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

const FireBackground = lazy(() => import('./FireBackground'));

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white">
      {/* Fire Background - Right side */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0 bg-white" />}>
          <FireBackground className="w-full h-full" />
        </Suspense>
      </div>

      {/* Content card - Bottom left */}
      <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 lg:bottom-10 lg:left-8 z-10 max-w-xl w-[calc(100%-2rem)] sm:w-auto">
        <div className="bg-[#0A0A0A] p-6 sm:p-8 lg:p-10">
          <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide">
            understanding intelligence
          </p>

          {/* Research focus areas */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'Multimodal LLMs',
              'Neuro-symbolic AI',
              'Mechanistic Interpretability',
              'Scientific ML',
            ].map((area) => (
              <span
                key={area}
                className="px-4 py-2 text-sm text-gray-300 bg-white/5 border border-white/10 font-medium"
              >
                {area}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/research"
              className="px-8 py-3 bg-white text-[#0A0A0A] font-medium text-sm hover:bg-gray-200 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Explore Research
            </Link>
            <Link
              to="/publications"
              className="px-8 py-3 bg-transparent text-white font-medium text-sm border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
            >
              Publications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
