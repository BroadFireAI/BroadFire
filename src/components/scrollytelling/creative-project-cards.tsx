import React from 'react';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  Music,
  Users,
  Bot,
  Cpu,
  BarChart3,
  Sparkles,
  ArrowRight,
  Gauge,
  Zap,
  Target,
} from 'lucide-react';

/* -- Data -- */

interface ProjectCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
  description: string;
  requirements: { label: string; icon: React.ElementType }[];
  complexity: { level: string; bars: number };
  impact: { label: string; description: string };
}

const projects: ProjectCard[] = [
  {
    id: 'music-video',
    title: 'Interactive Music Video Generator',
    subtitle: 'Audio-Responsive Visual Narratives',
    icon: Music,
    accentColor: '#1E3A8A',
    accentBorder: 'border-japandi-royal',
    accentBg: 'bg-japandi-royal',
    accentText: 'text-japandi-royal',
    description:
      'Synthesize visual narratives that respond to audio input. Combines generative video capabilities with temporal alignment and stylistic conditioning.',
    requirements: [
      { label: 'Generative Video API', icon: Cpu },
      { label: 'Audio Analysis', icon: BarChart3 },
      { label: 'Temporal Alignment', icon: Zap },
      { label: 'Style Conditioning', icon: Sparkles },
    ],
    complexity: { level: 'Moderate', bars: 3 },
    impact: {
      label: 'High Creative Impact',
      description:
        'Portfolio standout with strong visual appeal and demo potential for creative industry applications.',
    },
  },
  {
    id: 'social-network',
    title: 'Synthetic Social Network Simulator',
    subtitle: 'Agent-Based Population Dynamics',
    icon: Users,
    accentColor: '#7A8A6E',
    accentBorder: 'border-japandi-sage',
    accentBg: 'bg-japandi-sage',
    accentText: 'text-japandi-sage',
    description:
      'Model emergent social dynamics through agent-based populations. Explore information diffusion, behavioral contagion, and network effects.',
    requirements: [
      { label: 'Agent Frameworks', icon: Bot },
      { label: 'Network Modeling', icon: Users },
      { label: 'Data Visualization', icon: BarChart3 },
      { label: 'Simulation Engine', icon: Cpu },
    ],
    complexity: { level: 'High', bars: 4 },
    impact: {
      label: 'Strong Research Value',
      description:
        'Publishable research applications in computational social science and complex systems analysis.',
    },
  },
  {
    id: 'dreaming-robot',
    title: 'Dreaming Robot Visualization',
    subtitle: 'Real-Time Planning Process Display',
    icon: Bot,
    accentColor: '#C67B5C',
    accentBorder: 'border-japandi-terracotta',
    accentBg: 'bg-japandi-terracotta',
    accentText: 'text-japandi-terracotta',
    description:
      'Create real-time visualizations of robotic planning processes. Display predicted trajectories, counterfactual scenarios, and decision-making rationale.',
    requirements: [
      { label: '3D Rendering', icon: Sparkles },
      { label: 'Trajectory Planning', icon: Target },
      { label: 'World Model API', icon: Cpu },
      { label: 'Real-Time Streaming', icon: Zap },
    ],
    complexity: { level: 'High', bars: 4 },
    impact: {
      label: 'Bridges Two Fields',
      description:
        'Uniquely connects interpretability research with engaging visual communication for broader audiences.',
    },
  },
];

/* -- Complexity Bar -- */

function ComplexityBars({ bars, accentColor }: { bars: number; accentColor: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-2 w-5 rounded-sm transition-colors duration-300"
          style={{
            backgroundColor: i < bars ? accentColor : '#E2DDD5',
          }}
        />
      ))}
    </div>
  );
}

/* -- Single Flip Card -- */

function FlipCard({ project, index }: { project: ProjectCard; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const Icon = project.icon;

  return (
    <div className="group perspective-[1200px]" style={{ animationDelay: `${index * 120}ms` }}>
      <div
        className={cn(
          'relative w-full cursor-pointer transition-transform duration-700 ease-out',
          '[transform-style:preserve-3d]',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
        style={{ minHeight: '420px' }}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${project.title}. ${isFlipped ? 'Showing details. Click to see overview.' : 'Click to see project details.'}`}
      >
        {/* -- FRONT -- */}
        <div
          className={cn(
            'absolute inset-0 rounded-lg [backface-visibility:hidden]',
            'flex flex-col justify-between',
            'bg-japandi-paper border border-japandi-sand',
            'p-6 md:p-8',
            'transition-shadow duration-300',
            'hover:shadow-lg hover:shadow-japandi-sand/50'
          )}
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
            style={{ backgroundColor: project.accentColor }}
          />

          {/* Top section */}
          <div className="flex flex-col gap-5 pt-2">
            {/* Icon circle */}
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${project.accentColor}10` }}
            >
              <Icon className="h-7 w-7" style={{ color: project.accentColor }} strokeWidth={1.5} />
            </div>

            {/* Title */}
            <div>
              <p
                className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em]"
                style={{ color: project.accentColor }}
              >
                {project.subtitle}
              </p>
              <h3 className="font-serif text-xl font-semibold leading-snug text-japandi-charcoal md:text-2xl text-balance">
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-japandi-mist">{project.description}</p>
          </div>

          {/* Bottom CTA hint */}
          <div className="flex items-center gap-2 pt-6 border-t border-japandi-sand">
            <span className="text-xs font-medium text-japandi-mist tracking-wide uppercase">
              Explore Details
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 text-japandi-mist transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* -- BACK -- */}
        <div
          className={cn(
            'absolute inset-0 rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'flex flex-col',
            'bg-japandi-paper border border-japandi-sand',
            'p-6 md:p-8',
            'overflow-y-auto'
          )}
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
            style={{ backgroundColor: project.accentColor }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-3 pt-2 mb-5">
            <div>
              <p
                className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em]"
                style={{ color: project.accentColor }}
              >
                Project Breakdown
              </p>
              <h3 className="font-serif text-lg font-semibold text-japandi-charcoal md:text-xl leading-snug">
                {project.title}
              </h3>
            </div>
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${project.accentColor}10` }}
            >
              <Icon className="h-5 w-5" style={{ color: project.accentColor }} strokeWidth={1.5} />
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="mb-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-japandi-earth">
              Technical Requirements
            </p>
            <div className="grid grid-cols-2 gap-2">
              {project.requirements.map((req) => {
                const ReqIcon = req.icon;
                return (
                  <div
                    key={req.label}
                    className="flex items-center gap-2 rounded-md bg-japandi-linen/70 px-3 py-2.5"
                  >
                    <ReqIcon className="h-3.5 w-3.5 text-japandi-mist shrink-0" strokeWidth={1.5} />
                    <span className="text-xs font-medium text-japandi-stone leading-tight">
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complexity */}
          <div className="mb-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-japandi-earth">
              Estimated Complexity
            </p>
            <div className="flex items-center gap-3 rounded-md bg-japandi-linen/70 px-3 py-3">
              <Gauge className="h-4 w-4 text-japandi-mist shrink-0" strokeWidth={1.5} />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-japandi-stone">
                  {project.complexity.level}
                </span>
                <ComplexityBars bars={project.complexity.bars} accentColor={project.accentColor} />
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="mt-auto">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-japandi-earth">
              Potential Impact
            </p>
            <div
              className="rounded-md px-3 py-3"
              style={{
                backgroundColor: `${project.accentColor}08`,
                borderLeft: `3px solid ${project.accentColor}`,
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: project.accentColor }}>
                {project.impact.label}
              </p>
              <p className="text-xs leading-relaxed text-japandi-mist">
                {project.impact.description}
              </p>
            </div>
          </div>

          {/* Back hint */}
          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-japandi-sand">
            <ArrowRight className="h-3.5 w-3.5 text-japandi-mist rotate-180" strokeWidth={2} />
            <span className="text-xs font-medium text-japandi-mist tracking-wide uppercase">
              Back to Overview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -- Main Component -- */

export function CreativeProjectCards() {
  return (
    <div className="flex flex-col gap-8">
      {/* Intro */}
      <p className="max-w-2xl text-sm leading-relaxed text-japandi-mist md:text-base">
        Concrete application concepts to demonstrate capabilities and build portfolio credibility.
        Click any card to explore the technical breakdown.
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {projects.map((project, i) => (
          <FlipCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Closing statement */}
      <div className="mt-4 rounded-lg bg-japandi-linen/60 border border-japandi-sand px-6 py-5">
        <p className="text-sm leading-relaxed text-japandi-stone md:text-base">
          The February 2026 inflection point is here. The tools, communities, and opportunities are
          accessible. Your journey into world models begins with a single step into one of these
          entry pathways.
        </p>
      </div>
    </div>
  );
}
