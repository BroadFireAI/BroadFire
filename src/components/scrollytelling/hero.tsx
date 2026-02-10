import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-japandi-royal texture-overlay"
    >
      {/* Subtle geometric accent */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/3 h-px bg-japandi-warm-white/10" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 right-0 h-px bg-japandi-warm-white/5" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center md:px-10">
        {/* Overline */}
        <p
          className={`mb-6 font-mono text-xs font-medium uppercase tracking-[0.25em] text-japandi-sand/70 transition-all duration-700 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          February 2026 Report
        </p>

        {/* Main heading */}
        <h1
          className={`font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-japandi-warm-white text-balance md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 ease-out delay-150 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          The GPT-2 Moment
          <br />
          <span className="text-japandi-sand/90">for World Models</span>
        </h1>

        {/* Subheading */}
        <p
          className={`mt-8 max-w-2xl text-base leading-relaxed text-japandi-sand/80 md:text-lg lg:text-xl transition-all duration-700 ease-out delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          World models have transitioned from theoretical research to a platform for high-impact
          applications. February 2026 represents the threshold where spatial intelligence became
          accessible, powerful, and ready for developers to build the future.
        </p>

        {/* Thin decorative line */}
        <div
          className={`mt-10 h-px w-16 bg-japandi-sand/30 transition-all duration-700 ease-out delay-[450ms] ${
            isLoaded ? 'w-16 opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* Scroll prompt */}
        <a
          href="#executive-summary"
          className={`mt-12 flex flex-col items-center gap-2 text-japandi-sand/50 transition-all duration-700 ease-out delay-[600ms] hover:text-japandi-warm-white cursor-pointer ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          aria-label="Scroll to executive summary"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
