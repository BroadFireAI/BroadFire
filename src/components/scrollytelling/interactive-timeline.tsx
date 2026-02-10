import React from 'react';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Globe,
  MapPin,
  Trophy,
  GraduationCap,
  FlaskConical,
  MonitorPlay,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

/* --- Data --- */

interface MilestoneDetail {
  label: string;
  items: string[];
}

interface Milestone {
  id: string;
  date: string;
  monthShort: string;
  dayLabel: string;
  title: string;
  location: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  icon: React.ElementType;
  summary: string;
  details: MilestoneDetail[];
  isAnchor?: boolean;
}

const milestones: Milestone[] = [
  {
    id: 'odyssey-api',
    date: 'January 23, 2026',
    monthShort: 'JAN',
    dayLabel: '23',
    title: 'Odyssey API Launch',
    location: 'Global (Online)',
    accentColor: '#7A8A6E',
    accentBg: 'rgba(122, 138, 110, 0.10)',
    accentBorder: 'rgba(122, 138, 110, 0.35)',
    icon: Globe,
    summary:
      'Odyssey.ml opens developer access to Odyssey-2 Pro platform, enabling programmatic world model generation. First commercial API for high-fidelity spatial simulation.',
    details: [
      {
        label: 'API Specifications',
        items: [
          'RESTful & streaming endpoints',
          'Text, sensor data, and video input modalities',
          'Tiered pricing with free developer sandbox',
          'Rate limits: 60 req/min (free) to 1,000 req/min (enterprise)',
        ],
      },
      {
        label: 'Supported Outputs',
        items: [
          'High-fidelity spatial simulations',
          'Action-conditioned video sequences',
          'Latent state embeddings for downstream tasks',
        ],
      },
    ],
  },
  {
    id: 'palo-alto-hackathon',
    date: 'February 5, 2026',
    monthShort: 'FEB',
    dayLabel: '5',
    title: 'Odyssey-2 Pro Hackathon',
    location: 'Palo Alto, California',
    accentColor: '#1E3A8A',
    accentBg: 'rgba(30, 58, 138, 0.10)',
    accentBorder: 'rgba(30, 58, 138, 0.35)',
    icon: Trophy,
    summary:
      'The definitive "GPT-2 moment" \u2014 first major showcase proving world models\u2019 practical application potential. $50,000 first-place prize.',
    details: [
      {
        label: 'Prize Structure',
        items: [
          '$50,000 first place + matching API credits',
          '$15,000 second place',
          '$5,000 third place',
        ],
      },
      {
        label: 'Judging Criteria',
        items: [
          'Predictive Accuracy',
          'Novelty & Impact',
          'Technical Sophistication',
          'Scalability',
        ],
      },
      {
        label: 'Demo Categories',
        items: ['High-fidelity simulation', 'Long-range forecasting', 'Counterfactual reasoning'],
      },
    ],
    isAnchor: true,
  },
  {
    id: 'mila-workshop',
    date: 'February 4\u20136, 2026',
    monthShort: 'FEB',
    dayLabel: '4-6',
    title: 'Mila Workshop',
    location: 'Montr\u00e9al, Canada',
    accentColor: '#A0826D',
    accentBg: 'rgba(160, 130, 109, 0.10)',
    accentBorder: 'rgba(160, 130, 109, 0.35)',
    icon: GraduationCap,
    summary:
      'Academic exploration of world model architectures. Researchers present abstract representation approaches and latent state prediction methodologies.',
    details: [
      {
        label: 'Workshop Tracks',
        items: [
          'JEPA variants & joint-embedding methods',
          'Agent-based modeling in latent spaces',
          'Multi-modal ingestion techniques',
          'Benchmarking abstract world models',
        ],
      },
      {
        label: 'Key Focus Areas',
        items: [
          'Contrasting generative vs. abstract approaches',
          'Latent state prediction for efficient planning',
          'Bridging theory and applications',
        ],
      },
    ],
  },
  {
    id: 'iclr-workshop',
    date: 'April 23, 2026',
    monthShort: 'APR',
    dayLabel: '23',
    title: 'ICLR Workshop',
    location: 'Rio de Janeiro, Brazil',
    accentColor: '#7A8A6E',
    accentBg: 'rgba(122, 138, 110, 0.10)',
    accentBorder: 'rgba(122, 138, 110, 0.35)',
    icon: FlaskConical,
    summary:
      'Cross-pollination between world models and reinforcement learning. Papers on spatial intelligence for robotics and real-world deployment challenges.',
    details: [
      {
        label: 'Key Paper Topics',
        items: [
          'Spatial intelligence for robotic manipulation',
          'Autonomous systems integration',
          'Sim-to-real transfer with world models',
          'Multi-agent coordination in simulated worlds',
        ],
      },
      {
        label: 'Research Institutions',
        items: [
          'DeepMind, FAIR, Stanford, Mila',
          'UC Berkeley, MIT, ETH Z\u00fcrich',
          'World Labs, Wayve Research',
        ],
      },
    ],
  },
  {
    id: 'cvpr-challenges',
    date: 'June 2026',
    monthShort: 'JUN',
    dayLabel: '\u2014',
    title: 'CVPR Challenges',
    location: 'Denver, Colorado',
    accentColor: '#C67B5C',
    accentBg: 'rgba(198, 123, 92, 0.10)',
    accentBorder: 'rgba(198, 123, 92, 0.35)',
    icon: MonitorPlay,
    summary:
      'GigaBiran (billion-parameter models), 4D scene understanding, and video prediction benchmarks. Pushing the boundaries of spatial and temporal modeling fidelity.',
    details: [
      {
        label: 'Competition Tracks',
        items: [
          'GigaBiran: billion-parameter world models',
          '4D scene understanding benchmark',
          'Video prediction fidelity challenge',
        ],
      },
      {
        label: 'Evaluation Metrics',
        items: [
          'Fr\u00e9chet Video Distance (FVD)',
          'Peak Signal-to-Noise Ratio (PSNR)',
          'Perceptual similarity (LPIPS)',
          'Temporal consistency score',
        ],
      },
    ],
  },
];

/* --- Sub-components --- */

function TimelineProgressBar({ activeIndex, total }: { activeIndex: number; total: number }) {
  const pct = ((activeIndex + 1) / total) * 100;
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-japandi-mist/70">
        Timeline
      </span>
      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-japandi-sand/50">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: milestones[activeIndex]?.accentColor ?? '#1E3A8A',
          }}
        />
      </div>
      <span className="font-mono text-[10px] font-medium tabular-nums text-japandi-mist/70">
        {activeIndex + 1}/{total}
      </span>
    </div>
  );
}

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];

function HorizontalTrack({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const positions = [
    (23 / 181) * 100,
    (36 / 181) * 100,
    (35 / 181) * 100,
    (113 / 181) * 100,
    (152 / 181) * 100,
  ];

  return (
    <div className="relative hidden md:block">
      <div className="flex justify-between px-2 pb-3">
        {months.map((m) => (
          <span
            key={m}
            className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-japandi-mist/50"
          >
            {m}
          </span>
        ))}
      </div>

      <div className="relative h-[3px] w-full rounded-full bg-japandi-sand/40">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${positions[activeIndex]}%`,
            backgroundColor: milestones[activeIndex]?.accentColor ?? '#8B7355',
          }}
        />

        {milestones.map((ms, i) => (
          <button
            key={ms.id}
            onClick={() => onSelect(i)}
            className="group absolute -top-[9px] cursor-pointer"
            style={{ left: `${positions[i]}%`, transform: 'translateX(-50%)' }}
            aria-label={`Go to ${ms.title}`}
          >
            <span
              className={cn(
                'block rounded-full border-2 transition-all duration-300',
                i === activeIndex
                  ? 'h-[21px] w-[21px] shadow-md'
                  : 'h-[13px] w-[13px] border-japandi-sand bg-japandi-warm-white group-hover:scale-125'
              )}
              style={
                i === activeIndex
                  ? {
                      backgroundColor: ms.accentColor,
                      borderColor: ms.accentColor,
                    }
                  : undefined
              }
            />

            {i !== activeIndex && (
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-japandi-charcoal px-2 py-0.5 font-mono text-[9px] text-japandi-warm-white opacity-0 transition-opacity group-hover:opacity-100">
                {ms.monthShort} {ms.dayLabel}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileNav({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-4 md:hidden">
      {milestones.map((ms, i) => (
        <button
          key={ms.id}
          onClick={() => onSelect(i)}
          className="cursor-pointer p-1"
          aria-label={`Go to ${ms.title}`}
        >
          <span
            className={cn(
              'block rounded-full transition-all duration-300',
              i === activeIndex ? 'h-3 w-3' : 'h-2 w-2 bg-japandi-sand'
            )}
            style={i === activeIndex ? { backgroundColor: ms.accentColor } : undefined}
          />
        </button>
      ))}
    </div>
  );
}

function DetailPanel({ milestone, onClose }: { milestone: Milestone; onClose: () => void }) {
  return (
    <div
      className="mt-4 animate-fade-in-up rounded-lg border p-5 md:p-6"
      style={{
        backgroundColor: milestone.accentBg,
        borderColor: milestone.accentBorder,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: milestone.accentColor }}
        >
          Details
        </span>
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-japandi-sand/30 cursor-pointer"
          aria-label="Close details"
        >
          <X className="h-3.5 w-3.5 text-japandi-mist" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {milestone.details.map((group) => (
          <div key={group.label}>
            <h4 className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-japandi-charcoal/80">
              {group.label}
            </h4>
            <ul className="flex flex-col gap-1.5">
              {group.items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-[13px] leading-snug text-japandi-stone"
                >
                  <span
                    className="mt-[6px] block h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: milestone.accentColor }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneCard({
  milestone,
  isActive,
  expanded,
  onExpand,
  onCollapse,
  onActivate,
}: {
  milestone: Milestone;
  isActive: boolean;
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onActivate?: () => void;
}) {
  const Icon = milestone.icon;

  return (
    <div
      className={cn(
        'group relative rounded-xl border transition-all duration-500',
        isActive
          ? 'border-japandi-sand bg-japandi-paper shadow-sm'
          : 'border-japandi-sand/30 bg-japandi-paper/40 opacity-60 cursor-pointer hover:opacity-80 hover:bg-japandi-paper/60'
      )}
      onClick={!isActive && onActivate ? () => onActivate() : undefined}
      role={!isActive ? 'button' : undefined}
      tabIndex={!isActive ? 0 : undefined}
      onKeyDown={
        !isActive && onActivate
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate();
              }
            }
          : undefined
      }
    >
      {isActive && (
        <div
          className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
          style={{ backgroundColor: milestone.accentColor }}
        />
      )}

      <div className="p-5 pl-6 md:p-6 md:pl-7">
        <div className="flex items-start gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
            style={{
              backgroundColor: milestone.accentBg,
              color: milestone.accentColor,
            }}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: milestone.accentColor }}
            >
              {milestone.date}
            </p>

            <h3
              className={cn(
                'mt-1 font-serif text-xl font-semibold leading-tight text-japandi-charcoal md:text-2xl',
                milestone.isAnchor && 'md:text-[1.65rem]'
              )}
            >
              {milestone.title}
            </h3>

            <div className="mt-1.5 flex items-center gap-1.5 text-japandi-mist">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{milestone.location}</span>
            </div>

            {milestone.isAnchor && (
              <span
                className="mt-2.5 inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{
                  backgroundColor: milestone.accentBg,
                  color: milestone.accentColor,
                  border: `1px solid ${milestone.accentBorder}`,
                }}
              >
                Anchor Event
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-japandi-stone md:text-[15px]">
          {milestone.summary}
        </p>

        {isActive && (
          <button
            onClick={expanded ? onCollapse : onExpand}
            className="mt-4 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer hover:shadow-sm"
            style={{
              color: milestone.accentColor,
              backgroundColor: expanded ? milestone.accentBg : 'transparent',
              border: `1px solid ${expanded ? milestone.accentBorder : 'transparent'}`,
            }}
            onMouseEnter={(e) => {
              if (!expanded) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = milestone.accentBg;
              }
            }}
            onMouseLeave={(e) => {
              if (!expanded) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }
            }}
          >
            {expanded ? 'Hide Details' : 'View Details'}
          </button>
        )}

        {expanded && isActive && <DetailPanel milestone={milestone} onClose={onCollapse} />}
      </div>
    </div>
  );
}

/* --- Main Component --- */

export function InteractiveTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, milestones.length - 1));
      setExpandedId(null);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      setExpandedId(null);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const goTo = (i: number) => {
    setActiveIndex(i);
    setExpandedId(null);
  };

  const current = milestones[activeIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="outline-none"
      role="region"
      aria-label="Key Milestones Timeline: January to June 2026"
    >
      <TimelineProgressBar activeIndex={activeIndex} total={milestones.length} />

      <HorizontalTrack activeIndex={activeIndex} onSelect={goTo} />

      <div className="mt-8 flex items-start gap-3 md:gap-4">
        <button
          onClick={() => goTo(Math.max(activeIndex - 1, 0))}
          disabled={activeIndex === 0}
          className={cn(
            'mt-6 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-japandi-sand transition-all duration-200 md:flex cursor-pointer',
            activeIndex === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:border-japandi-earth hover:bg-japandi-linen hover:shadow-sm'
          )}
          aria-label="Previous milestone"
        >
          <ChevronLeft className="h-4 w-4 text-japandi-earth" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="hidden md:block">
            <MilestoneCard
              key={current.id}
              milestone={current}
              isActive
              expanded={expandedId === current.id}
              onExpand={() => setExpandedId(current.id)}
              onCollapse={() => setExpandedId(null)}
            />
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            {milestones.map((ms, i) => (
              <MilestoneCard
                key={ms.id}
                milestone={ms}
                isActive={i === activeIndex}
                expanded={expandedId === ms.id}
                onExpand={() => {
                  setActiveIndex(i);
                  setExpandedId(ms.id);
                }}
                onCollapse={() => setExpandedId(null)}
                onActivate={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => goTo(Math.min(activeIndex + 1, milestones.length - 1))}
          disabled={activeIndex === milestones.length - 1}
          className={cn(
            'mt-6 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-japandi-sand transition-all duration-200 md:flex cursor-pointer',
            activeIndex === milestones.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:border-japandi-earth hover:bg-japandi-linen hover:shadow-sm'
          )}
          aria-label="Next milestone"
        >
          <ChevronRight className="h-4 w-4 text-japandi-earth" />
        </button>
      </div>

      <MobileNav activeIndex={activeIndex} onSelect={goTo} />

      <p className="mt-6 hidden text-center font-mono text-[10px] uppercase tracking-[0.2em] text-japandi-mist/40 md:block">
        Use arrow keys or click dots to navigate
      </p>
    </div>
  );
}
