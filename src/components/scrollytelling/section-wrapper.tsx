import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  bg?: 'white' | 'paper' | 'linen' | 'royal' | 'charcoal';
  texture?: boolean;
  fullHeight?: boolean;
  noReveal?: boolean;
}

const bgMap: Record<string, string> = {
  white: 'bg-japandi-warm-white text-japandi-charcoal',
  paper: 'bg-japandi-paper text-japandi-charcoal',
  linen: 'bg-japandi-linen text-japandi-charcoal',
  royal: 'bg-japandi-royal text-japandi-warm-white',
  charcoal: 'bg-japandi-charcoal text-japandi-warm-white',
};

export function SectionWrapper({
  id,
  children,
  className,
  bg = 'white',
  texture = false,
  fullHeight = false,
  noReveal = false,
}: SectionWrapperProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={noReveal ? undefined : ref}
      className={cn(
        'relative w-full',
        bgMap[bg],
        fullHeight && 'min-h-screen',
        texture && 'texture-overlay',
        !noReveal && 'reveal-on-scroll',
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:py-32">
        {children}
      </div>
    </section>
  );
}
