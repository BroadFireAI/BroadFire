import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  overline?: string;
  children: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  overline,
  children,
  description,
  align = 'left',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {overline && (
        <p
          className={cn(
            'mb-3 text-xs font-medium uppercase tracking-[0.2em] font-mono',
            light ? 'text-japandi-sand/80' : 'text-japandi-mist'
          )}
        >
          {overline}
        </p>
      )}
      <h2
        className={cn(
          'font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl text-balance',
          light ? 'text-japandi-warm-white' : 'text-japandi-charcoal'
        )}
      >
        {children}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed md:text-lg',
            light ? 'text-japandi-sand/90' : 'text-japandi-mist'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
