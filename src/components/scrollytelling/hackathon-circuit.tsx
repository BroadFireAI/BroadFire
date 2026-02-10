import React from 'react';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Briefcase,
  Palette,
  MapPin,
  Calendar,
  Trophy,
  Users,
  ChevronRight,
  Sparkles,
  Globe,
  Cpu,
  Clapperboard,
  Microscope,
  Rocket,
  Bot,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────── */

type EventCategory = 'academic' | 'commercial' | 'creative';

interface HackathonEvent {
  id: string;
  name: string;
  date: string;
  dateSortKey: number; // yyyymmdd for ordering
  location: string;
  focus: string;
  category: EventCategory;
  icon: React.ReactNode;
  accentColor: string; // hex
  details: {
    description: string;
    prizes?: string;
    tracks?: string[];
    community?: string;
    links?: string[];
  };
}

const EVENTS: HackathonEvent[] = [
  // -- Academic --
  {
    id: 'mila-workshop',
    name: 'Mila Workshop',
    date: 'Feb 4 – 6, 2026',
    dateSortKey: 20260204,
    location: 'Montreal, Canada',
    focus: 'World Model Architectures',
    category: 'academic',
    icon: <Microscope className="h-4 w-4" />,
    accentColor: '#7A8A6E',
    details: {
      description:
        'Academic exploration of world model architectures. Researchers present abstract representation approaches and latent state prediction methodologies, contrasting generative pixel-level methods.',
      tracks: ['JEPA variants', 'Agent-based modeling', 'Multi-modal ingestion techniques'],
      community: 'Mila research community',
    },
  },
  {
    id: 'iclr-workshop',
    name: 'ICLR Workshop',
    date: 'Apr 23, 2026',
    dateSortKey: 20260423,
    location: 'Rio de Janeiro, Brazil',
    focus: 'World Models & Reinforcement Learning',
    category: 'academic',
    icon: <Globe className="h-4 w-4" />,
    accentColor: '#1E3A8A',
    details: {
      description:
        'Cross-pollination between world models and reinforcement learning. Papers on spatial intelligence for robotics, autonomous systems integration, and real-world deployment challenges.',
      tracks: [
        'Spatial intelligence for robotics',
        'Autonomous systems integration',
        'Real-world deployment challenges',
      ],
      community: 'ICLR attendees & researchers',
    },
  },
  {
    id: 'cvpr-gigabiran',
    name: 'CVPR — GigaBiran Challenge',
    date: 'Jun 2026',
    dateSortKey: 20260601,
    location: 'Denver, Colorado',
    focus: 'Billion-Parameter Models',
    category: 'academic',
    icon: <Cpu className="h-4 w-4" />,
    accentColor: '#C67B5C',
    details: {
      description:
        'Pushing technical boundaries with billion-parameter world models. Evaluation on fidelity, temporal consistency, and scalability benchmarks.',
      prizes: 'Leaderboard prizes TBA',
      tracks: ['FVD evaluation', 'PSNR benchmarks', 'Perceptual similarity'],
    },
  },
  {
    id: 'cvpr-4d',
    name: 'CVPR — 4D Scene Understanding',
    date: 'Jun 2026',
    dateSortKey: 20260602,
    location: 'Denver, Colorado',
    focus: 'Spatial-Temporal Modeling',
    category: 'academic',
    icon: <Sparkles className="h-4 w-4" />,
    accentColor: '#8B7355',
    details: {
      description:
        '4D scene understanding challenge pushing spatial and temporal modeling fidelity for world model applications.',
      tracks: ['Dynamic scene reconstruction', 'Temporal coherence', 'Multi-view synthesis'],
    },
  },
  {
    id: 'cvpr-video',
    name: 'CVPR — Video Prediction',
    date: 'Jun 2026',
    dateSortKey: 20260603,
    location: 'Denver, Colorado',
    focus: 'Video Generation Benchmarks',
    category: 'academic',
    icon: <Clapperboard className="h-4 w-4" />,
    accentColor: '#A0826D',
    details: {
      description:
        'Video prediction benchmarks evaluating next-frame and long-horizon generation quality across diverse real-world scenarios.',
      tracks: ['Next-frame prediction', 'Long-horizon generation', 'Cross-domain transfer'],
    },
  },
  // -- Commercial --
  {
    id: 'odyssey-hackathon',
    name: 'Odyssey-2 Pro Hackathon',
    date: 'Feb 5, 2026',
    dateSortKey: 20260205,
    location: 'Palo Alto, California',
    focus: 'World Model Applications',
    category: 'commercial',
    icon: <Rocket className="h-4 w-4" />,
    accentColor: '#1E3A8A',
    details: {
      description:
        'The definitive "GPT-2 moment" — first major showcase proving world models\' practical application potential. Developers demonstrated high-fidelity simulation, long-range forecasting, and counterfactual reasoning.',
      prizes: '$50K 1st / $15K 2nd / $5K 3rd + matching API credits',
      tracks: [
        'Predictive Accuracy',
        'Novelty & Impact',
        'Technical Sophistication',
        'Scalability',
      ],
      community: 'Odyssey.ml Developer Discord',
    },
  },
  {
    id: 'nvidia-cosmos',
    name: 'NVIDIA Cosmos Hackathon',
    date: 'Q1–Q2 2026',
    dateSortKey: 20260301,
    location: 'Global (Virtual + On-site)',
    focus: 'Robotics & Industrial Simulation',
    category: 'commercial',
    icon: <Bot className="h-4 w-4" />,
    accentColor: '#7A8A6E',
    details: {
      description:
        'NVIDIA-sponsored challenges leveraging Cosmos foundation world model and Isaac Sim for robotics simulation, digital twins, and industrial applications.',
      tracks: ['Robotics simulation', 'Digital twin construction', 'Isaac Sim integration'],
      community: 'NVIDIA Developer Program',
    },
  },
  {
    id: 'amd-robotics',
    name: 'AMD Robotics Challenge',
    date: 'Q2 2026',
    dateSortKey: 20260401,
    location: 'Global (Virtual)',
    focus: 'Edge Inference & Robotics',
    category: 'commercial',
    icon: <Cpu className="h-4 w-4" />,
    accentColor: '#C67B5C',
    details: {
      description:
        'AMD-sponsored challenge focused on deploying world models on edge hardware for real-time robotic inference and embedded systems.',
      tracks: ['Edge deployment', 'Real-time inference', 'Hardware optimization'],
    },
  },
  // -- Creative --
  {
    id: 'project-odyssey-discord',
    name: 'Project Odyssey Discord Challenges',
    date: 'Ongoing 2026',
    dateSortKey: 20260101,
    location: 'Online (Discord)',
    focus: 'AI Filmmaking & Creative Tools',
    category: 'creative',
    icon: <Clapperboard className="h-4 w-4" />,
    accentColor: '#C67B5C',
    details: {
      description:
        'Discord-based creative challenges centered on AI-assisted cinematic production. Community members collaborate on short films, visual effects, and narrative experiments using world model technology.',
      community: 'Project Odyssey Discord',
      tracks: ['AI short films', 'Visual effects pipelines', 'Narrative generation'],
    },
  },
  {
    id: 'chroma-awards',
    name: 'Chroma Awards',
    date: 'Mid 2026',
    dateSortKey: 20260501,
    location: 'Global (Online Submissions)',
    focus: 'AI Cinematic Excellence',
    category: 'creative',
    icon: <Trophy className="h-4 w-4" />,
    accentColor: '#8B7355',
    details: {
      description:
        'The premier competition for AI-generated cinematic content. Judges evaluate creative vision, technical execution, and storytelling craft across multiple categories.',
      tracks: ['Best AI Short Film', 'Best Visual Effects', 'Most Innovative Use of World Models'],
      community: 'Project Odyssey community',
    },
  },
  {
    id: 'creative-music-video',
    name: 'Interactive Music Video Jam',
    date: 'Spring 2026',
    dateSortKey: 20260315,
    location: 'Online',
    focus: 'Audio-Reactive World Generation',
    category: 'creative',
    icon: <Sparkles className="h-4 w-4" />,
    accentColor: '#A0826D',
    details: {
      description:
        'Community jam session challenging creators to build interactive music videos that leverage world model APIs for real-time visual synthesis driven by audio input.',
      tracks: ['Audio-visual synchronization', 'Generative aesthetics', 'Interactive storytelling'],
    },
  },
];

/* ────────────────────────────────────────────────────────────
   TAB DEFINITIONS
   ──────────────────────────────────────────────────────────── */

interface TabDef {
  key: EventCategory;
  label: string;
  icon: React.ReactNode;
  color: string; // hex for indicator
  description: string;
  count: number;
}

const TABS: TabDef[] = [
  {
    key: 'academic',
    label: 'Academic',
    icon: <GraduationCap className="h-4 w-4" />,
    color: '#7A8A6E',
    description: 'Workshops, conferences, and research challenges',
    count: EVENTS.filter((e) => e.category === 'academic').length,
  },
  {
    key: 'commercial',
    label: 'Commercial',
    icon: <Briefcase className="h-4 w-4" />,
    color: '#1E3A8A',
    description: 'Sponsored hackathons and industry competitions',
    count: EVENTS.filter((e) => e.category === 'commercial').length,
  },
  {
    key: 'creative',
    label: 'Creative',
    icon: <Palette className="h-4 w-4" />,
    color: '#C67B5C',
    description: 'Community jams and artistic challenges',
    count: EVENTS.filter((e) => e.category === 'creative').length,
  },
];

/* ────────────────────────────────────────────────────────────
   INDIVIDUAL EVENT CARD
   ──────────────────────────────────────────────────────────── */

function EventCard({
  event,
  isExpanded,
  onToggle,
}: {
  event: HackathonEvent;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const detailRef = useRef<HTMLDivElement>(null);
  const [detailHeight, setDetailHeight] = useState(0);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <div
      className={cn(
        'group relative rounded-lg border border-japandi-sand/80 bg-japandi-warm-white cursor-pointer',
        'transition-all duration-300 ease-out',
        'hover:shadow-md hover:-translate-y-0.5',
        isExpanded && 'shadow-md ring-1'
      )}
      style={{
        borderLeftWidth: '3px',
        borderLeftColor: event.accentColor,
        ...(isExpanded ? { ringColor: event.accentColor + '30' } : {}),
      }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isExpanded}
    >
      {/* Card header */}
      <div className="flex items-start gap-4 p-5">
        {/* Icon badge */}
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md transition-colors duration-200"
          style={{
            backgroundColor: event.accentColor + '14',
            color: event.accentColor,
          }}
        >
          {event.icon}
        </div>

        {/* Text content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold leading-snug text-japandi-charcoal font-sans">
              {event.name}
            </h4>
            <ChevronRight
              className={cn(
                'h-4 w-4 flex-shrink-0 text-japandi-mist/60 transition-transform duration-300',
                isExpanded && 'rotate-90'
              )}
            />
          </div>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-xs text-japandi-mist">
              <Calendar className="h-3 w-3" />
              {event.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-japandi-mist">
              <MapPin className="h-3 w-3" />
              {event.location}
            </span>
          </div>

          {/* Focus tag */}
          <div className="mt-3">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium"
              style={{
                backgroundColor: event.accentColor + '12',
                color: event.accentColor,
              }}
            >
              {event.focus}
            </span>
          </div>
        </div>
      </div>

      {/* Expandable detail section */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isExpanded ? detailHeight + 32 : 0,
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div ref={detailRef} className="border-t border-japandi-sand/50 px-5 pb-5 pt-4">
          <p className="text-sm leading-relaxed text-japandi-stone">{event.details.description}</p>

          {/* Prizes */}
          {event.details.prizes && (
            <div className="mt-3 flex items-start gap-2">
              <Trophy className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-japandi-earth" />
              <span className="text-xs font-medium text-japandi-earth">{event.details.prizes}</span>
            </div>
          )}

          {/* Tracks */}
          {event.details.tracks && event.details.tracks.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-japandi-mist/70 font-mono">
                Tracks & Focus Areas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {event.details.tracks.map((track) => (
                  <span
                    key={track}
                    className="rounded-md border border-japandi-sand/60 bg-japandi-paper px-2 py-0.5 text-[11px] text-japandi-stone"
                  >
                    {track}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Community */}
          {event.details.community && (
            <div className="mt-3 flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-japandi-mist" />
              <span className="text-xs text-japandi-mist">{event.details.community}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   TIMELINE LANE (visual strip showing event distribution)
   ──────────────────────────────────────────────────────────── */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

function TimelineLane({ events, color }: { events: HackathonEvent[]; color: string }) {
  // Map events to month positions (0-5 for Jan-Jun)
  const monthPositions = events.map((e) => {
    const month = Math.floor((e.dateSortKey % 10000) / 100) - 1; // 0-indexed month
    return Math.min(Math.max(month, 0), 5);
  });

  return (
    <div className="relative mt-6 mb-2">
      {/* Month labels */}
      <div className="flex justify-between px-1 mb-2">
        {MONTHS.map((m) => (
          <span
            key={m}
            className="text-[10px] font-mono uppercase tracking-wider text-japandi-mist/50 w-8 text-center"
          >
            {m}
          </span>
        ))}
      </div>

      {/* Track */}
      <div className="relative h-8 rounded-full bg-japandi-linen/80 overflow-hidden">
        {/* Gridlines */}
        {MONTHS.map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-japandi-sand/40"
            style={{ left: `${(i / 5) * 100}%` }}
          />
        ))}

        {/* Event dots */}
        {monthPositions.map((pos, i) => (
          <div
            key={events[i].id}
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-200 hover:scale-125"
            style={{
              left: `${(pos / 5) * 100}%`,
              transform: `translate(-50%, -50%)`,
              zIndex: 10,
            }}
          >
            <div
              className="relative h-5 w-5 rounded-full border-2 border-japandi-warm-white flex items-center justify-center"
              style={{ backgroundColor: color }}
              title={events[i].name}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-japandi-warm-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SUMMARY STATS
   ──────────────────────────────────────────────────────────── */

function CategoryStats({ events }: { events: HackathonEvent[] }) {
  const locations = new Set(events.map((e) => e.location));
  const hasPrizes = events.some((e) => e.details.prizes);

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="rounded-lg bg-japandi-paper/80 border border-japandi-sand/50 p-3 text-center">
        <p className="text-xl font-semibold text-japandi-charcoal font-sans">{events.length}</p>
        <p className="mt-0.5 text-[11px] text-japandi-mist font-mono uppercase tracking-wider">
          Events
        </p>
      </div>
      <div className="rounded-lg bg-japandi-paper/80 border border-japandi-sand/50 p-3 text-center">
        <p className="text-xl font-semibold text-japandi-charcoal font-sans">{locations.size}</p>
        <p className="mt-0.5 text-[11px] text-japandi-mist font-mono uppercase tracking-wider">
          Locations
        </p>
      </div>
      <div className="rounded-lg bg-japandi-paper/80 border border-japandi-sand/50 p-3 text-center">
        <p className="text-xl font-semibold text-japandi-charcoal font-sans">
          {hasPrizes ? '$70K+' : '--'}
        </p>
        <p className="mt-0.5 text-[11px] text-japandi-mist font-mono uppercase tracking-wider">
          {hasPrizes ? 'In Prizes' : 'Prizes'}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────── */

export function HackathonCircuit() {
  const [activeTab, setActiveTab] = useState<EventCategory>('academic');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredEvents = EVENTS.filter((e) => e.category === activeTab).sort(
    (a, b) => a.dateSortKey - b.dateSortKey
  );

  const activeTabDef = TABS.find((t) => t.key === activeTab)!;

  const handleTabChange = (key: EventCategory) => {
    if (key === activeTab) return;
    setIsAnimating(true);
    setExpandedId(null);
    setTimeout(() => {
      setActiveTab(key);
      setTimeout(() => setIsAnimating(false), 50);
    }, 150);
  };

  return (
    <div className="w-full">
      {/* -- Tab bar -- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:rounded-xl sm:border sm:border-japandi-sand/70 sm:bg-japandi-paper/60 sm:p-1.5">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={cn(
                'group relative flex flex-1 items-center justify-center gap-2.5 rounded-lg px-5 py-3.5',
                'text-sm font-medium font-sans transition-all duration-200 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-japandi-royal focus-visible:ring-offset-2',
                isActive
                  ? 'bg-japandi-warm-white text-japandi-charcoal shadow-sm'
                  : 'text-japandi-mist hover:text-japandi-charcoal hover:bg-japandi-warm-white/50',
                /* mobile: full width with border */
                'sm:border-0 border border-japandi-sand/60',
                isActive && 'sm:border-0'
              )}
              aria-selected={isActive}
              role="tab"
            >
              {/* Color indicator dot */}
              <span
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-200',
                  isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-40'
                )}
                style={{ backgroundColor: tab.color }}
              />
              <span className="flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
              <span
                className={cn(
                  'ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold font-mono transition-colors duration-200',
                  isActive
                    ? 'bg-japandi-charcoal/8 text-japandi-charcoal'
                    : 'bg-japandi-sand/40 text-japandi-mist'
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* -- Category description -- */}
      <div className="mt-6 mb-2">
        <p className="text-sm text-japandi-mist leading-relaxed">{activeTabDef.description}</p>
      </div>

      {/* -- Timeline Lane -- */}
      <TimelineLane events={filteredEvents} color={activeTabDef.color} />

      {/* -- Summary Stats -- */}
      <div className="mt-6">
        <CategoryStats events={filteredEvents} />
      </div>

      {/* -- Event Cards -- */}
      <div
        className={cn(
          'grid grid-cols-1 gap-3 md:grid-cols-2 transition-opacity duration-150',
          isAnimating ? 'opacity-0' : 'opacity-100'
        )}
        role="tabpanel"
        aria-label={`${activeTabDef.label} events`}
      >
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isExpanded={expandedId === event.id}
            onToggle={() => setExpandedId((prev) => (prev === event.id ? null : event.id))}
          />
        ))}
      </div>

      {/* -- Legend -- */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {TABS.map((tab) => (
          <div key={tab.key} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tab.color }} />
            <span className="text-xs text-japandi-mist font-sans">{tab.label}</span>
          </div>
        ))}
        <div className="hidden sm:block h-3 w-px bg-japandi-sand/60" />
        <span className="text-[11px] text-japandi-mist/60 font-mono">
          Click cards to expand details
        </span>
      </div>
    </div>
  );
}
