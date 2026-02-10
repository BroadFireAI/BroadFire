import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { MessageCircle, Mail, ExternalLink, X } from 'lucide-react';

/* ────────────────────────────────────────────────────────── */
/*  Community Data                                            */
/* ────────────────────────────────────────────────────────── */

interface Community {
  id: string;
  name: string;
  type: 'discord' | 'newsletter';
  focus: string;
  description: string;
  link: string;
  color: string;
  /** Position within the SVG viewBox (0-400 x 0-500) */
  cx: number;
  cy: number;
}

const communities: Community[] = [
  {
    id: 'odyssey',
    name: 'Odyssey.ml',
    type: 'discord',
    focus: 'World Model APIs',
    description:
      'Primary technical community for the Odyssey-2 Pro platform. Daily discussions on API capabilities, troubleshooting, and emerging use cases.',
    link: 'https://discord.gg/odysseyml',
    color: '#1E3A8A',
    cx: 200,
    cy: 100,
  },
  {
    id: 'worldlabs',
    name: 'World Labs',
    type: 'discord',
    focus: 'Spatial Intelligence',
    description:
      'Spatial intelligence research community via the ask-ai Discord channel. Focus on 3D generation techniques and Marble platform applications.',
    link: 'https://discord.gg/worldlabs',
    color: '#7A8A6E',
    cx: 90,
    cy: 230,
  },
  {
    id: 'project-odyssey',
    name: 'Project Odyssey',
    type: 'discord',
    focus: 'AI Filmmaking',
    description:
      'Discord-based creative challenges for AI-assisted cinematic production. Hosts Chroma Awards competitions and filmmaking workshops.',
    link: 'https://discord.gg/projectodyssey',
    color: '#C67B5C',
    cx: 310,
    cy: 230,
  },
  {
    id: 'eleutherai',
    name: 'EleutherAI',
    type: 'discord',
    focus: 'Research & Theory',
    description:
      'Theoretical foundations and academic paper discussions. Bridges the research-to-practice gap with open-source AI community.',
    link: 'https://discord.gg/eleutherai',
    color: '#8B7355',
    cx: 135,
    cy: 370,
  },
  {
    id: 'import-ai',
    name: 'Import AI',
    type: 'newsletter',
    focus: 'Weekly Digest',
    description:
      'Weekly curated digest by Jack Clark covering world model developments, hackathon announcements, and ecosystem shifts.',
    link: 'https://importai.substack.com',
    color: '#A0826D',
    cx: 270,
    cy: 370,
  },
];

/* ────────────────────────────────────────────────────────── */
/*  Connection lines between communities                      */
/* ────────────────────────────────────────────────────────── */

interface Connection {
  from: string;
  to: string;
}

const connections: Connection[] = [
  { from: 'odyssey', to: 'worldlabs' },
  { from: 'odyssey', to: 'project-odyssey' },
  { from: 'worldlabs', to: 'eleutherai' },
  { from: 'project-odyssey', to: 'import-ai' },
  { from: 'eleutherai', to: 'import-ai' },
  { from: 'odyssey', to: 'import-ai' },
  { from: 'worldlabs', to: 'project-odyssey' },
];

/* ────────────────────────────────────────────────────────── */
/*  Small icon components for inline SVG                      */
/* ────────────────────────────────────────────────────────── */

function DiscordSVGIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 7}, ${y - 7}) scale(0.58)`}>
      <path
        d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"
        fill="currentColor"
      />
    </g>
  );
}

function NewsletterSVGIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x - 7}, ${y - 7}) scale(0.58)`}>
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="22,6 12,13 2,6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Main Component                                            */
/* ────────────────────────────────────────────────────────── */

export function CommunityMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCommunity = communities.find((c) => c.id === activeId);

  /* Close popup when clicking outside */
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setActiveId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const getCommunity = (id: string) => communities.find((c) => c.id === id);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col rounded-lg border border-japandi-sand/60 bg-japandi-warm-white"
    >
      {/* Header */}
      <div className="border-b border-japandi-sand/40 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-japandi-royal/10">
            <MessageCircle className="h-3 w-3 text-japandi-royal" />
          </div>
          <h3 className="font-sans text-sm font-semibold text-japandi-charcoal">
            Community Watering Holes
          </h3>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-japandi-mist">
          Click a node to discover communities driving the world model ecosystem.
        </p>
      </div>

      {/* SVG Network Graph */}
      <div className="relative px-3 py-4">
        <svg
          viewBox="0 0 400 470"
          className="w-full"
          role="img"
          aria-label="Community network map showing Discord servers and newsletters"
        >
          {/* Connection Lines */}
          {connections.map((conn) => {
            const from = getCommunity(conn.from);
            const to = getCommunity(conn.to);
            if (!from || !to) return null;

            const isHighlighted =
              activeId === conn.from ||
              activeId === conn.to ||
              hoveredId === conn.from ||
              hoveredId === conn.to;

            return (
              <line
                key={`${conn.from}-${conn.to}`}
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke={isHighlighted ? '#1E3A8A' : '#E2DDD5'}
                strokeWidth={isHighlighted ? 1.5 : 1}
                strokeDasharray={isHighlighted ? 'none' : '4 4'}
                className="transition-all duration-300"
                style={{
                  opacity: isHighlighted ? 0.6 : 0.4,
                }}
              />
            );
          })}

          {/* Community Nodes */}
          {communities.map((community) => {
            const isActive = activeId === community.id;
            const isHovered = hoveredId === community.id;
            const isHighlighted = isActive || isHovered;
            const nodeRadius = isHighlighted ? 26 : 22;

            return (
              <g
                key={community.id}
                className="cursor-pointer"
                onClick={() => setActiveId(activeId === community.id ? null : community.id)}
                onMouseEnter={() => setHoveredId(community.id)}
                onMouseLeave={() => setHoveredId(null)}
                role="button"
                tabIndex={0}
                aria-label={`${community.name} - ${community.focus}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(activeId === community.id ? null : community.id);
                  }
                }}
              >
                {/* Outer pulse ring when active */}
                {isActive && (
                  <circle
                    cx={community.cx}
                    cy={community.cy}
                    r={34}
                    fill="none"
                    stroke={community.color}
                    strokeWidth={1}
                    opacity={0.3}
                    className="animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}

                {/* Background circle */}
                <circle
                  cx={community.cx}
                  cy={community.cy}
                  r={nodeRadius}
                  fill={isHighlighted ? community.color : '#F5F3EF'}
                  stroke={community.color}
                  strokeWidth={isHighlighted ? 2 : 1.5}
                  className="transition-all duration-300"
                />

                {/* Icon */}
                <g
                  className="transition-colors duration-300"
                  style={{
                    color: isHighlighted ? '#FDFCFA' : community.color,
                  }}
                >
                  {community.type === 'discord' ? (
                    <DiscordSVGIcon x={community.cx} y={community.cy} />
                  ) : (
                    <NewsletterSVGIcon x={community.cx} y={community.cy} />
                  )}
                </g>

                {/* Label */}
                <text
                  x={community.cx}
                  y={community.cy + nodeRadius + 16}
                  textAnchor="middle"
                  className="font-sans text-[11px] font-semibold"
                  fill="#2C2825"
                >
                  {community.name}
                </text>
                <text
                  x={community.cx}
                  y={community.cy + nodeRadius + 30}
                  textAnchor="middle"
                  className="font-mono text-[9px]"
                  fill="#7A7268"
                >
                  {community.focus}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(16, 445)">
            <circle cx={6} cy={4} r={5} fill="#F5F3EF" stroke="#1E3A8A" strokeWidth={1.2} />
            <text x={16} y={8} className="font-mono text-[9px]" fill="#7A7268">
              Discord
            </text>
            <circle cx={80} cy={4} r={5} fill="#F5F3EF" stroke="#A0826D" strokeWidth={1.2} />
            <text x={90} y={8} className="font-mono text-[9px]" fill="#7A7268">
              Newsletter
            </text>
          </g>
        </svg>
      </div>

      {/* Detail Popup - slides in from bottom */}
      <div
        className={cn(
          'overflow-hidden border-t border-japandi-sand/40 transition-all duration-300 ease-out',
          activeCommunity ? 'max-h-[260px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
        )}
      >
        {activeCommunity && (
          <div className="px-5 py-4">
            {/* Popup Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${activeCommunity.color}15` }}
                >
                  {activeCommunity.type === 'discord' ? (
                    <MessageCircle className="h-4 w-4" style={{ color: activeCommunity.color }} />
                  ) : (
                    <Mail className="h-4 w-4" style={{ color: activeCommunity.color }} />
                  )}
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-japandi-charcoal">
                    {activeCommunity.name}
                  </h4>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-japandi-mist">
                    {activeCommunity.type === 'discord' ? 'Discord Server' : 'Newsletter'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveId(null)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-japandi-mist transition-colors hover:bg-japandi-linen hover:text-japandi-charcoal cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs leading-relaxed text-japandi-mist">
              {activeCommunity.description}
            </p>

            {/* CTA Link */}
            <a
              href={activeCommunity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-japandi-warm-white transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: activeCommunity.color }}
            >
              {activeCommunity.type === 'discord' ? 'Join Server' : 'Subscribe'}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
