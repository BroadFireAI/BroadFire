import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  MessageSquareText,
  MousePointerClick,
  Box,
  Bot,
  Clock,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

/* --- Data --- */
const stages = [
  {
    id: 1,
    title: 'Prompt Engineering Foundations',
    timeline: '2 – 4 weeks',
    icon: MessageSquareText,
    accent: '#1E3A8A', // Royal Blue
    description:
      'Master the fundamentals of communicating with generative models. Focus on conditioning strategies, iterative refinement, and understanding model behavior patterns.',
    skills: [
      'Conditioning strategies',
      'Iterative refinement',
      'Model behavior patterns',
      'Platform familiarity',
    ],
  },
  {
    id: 2,
    title: 'Interaction Design Literacy',
    timeline: '4 – 6 weeks',
    icon: MousePointerClick,
    accent: '#7A8A6E', // Sage
    description:
      'Develop fluency in designing model-environment interactions. Study reinforcement learning concepts, action space design, and reward shaping.',
    skills: [
      'Reinforcement learning concepts',
      'Action space design',
      'Reward shaping',
      'Agent navigation',
    ],
  },
  {
    id: 3,
    title: '3D Tools & Spatial Reasoning',
    timeline: '6 – 8 weeks',
    icon: Box,
    accent: '#C67B5C', // Terracotta
    description:
      'Acquire proficiency with 3D modeling software and spatial mathematics. Learn coordinate systems, transformations, and scene graph architectures.',
    skills: [
      '3D modeling software',
      'Coordinate systems',
      'Spatial transformations',
      'Scene graph architecture',
    ],
  },
  {
    id: 4,
    title: 'Agentic Frameworks Integration',
    timeline: '8 – 12 weeks',
    icon: Bot,
    accent: '#8B7355', // Earth
    description:
      'Synthesize previous stages into autonomous agent development. Master planning algorithms, multi-step reasoning, and model composition techniques.',
    skills: [
      'Planning algorithms',
      'Multi-step reasoning',
      'Model composition',
      'Complex applications',
    ],
  },
];

/* --- Stage Card --- */
function StageCard({
  stage,
  index,
  isActive,
  isComplete,
}: {
  stage: (typeof stages)[number];
  index: number;
  isActive: boolean;
  isComplete: boolean;
}) {
  const Icon = stage.icon;
  const [isExpanded, setIsExpanded] = useState(false);

  // Total cumulative weeks for progress indicator
  const cumulativeWeeks = [4, 10, 18, 30];

  return (
    <div
      className={cn(
        'group relative transition-all duration-700 ease-out',
        isActive || isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        className={cn(
          'relative cursor-pointer rounded-lg border transition-all duration-500',
          'hover:shadow-md',
          isActive
            ? 'border-[var(--japandi-royal)]/30 bg-[var(--japandi-warm-white)] shadow-sm'
            : isComplete
              ? 'border-[var(--japandi-sand)] bg-[var(--japandi-paper)]'
              : 'border-[var(--japandi-sand)] bg-[var(--japandi-linen)]/60'
        )}
      >
        {/* Top accent bar */}
        <div
          className="h-1 rounded-t-lg transition-all duration-500"
          style={{
            backgroundColor: isActive
              ? stage.accent
              : isComplete
                ? stage.accent
                : 'var(--japandi-sand)',
            opacity: isActive ? 1 : isComplete ? 0.5 : 0.3,
          }}
        />

        <div className="p-5 md:p-6">
          {/* Header row */}
          <div className="flex items-start gap-4">
            {/* Icon circle */}
            <div
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500'
              )}
              style={{
                backgroundColor: isActive
                  ? stage.accent
                  : isComplete
                    ? `${stage.accent}20`
                    : 'var(--japandi-linen)',
                color: isActive
                  ? 'var(--japandi-warm-white)'
                  : isComplete
                    ? stage.accent
                    : 'var(--japandi-mist)',
              }}
            >
              {isComplete && !isActive ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </div>

            {/* Text content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{
                    color: isActive ? stage.accent : 'var(--japandi-mist)',
                  }}
                >
                  Stage {stage.id}
                </span>
                {isActive && (
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: `${stage.accent}15`,
                      color: stage.accent,
                    }}
                  >
                    Current Focus
                  </span>
                )}
              </div>

              <h4
                className={cn(
                  'mt-1 font-serif text-lg font-semibold leading-snug md:text-xl text-balance',
                  isActive
                    ? 'text-japandi-charcoal'
                    : isComplete
                      ? 'text-japandi-charcoal'
                      : 'text-japandi-mist'
                )}
              >
                {stage.title}
              </h4>

              {/* Timeline badge */}
              <div className="mt-2 flex items-center gap-1.5">
                <Clock
                  className="h-3.5 w-3.5"
                  style={{
                    color: isActive ? stage.accent : 'var(--japandi-mist)',
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isActive ? stage.accent : 'var(--japandi-mist)',
                  }}
                >
                  {stage.timeline}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-japandi-mist">{stage.description}</p>

              {/* Expand toggle */}
              <button
                className="mt-3 flex items-center gap-1 text-xs font-medium transition-colors duration-200"
                style={{
                  color: isActive ? stage.accent : 'var(--japandi-earth)',
                }}
                tabIndex={-1}
                aria-hidden="true"
              >
                {isExpanded ? 'Hide skills' : 'View key skills'}
                <ChevronRight
                  className={cn(
                    'h-3 w-3 transition-transform duration-300',
                    isExpanded && 'rotate-90'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Expandable skills section */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-500 ease-out',
              isExpanded ? 'mt-4 max-h-60 opacity-100' : 'mt-0 max-h-0 opacity-0'
            )}
          >
            <div className="ml-15 border-t border-japandi-sand/60 pt-4">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-japandi-mist/70">
                Key Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {stage.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${stage.accent}10`,
                      color: stage.accent,
                      border: `1px solid ${stage.accent}20`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cumulative progress bar (bottom) */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-japandi-sand/40">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: isActive || isComplete ? '100%' : '0%',
                  backgroundColor: stage.accent,
                  opacity: isActive ? 0.8 : 0.35,
                }}
              />
            </div>
            <span className="whitespace-nowrap text-[10px] font-mono text-japandi-mist/60">
              {isActive || isComplete ? `~${cumulativeWeeks[index]} wks cumulative` : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Main Component --- */
export function EntryPathway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineTop, setLineTop] = useState(0);
  const [totalTrackHeight, setTotalTrackHeight] = useState(0);

  const setStageRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stageRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];

    stageRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex((prev) => Math.max(prev, index));
          }
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -20% 0px',
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Compute line positions based on active index
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateLine = () => {
      const firstNode = stageRefs.current[0];
      const lastNode = stageRefs.current[stages.length - 1];
      if (!firstNode) return;

      const containerRect = container.getBoundingClientRect();
      const firstRect = firstNode.getBoundingClientRect();

      const startY = firstRect.top - containerRect.top + 28;
      setLineTop(startY);

      if (lastNode) {
        const lastRect = lastNode.getBoundingClientRect();
        const endY = lastRect.top - containerRect.top + lastRect.height / 2;
        setTotalTrackHeight(Math.max(0, endY - startY));
      }

      if (activeIndex >= 0) {
        const activeNode = stageRefs.current[activeIndex];
        if (!activeNode) return;
        const activeRect = activeNode.getBoundingClientRect();
        const endY = activeRect.top - containerRect.top + activeRect.height / 2;
        setLineHeight(Math.max(0, endY - startY));
      }
    };

    updateLine();
    window.addEventListener('resize', updateLine);
    const t = setTimeout(updateLine, 150);
    return () => {
      window.removeEventListener('resize', updateLine);
      clearTimeout(t);
    };
  }, [activeIndex]);

  return (
    <div className="relative" ref={containerRef}>
      {/* Summary bar at top */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3 md:gap-5">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i <= activeIndex ? stage.accent : 'var(--japandi-sand)',
              }}
            />
            <span
              className={cn(
                'text-xs font-medium transition-colors duration-500',
                i <= activeIndex ? 'text-japandi-charcoal' : 'text-japandi-mist/60'
              )}
            >
              {stage.title.split(' ').slice(0, 2).join(' ')}
            </span>
            {i < stages.length - 1 && <ChevronRight className="h-3 w-3 text-japandi-sand" />}
          </div>
        ))}
      </div>

      {/* Total journey estimate */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-japandi-sand bg-japandi-paper px-4 py-2">
          <Clock className="h-4 w-4 text-japandi-royal" />
          <span className="text-sm font-medium text-japandi-charcoal">
            Full pathway: ~20 – 30 weeks
          </span>
        </div>
      </div>

      {/* Stage cards with connecting line */}
      <div className="relative">
        {/* Vertical connecting line (background track) */}
        <div
          className="absolute left-6 hidden w-px md:block"
          style={{
            top: `${lineTop}px`,
            height: `${totalTrackHeight}px`,
            backgroundColor: 'var(--japandi-sand)',
          }}
        />

        {/* Animated fill line */}
        <div
          className="absolute left-6 hidden w-px md:block"
          style={{
            top: `${lineTop}px`,
            height: `${lineHeight}px`,
            backgroundColor: 'var(--japandi-royal)',
            transition: 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />

        {/* Node dots on the line */}
        {stages.map((stage, i) => (
          <div key={`dot-${stage.id}`} ref={setStageRef(i)} className="relative">
            {/* Dot on the line (desktop) */}
            <div className="absolute left-6 top-7 z-10 hidden -translate-x-1/2 md:block">
              <div
                className="h-3 w-3 rounded-full border-2 transition-all duration-500"
                style={{
                  backgroundColor: i <= activeIndex ? stage.accent : 'var(--japandi-warm-white)',
                  borderColor: i <= activeIndex ? stage.accent : 'var(--japandi-sand)',
                  boxShadow: i === activeIndex ? `0 0 0 4px ${stage.accent}20` : 'none',
                }}
              />
            </div>

            {/* Card content (offset for the line on desktop) */}
            <div className="pb-6 md:pl-16 md:pb-8">
              <StageCard
                stage={stage}
                index={i}
                isActive={i === activeIndex}
                isComplete={i < activeIndex}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Completion message */}
      <div
        className={cn(
          'mt-4 flex items-center justify-center gap-3 rounded-lg border border-japandi-sand/60 bg-japandi-paper p-5 transition-all duration-700',
          activeIndex >= stages.length - 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        <CheckCircle2 className="h-5 w-5 text-japandi-sage" />
        <p className="text-sm font-medium text-japandi-charcoal">
          Full-stack world model developer — ready to build, compete, and contribute to the spatial
          intelligence ecosystem.
        </p>
      </div>
    </div>
  );
}
