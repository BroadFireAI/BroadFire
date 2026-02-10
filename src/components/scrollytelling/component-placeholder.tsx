import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ComponentPlaceholderProps {
  name: string;
  minHeight?: string;
  children?: ReactNode;
  className?: string;
}

export function ComponentPlaceholder({
  name,
  minHeight = '320px',
  children,
  className,
}: ComponentPlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-japandi-sand bg-japandi-linen/50',
        className
      )}
      style={{ minHeight }}
    >
      {children ?? (
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-japandi-mist/70">
            Component
          </span>
          <span className="font-sans text-sm font-semibold text-japandi-earth">{name}</span>
        </div>
      )}
    </div>
  );
}
