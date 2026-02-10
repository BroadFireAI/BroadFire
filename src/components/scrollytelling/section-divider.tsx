import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return <div className={cn('section-divider mx-auto max-w-6xl', className)} />;
}
