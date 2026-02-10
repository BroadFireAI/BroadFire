import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Grid3X3, Brain, Box, ChevronRight, X } from 'lucide-react';

/* --- Data --- */

interface Approach {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  accentColor: string;
  accentBg: string;
  platforms: string[];
  mechanism: string;
  characteristics: string[];
  useCases: string[];
  spectrumLabel: [string, string];
  spectrumValue: number;
  demoSteps: string[];
}

const approaches: Approach[] = [
  {
    id: 'generative',
    title: 'Generative',
    subtitle: 'Pixel-Level Prediction',
    icon: <Grid3X3 className="h-7 w-7" strokeWidth={1.5} />,
    accentColor: '#1E3A8A',
    accentBg: 'rgba(30, 58, 138, 0.08)',
    platforms: ['Odyssey-2 Pro', 'Sora', 'Genie 3'],
    mechanism:
      'Direct pixel prediction with action conditioning, enabling frame-by-frame video generation that responds to user inputs or agent decisions.',
    characteristics: [
      'High fidelity visual output',
      'Computationally intensive',
      'Photorealistic simulations',
      'Interactive scenario support',
    ],
    useCases: [
      'Autonomous vehicle training',
      'Game environment generation',
      'Interactive storytelling',
      'Synthetic data for CV',
    ],
    spectrumLabel: ['Low fidelity', 'High fidelity'],
    spectrumValue: 92,
    demoSteps: [
      'Input frame captured',
      'Action signal conditioned',
      'Pixel grid predicted',
      'Next frame rendered',
    ],
  },
  {
    id: 'abstract',
    title: 'Abstract Representation',
    subtitle: 'Latent State Modeling',
    icon: <Brain className="h-7 w-7" strokeWidth={1.5} />,
    accentColor: '#7A8A6E',
    accentBg: 'rgba(122, 138, 110, 0.08)',
    platforms: ['AMI Labs JEPA'],
    mechanism:
      'Predicts compressed latent states rather than raw pixels, building abstract representations of world dynamics without expensive pixel generation.',
    characteristics: [
      'Computationally efficient',
      'Faster inference',
      'Conceptual understanding',
      'Longer-horizon planning',
    ],
    useCases: [
      'Robotic motion planning',
      'Strategic game AI',
      'Economic forecasting',
      'Resource allocation',
    ],
    spectrumLabel: ['Slow inference', 'Fast inference'],
    spectrumValue: 88,
    demoSteps: [
      'State observed',
      'Latent encoding created',
      'Abstract prediction made',
      'Planning horizon extended',
    ],
  },
  {
    id: 'spatial',
    title: 'Spatial Intelligence',
    subtitle: '3D Environment Generation',
    icon: <Box className="h-7 w-7" strokeWidth={1.5} />,
    accentColor: '#C67B5C',
    accentBg: 'rgba(198, 123, 92, 0.08)',
    platforms: ['World Labs Marble'],
    mechanism:
      'Generates structured 3D environments from minimal input, understanding spatial relationships, physics, and geometric constraints.',
    characteristics: [
      'Native 3D representation',
      'Physical consistency',
      'Multi-view synthesis',
      'Semantic spatial understanding',
    ],
    useCases: [
      'Architecture visualization',
      'VR content creation',
      'Digital twin construction',
      'Urban planning simulation',
    ],
    spectrumLabel: ['2D output', 'Native 3D'],
    spectrumValue: 95,
    demoSteps: [
      'Minimal input received',
      'Spatial graph constructed',
      'Physics constraints applied',
      '3D environment generated',
    ],
  },
];

/* --- Mini Animated Demo --- */

function PipelineDemo({
  steps,
  accentColor,
  isActive,
}: {
  steps: string[];
  accentColor: string;
  isActive: boolean;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isActive) {
      setActiveStep(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, steps.length]);

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-500"
              style={{
                backgroundColor: i <= activeStep ? accentColor : 'transparent',
                color: i <= activeStep ? '#FDFCFA' : '#7A7268',
                border: `1.5px solid ${i <= activeStep ? accentColor : '#E2DDD5'}`,
                transform: i === activeStep ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {i + 1}
            </div>
            <span
              className="max-w-[72px] text-center text-[10px] leading-tight transition-colors duration-500"
              style={{
                color: i <= activeStep ? '#2C2825' : '#7A7268',
                fontWeight: i === activeStep ? 600 : 400,
              }}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="mb-4 flex items-center">
              <div
                className="h-0.5 w-5 transition-all duration-500"
                style={{
                  backgroundColor: i < activeStep ? accentColor : '#E2DDD5',
                }}
              />
              <ChevronRight
                className="h-3 w-3 transition-colors duration-500"
                style={{
                  color: i < activeStep ? accentColor : '#E2DDD5',
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* --- Spectrum Indicator --- */

function SpectrumBar({
  labels,
  value,
  accentColor,
}: {
  labels: [string, string];
  value: number;
  accentColor: string;
}) {
  return (
    <div className="w-full">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-japandi-sand/40">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${value}%`,
            backgroundColor: accentColor,
          }}
        />
      </div>
      <div className="mt-1.5 flex justify-between">
        <span className="text-[10px] text-japandi-mist">{labels[0]}</span>
        <span className="text-[10px] text-japandi-mist">{labels[1]}</span>
      </div>
    </div>
  );
}

/* --- Single Card --- */

function ApproachCard({
  approach,
  isExpanded,
  onToggle,
}: {
  approach: Approach;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border transition-all duration-500 ease-out cursor-pointer',
        'border-japandi-sand/60 bg-japandi-warm-white',
        isExpanded ? 'shadow-lg ring-1' : 'hover:shadow-md hover:-translate-y-1'
      )}
      style={{
        ringColor: isExpanded ? approach.accentColor : undefined,
        borderColor: isExpanded ? approach.accentColor : undefined,
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
      aria-label={`${approach.title}: ${approach.subtitle}. Click to ${isExpanded ? 'collapse' : 'expand'} details.`}
    >
      <div
        className="h-1 w-full transition-all duration-500"
        style={{
          backgroundColor: isExpanded ? approach.accentColor : 'transparent',
        }}
      />

      {!isExpanded && (
        <div
          className="absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: approach.accentColor }}
        />
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300"
              style={{
                backgroundColor: approach.accentBg,
                color: approach.accentColor,
              }}
            >
              {approach.icon}
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold leading-tight text-japandi-charcoal md:text-xl">
                {approach.title}
              </h3>
              <p
                className="mt-0.5 text-xs font-medium uppercase tracking-widest"
                style={{ color: approach.accentColor }}
              >
                {approach.subtitle}
              </p>
            </div>
          </div>
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-japandi-mist transition-colors hover:bg-japandi-linen hover:text-japandi-charcoal cursor-pointer"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {approach.platforms.map((p) => (
            <span
              key={p}
              className="rounded-full border border-japandi-sand/80 px-3 py-1 font-mono text-[11px] font-medium text-japandi-earth"
            >
              {p}
            </span>
          ))}
        </div>

        <p className="mb-5 text-sm leading-relaxed text-japandi-mist">{approach.mechanism}</p>

        <div className="mb-5">
          <SpectrumBar
            labels={approach.spectrumLabel}
            value={approach.spectrumValue}
            accentColor={approach.accentColor}
          />
        </div>

        <div
          className={cn(
            'overflow-hidden transition-all duration-500 ease-out',
            isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="mb-5 h-px w-full bg-japandi-sand/50" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-japandi-earth">
                Key Characteristics
              </h4>
              <ul className="space-y-2">
                {approach.characteristics.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-japandi-stone">
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: approach.accentColor }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-japandi-earth">
                Primary Use Cases
              </h4>
              <ul className="space-y-2">
                {approach.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-japandi-stone">
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: approach.accentColor }}
                    />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-japandi-earth">
              How It Works
            </h4>
            <div
              className="overflow-x-auto rounded-lg p-4"
              style={{ backgroundColor: approach.accentBg }}
            >
              <PipelineDemo
                steps={approach.demoSteps}
                accentColor={approach.accentColor}
                isActive={isExpanded}
              />
            </div>
          </div>
        </div>

        {!isExpanded && (
          <div className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] font-medium text-japandi-mist transition-colors group-hover:text-japandi-earth">
            <span>Click to explore</span>
            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Comparison Table --- */

function ComparisonTable() {
  const rows = [
    { label: 'Output Type', values: ['Raw Pixels', 'Latent States', '3D Geometry'] },
    { label: 'Compute Cost', values: ['High', 'Low', 'Medium'] },
    { label: 'Planning Horizon', values: ['Short', 'Long', 'Medium'] },
    { label: 'Visual Fidelity', values: ['Photorealistic', 'Abstract', 'Structured 3D'] },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-japandi-sand/60">
            <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-japandi-mist">
              Attribute
            </th>
            {approaches.map((a) => (
              <th
                key={a.id}
                className="pb-3 px-4 text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: a.accentColor }}
              >
                {a.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={cn(
                'transition-colors hover:bg-japandi-linen/50',
                i < rows.length - 1 && 'border-b border-japandi-sand/30'
              )}
            >
              <td className="py-3 pr-4 font-medium text-japandi-stone">{row.label}</td>
              {row.values.map((v, j) => (
                <td
                  key={`${row.label}-${approaches[j].id}`}
                  className="px-4 py-3 text-japandi-mist"
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --- Main Exported Component --- */

export function TechnicalApproachCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 reveal-stagger">
        {approaches.map((approach, i) => (
          <div
            key={approach.id}
            className={cn('reveal-on-scroll', isVisible && 'is-visible')}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <ApproachCard
              approach={approach}
              isExpanded={expandedId === approach.id}
              onToggle={() => handleToggle(approach.id)}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setShowComparison((prev) => !prev)}
          className={cn(
            'flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer',
            showComparison
              ? 'border-japandi-royal bg-japandi-royal text-japandi-warm-white hover:bg-japandi-royal-light'
              : 'border-japandi-sand text-japandi-earth hover:border-japandi-earth hover:bg-japandi-linen'
          )}
        >
          {showComparison ? 'Hide Comparison' : 'Compare at a Glance'}
          <ChevronRight
            className={cn(
              'h-3 w-3 transition-transform duration-300',
              showComparison && 'rotate-90'
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-500 ease-out',
          showComparison ? 'mt-8 max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="rounded-lg border border-japandi-sand/60 bg-japandi-warm-white p-5 md:p-6">
          <ComparisonTable />
        </div>
      </div>
    </div>
  );
}
