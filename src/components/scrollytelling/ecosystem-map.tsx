import React from 'react';

import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Globe,
  Cpu,
  Car,
  Box,
  X,
  ExternalLink,
  MessageSquare,
  Code,
  Layers,
  Zap,
  Workflow,
} from 'lucide-react';

/* -- Data -- */

interface PlatformData {
  id: string;
  label: string;
  flagship: string;
  icon: 'globe' | 'box' | 'car' | 'cpu';
  color: string;
  colorLight: string;
  focus: string;
  entryPoints: { label: string; type: 'api' | 'discord' | 'partnership' | 'hackathon' }[];
  details: string;
}

const platforms: PlatformData[] = [
  {
    id: 'odyssey',
    label: 'Odyssey.ml',
    flagship: 'Odyssey-2 Pro API',
    icon: 'globe',
    color: '#1E3A8A',
    colorLight: '#2B4EA6',
    focus: 'Generative world models with action conditioning for interactive simulations',
    entryPoints: [
      { label: 'Odyssey-2 Pro API (Jan 23, 2026)', type: 'api' },
      { label: 'Developer Discord', type: 'discord' },
      { label: 'Palo Alto Hackathon ($50K)', type: 'hackathon' },
    ],
    details:
      'First commercial API for high-fidelity spatial simulation. Supports text, sensor data, and video input modalities with action conditioning for interactive world generation.',
  },
  {
    id: 'worldlabs',
    label: 'World Labs',
    flagship: 'Marble & World API',
    icon: 'box',
    color: '#7A8A6E',
    colorLight: '#95A688',
    focus: 'Spatial intelligence and 3D-first world understanding',
    entryPoints: [
      { label: 'World API', type: 'api' },
      { label: 'ask-ai Discord', type: 'discord' },
      { label: 'Public API Waitlist', type: 'api' },
    ],
    details:
      'Generates structured 3D environments from minimal input. Marble understands spatial relationships, physics, and geometric constraints with native 3D representation.',
  },
  {
    id: 'wayve',
    label: 'Wayve',
    flagship: 'GAIA-1/2 & WorldLens',
    icon: 'car',
    color: '#C67B5C',
    colorLight: '#D99B82',
    focus: 'Domain-specific models for autonomous driving and navigation',
    entryPoints: [
      { label: 'Research Partnerships', type: 'partnership' },
      { label: 'AV Industry Collaborations', type: 'partnership' },
    ],
    details:
      'GAIA-1 and GAIA-2 are driving world models trained on real driving data. WorldLens provides visual scene understanding for navigation and planning in autonomous vehicles.',
  },
  {
    id: 'nvidia',
    label: 'NVIDIA',
    flagship: 'Cosmos & Isaac Sim',
    icon: 'cpu',
    color: '#8B7355',
    colorLight: '#A0826D',
    focus: 'Robotics simulation and industrial applications',
    entryPoints: [
      { label: 'Commercial Hackathons', type: 'hackathon' },
      { label: 'Enterprise Partnerships', type: 'partnership' },
      { label: 'Academic Research Grants', type: 'partnership' },
    ],
    details:
      'Cosmos is a foundation world model for physical AI. Isaac Sim provides robotics simulation environments. Both target industrial-scale deployment of spatial intelligence.',
  },
];

/* Connections between platforms (bidirectional) */
const connections: { from: string; to: string; label: string }[] = [
  { from: 'odyssey', to: 'worldlabs', label: '3D generation pipeline' },
  { from: 'odyssey', to: 'nvidia', label: 'GPU compute & simulation' },
  { from: 'worldlabs', to: 'nvidia', label: 'Spatial AI training' },
  { from: 'wayve', to: 'nvidia', label: 'Autonomous systems' },
  { from: 'odyssey', to: 'wayve', label: 'World model research' },
  { from: 'worldlabs', to: 'wayve', label: 'Scene understanding' },
];

/* -- Node positions (desktop / mobile adaptive) -- */
/* Desktop layout: diamond configuration for balanced asymmetry */
const nodePositionsDesktop: Record<string, { x: number; y: number }> = {
  odyssey: { x: 50, y: 18 },
  worldlabs: { x: 82, y: 45 },
  wayve: { x: 50, y: 78 },
  nvidia: { x: 18, y: 45 },
};

const nodePositionsMobile: Record<string, { x: number; y: number }> = {
  odyssey: { x: 50, y: 14 },
  worldlabs: { x: 78, y: 38 },
  wayve: { x: 50, y: 82 },
  nvidia: { x: 22, y: 60 },
};

/* -- Icons -- */
function PlatformIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'globe':
      return <Globe className={className} />;
    case 'box':
      return <Box className={className} />;
    case 'car':
      return <Car className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    default:
      return <Globe className={className} />;
  }
}

function EntryIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'api':
      return <Code className={className} />;
    case 'discord':
      return <MessageSquare className={className} />;
    case 'partnership':
      return <Workflow className={className} />;
    case 'hackathon':
      return <Zap className={className} />;
    default:
      return <ExternalLink className={className} />;
  }
}

/* -- Animated Connection Line -- */
function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  isHighlighted,
  label,
  isHovered,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isHighlighted: boolean;
  label: string;
  isHovered: boolean;
}) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g>
      <line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke={isHighlighted ? '#1E3A8A' : '#E2DDD5'}
        strokeWidth={isHighlighted ? 2 : 1}
        strokeDasharray={isHighlighted ? 'none' : '6 4'}
        style={{
          transition: 'stroke 0.4s ease, stroke-width 0.4s ease, stroke-dasharray 0.3s ease',
        }}
      />
      {/* Animated particle along line when highlighted */}
      {isHighlighted && (
        <>
          <circle r="3" fill="#1E3A8A" opacity="0.8">
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              path={`M${x1 * 6},${y1 * 5} L${x2 * 6},${y2 * 5}`}
            />
          </circle>
          <circle r="2" fill="#2B4EA6" opacity="0.5">
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.8s"
              path={`M${x1 * 6},${y1 * 5} L${x2 * 6},${y2 * 5}`}
            />
          </circle>
        </>
      )}
      {/* Connection label on hover */}
      {isHovered && (
        <g>
          <rect
            x={`${midX - 10}%`}
            y={`${midY - 3.5}%`}
            width="20%"
            height="6%"
            rx="4"
            fill="#2C2825"
            opacity="0.92"
          />
          <text
            x={`${midX}%`}
            y={`${midY}%`}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#FDFCFA"
            fontSize="11"
            fontFamily="var(--font-sans)"
            fontWeight="500"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

/* -- Main Component -- */
export function EcosystemMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const positions = isMobile ? nodePositionsMobile : nodePositionsDesktop;

  const getConnectedNodes = useCallback((nodeId: string) => {
    return connections
      .filter((c) => c.from === nodeId || c.to === nodeId)
      .map((c) => (c.from === nodeId ? c.to : c.from));
  }, []);

  const isNodeHighlighted = useCallback(
    (nodeId: string) => {
      if (!hoveredNode) return false;
      if (nodeId === hoveredNode) return true;
      return getConnectedNodes(hoveredNode).includes(nodeId);
    },
    [hoveredNode, getConnectedNodes]
  );

  const isConnectionHighlighted = useCallback(
    (fromId: string, toId: string) => {
      if (!hoveredNode) return false;
      return (
        (fromId === hoveredNode || toId === hoveredNode) &&
        (getConnectedNodes(hoveredNode).includes(fromId) ||
          getConnectedNodes(hoveredNode).includes(toId))
      );
    },
    [hoveredNode, getConnectedNodes]
  );

  const activePlatform = platforms.find((p) => p.id === activeNode);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#1E3A8A' }} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-japandi-mist">
            Hover to explore
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px w-5 border-t border-dashed border-japandi-sand" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-japandi-mist">
            Platform relationship
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full border border-japandi-mist/40 bg-japandi-paper" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-japandi-mist">
            Click for details
          </span>
        </div>
      </div>

      {/* SVG Network Graph */}
      <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
        <svg
          viewBox="0 0 600 500"
          className="absolute inset-0 h-full w-full"
          style={{ overflow: 'visible' }}
        >
          {/* Background grid pattern for Japandi aesthetic */}
          <defs>
            <pattern id="japandi-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#E2DDD5"
                strokeWidth="0.3"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="600" height="500" fill="url(#japandi-grid)" rx="8" />

          {/* Connection lines */}
          {connections.map((conn) => {
            const fromPos = positions[conn.from];
            const toPos = positions[conn.to];
            const connKey = `${conn.from}-${conn.to}`;
            return (
              <ConnectionLine
                key={connKey}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                isHighlighted={isConnectionHighlighted(conn.from, conn.to)}
                label={conn.label}
                isHovered={hoveredConnection === connKey}
              />
            );
          })}

          {/* Invisible wider connection hit areas for hover */}
          {connections.map((conn) => {
            const fromPos = positions[conn.from];
            const toPos = positions[conn.to];
            const connKey = `${conn.from}-${conn.to}`;
            return (
              <line
                key={`hit-${connKey}`}
                x1={`${fromPos.x}%`}
                y1={`${fromPos.y}%`}
                x2={`${toPos.x}%`}
                y2={`${toPos.y}%`}
                stroke="transparent"
                strokeWidth="16"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredConnection(connKey)}
                onMouseLeave={() => setHoveredConnection(null)}
              />
            );
          })}
        </svg>

        {/* HTML Nodes overlaid on SVG */}
        {platforms.map((platform) => {
          const pos = positions[platform.id];
          const highlighted = hoveredNode ? isNodeHighlighted(platform.id) : true;
          const isHovered = hoveredNode === platform.id;
          const isActive = activeNode === platform.id;

          return (
            <div
              key={platform.id}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered || isActive ? 30 : 10,
              }}
            >
              {/* Outer glow ring on hover */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  transform: 'scale(1.6)',
                  background: isHovered
                    ? `radial-gradient(circle, ${platform.color}15 0%, transparent 70%)`
                    : 'none',
                  transition: 'background 0.4s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Main node button */}
              <button
                className={cn(
                  'group relative flex flex-col items-center gap-1.5 outline-none',
                  'transition-all duration-300 ease-out',
                  !highlighted && hoveredNode ? 'opacity-30' : 'opacity-100'
                )}
                onMouseEnter={() => setHoveredNode(platform.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode(activeNode === platform.id ? null : platform.id)}
                aria-label={`View details for ${platform.label}`}
              >
                {/* Node circle */}
                <div
                  className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md md:h-16 md:w-16',
                    'transition-all duration-300 ease-out',
                    isHovered || isActive ? 'scale-110 shadow-lg' : 'scale-100'
                  )}
                  style={{
                    backgroundColor: isHovered || isActive ? platform.color : '#FDFCFA',
                    borderColor: platform.color,
                  }}
                >
                  <PlatformIcon
                    type={platform.icon}
                    className={cn(
                      'h-6 w-6 transition-colors duration-300 md:h-7 md:w-7',
                      isHovered || isActive ? 'text-japandi-warm-white' : 'text-japandi-charcoal'
                    )}
                  />
                </div>

                {/* Label */}
                <span
                  className={cn(
                    'whitespace-nowrap font-sans text-xs font-semibold transition-colors duration-300 md:text-sm',
                    isHovered || isActive ? 'text-japandi-charcoal' : 'text-japandi-stone'
                  )}
                >
                  {platform.label}
                </span>

                {/* Flagship tooltip on hover */}
                {isHovered && !isActive && (
                  <div
                    className="absolute top-full mt-1 w-48 rounded-md border border-japandi-sand bg-japandi-warm-white px-3 py-2 shadow-lg md:w-56"
                    style={{ zIndex: 50 }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-wider text-japandi-mist">
                      Flagship
                    </p>
                    <p className="mt-0.5 font-sans text-xs font-medium text-japandi-charcoal md:text-sm">
                      {platform.flagship}
                    </p>
                    <p className="mt-1 text-[10px] leading-snug text-japandi-mist md:text-xs">
                      {platform.focus}
                    </p>
                    <p className="mt-1.5 font-mono text-[9px] text-japandi-royal">
                      Click to expand
                    </p>
                  </div>
                )}
              </button>
            </div>
          );
        })}

        {/* Center label */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: '50%',
            top: isMobile ? '48%' : '46%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <Layers className="h-4 w-4 text-japandi-sand" />
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-japandi-mist/60 md:text-[10px]">
              World Model
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-japandi-mist/60 md:text-[10px]">
              Ecosystem
            </span>
          </div>
        </div>
      </div>

      {/* Detail Panel - slides in from the bottom on mobile, side on desktop */}
      {activePlatform && (
        <div
          className={cn(
            'mt-8 overflow-hidden rounded-lg border border-japandi-sand bg-japandi-warm-white shadow-xl',
            'animate-fade-in-up'
          )}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 md:px-6"
            style={{ backgroundColor: activePlatform.color }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-japandi-warm-white/20">
                <PlatformIcon
                  type={activePlatform.icon}
                  className="h-5 w-5 text-japandi-warm-white"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-japandi-warm-white md:text-xl">
                  {activePlatform.label}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-japandi-warm-white/70">
                  {activePlatform.flagship}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-japandi-warm-white/10 text-japandi-warm-white/80 transition-colors duration-200 hover:bg-japandi-warm-white/20 hover:text-japandi-warm-white cursor-pointer"
              aria-label="Close detail panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-5 md:grid-cols-2 md:p-6">
            {/* About */}
            <div>
              <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-japandi-mist">
                About
              </h4>
              <p className="text-sm leading-relaxed text-japandi-stone">{activePlatform.details}</p>

              <h4 className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-japandi-mist">
                Focus Area
              </h4>
              <p className="text-sm leading-relaxed text-japandi-stone">{activePlatform.focus}</p>
            </div>

            {/* Entry Points */}
            <div>
              <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-japandi-mist">
                Entry Points
              </h4>
              <ul className="flex flex-col gap-2">
                {activePlatform.entryPoints.map((ep) => (
                  <li
                    key={ep.label}
                    className="flex items-start gap-3 rounded-md border border-japandi-sand/60 bg-japandi-paper px-3 py-2.5 transition-colors duration-200 hover:border-japandi-earth/40 hover:bg-japandi-linen cursor-pointer"
                  >
                    <div
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded"
                      style={{ backgroundColor: `${activePlatform.color}14` }}
                    >
                      <EntryIcon
                        type={ep.type}
                        className="h-3.5 w-3.5"
                        style={
                          { color: activePlatform.color } as React.CSSProperties &
                            Record<string, string>
                        }
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-japandi-charcoal">{ep.label}</p>
                      <p className="font-mono text-[10px] capitalize text-japandi-mist">
                        {ep.type}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Connected platforms */}
              <h4 className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-japandi-mist">
                Connected To
              </h4>
              <div className="flex flex-wrap gap-2">
                {connections
                  .filter((c) => c.from === activePlatform.id || c.to === activePlatform.id)
                  .map((c) => {
                    const otherId = c.from === activePlatform.id ? c.to : c.from;
                    const other = platforms.find((p) => p.id === otherId)!;
                    return (
                      <button
                        key={c.from + c.to}
                        onClick={() => setActiveNode(otherId)}
                        className="flex items-center gap-1.5 rounded-full border border-japandi-sand bg-japandi-warm-white px-3 py-1.5 text-xs text-japandi-stone transition-all duration-200 hover:border-japandi-earth hover:bg-japandi-linen cursor-pointer"
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: other.color }}
                        />
                        <span className="font-medium">{other.label}</span>
                        <span className="text-[10px] text-japandi-mist">{c.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
