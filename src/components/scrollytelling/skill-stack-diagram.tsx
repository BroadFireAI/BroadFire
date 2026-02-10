import React from 'react';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb, Layers, Box, Workflow } from 'lucide-react';

interface SkillLevel {
  id: number;
  title: string;
  timeline: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const skills: SkillLevel[] = [
  {
    id: 1,
    title: 'Prompt Engineering',
    timeline: '2-4 weeks',
    description:
      'Master the fundamentals of communicating with generative models. Focus on conditioning strategies, iterative refinement, and understanding model behavior patterns.',
    icon: Lightbulb,
    color: '#7A8A6E', // sage
    bgColor: '#95A688', // sage-light
  },
  {
    id: 2,
    title: 'Interaction Design',
    timeline: '4-6 weeks',
    description:
      'Develop fluency in designing model-environment interactions. Study reinforcement learning concepts, action space design, and reward shaping.',
    icon: Layers,
    color: '#8B7355', // earth
    bgColor: '#A0826D', // wood
  },
  {
    id: 3,
    title: '3D Literacy',
    timeline: '6-8 weeks',
    description:
      'Acquire proficiency with 3D modeling software and spatial mathematics. Learn coordinate systems, transformations, and scene graph architectures.',
    icon: Box,
    color: '#C67B5C', // terracotta
    bgColor: '#D99B82', // terracotta-light
  },
  {
    id: 4,
    title: 'Agentic Frameworks',
    timeline: '8-12 weeks',
    description:
      'Synthesize previous stages into autonomous agent development. Master planning algorithms, multi-step reasoning, and model composition techniques.',
    icon: Workflow,
    color: '#1E3A8A', // royal blue
    bgColor: '#2B4EA6', // royal-light
  },
];

export function SkillStackDiagram() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visibleStages, setVisibleStages] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of each skill level
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setVisibleStages((prev) => new Set(prev).add(skill.id));
            }, index * 150);
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gradient-to-b from-japandi-paper to-japandi-linen/50 p-6 shadow-sm"
    >
      {/* Title */}
      <h3 className="mb-8 text-center font-serif text-xl font-semibold text-japandi-charcoal">
        Skill Stack Progression
      </h3>

      {/* Vertical Stepper */}
      <div className="relative flex w-full flex-col gap-6">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          const isVisible = visibleStages.has(skill.id);
          const isHovered = hoveredId === skill.id;
          const isLast = index === skills.length - 1;

          return (
            <div key={skill.id} className="relative">
              {/* Skill Level Card */}
              <div
                className={cn(
                  'group relative flex cursor-pointer items-start gap-4 rounded-lg bg-japandi-warm-white p-4 shadow-sm transition-all duration-500',
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0',
                  isHovered && 'shadow-md'
                )}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
                onMouseEnter={() => setHoveredId(skill.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Icon with progress indicator */}
                <div className="relative flex-shrink-0">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300',
                      isHovered ? 'scale-110' : 'scale-100'
                    )}
                    style={{
                      backgroundColor: isHovered ? skill.color : skill.bgColor,
                    }}
                  >
                    <Icon
                      className="h-6 w-6 transition-colors duration-300"
                      style={{
                        color: isHovered ? '#FDFCFA' : skill.color,
                      }}
                    />
                  </div>

                  {/* Stage number badge */}
                  <div
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: skill.color,
                      color: '#FDFCFA',
                    }}
                  >
                    {skill.id}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-sans text-sm font-semibold leading-tight text-japandi-charcoal">
                      {skill.title}
                    </h4>
                    <span
                      className="whitespace-nowrap text-xs font-medium transition-colors duration-300"
                      style={{
                        color: isHovered ? skill.color : '#7A7268',
                      }}
                    >
                      {skill.timeline}
                    </span>
                  </div>

                  {/* Description - expanded on hover */}
                  <div
                    className={cn(
                      'overflow-hidden text-xs leading-relaxed text-japandi-mist transition-all duration-300',
                      isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="pt-2">{skill.description}</p>
                  </div>

                  {/* Hint when not hovered */}
                  {!isHovered && (
                    <p className="text-[10px] italic text-japandi-mist/70 transition-opacity duration-300">
                      Hover for details
                    </p>
                  )}
                </div>

                {/* Accent border */}
                <div
                  className={cn(
                    'absolute left-0 top-0 h-full w-1 rounded-l-lg transition-all duration-300'
                  )}
                  style={{
                    backgroundColor: skill.color,
                    opacity: isHovered ? 1 : 0.3,
                  }}
                />
              </div>

              {/* Connecting line to next stage */}
              {!isLast && (
                <div
                  className={cn(
                    'absolute left-[38px] top-[72px] h-6 w-0.5 transition-all duration-700',
                    visibleStages.has(skill.id) && visibleStages.has(skills[index + 1].id)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                  style={{
                    backgroundColor: skill.color,
                    transitionDelay: `${(index + 1) * 150}ms`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-center text-[10px] italic text-japandi-mist">
        Each stage builds upon the previous foundation
      </p>
    </div>
  );
}
