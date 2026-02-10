import { SectionWrapper } from './section-wrapper';
import { SectionHeading } from './section-heading';
import { Calendar, Layers, Map, Trophy, Users, Compass, Sparkles, BookOpen } from 'lucide-react';

const tocItems = [
  {
    id: 'timeline',
    label: 'Timeline',
    desc: 'Key milestones Jan-Jun 2026',
    icon: Calendar,
  },
  {
    id: 'approaches',
    label: 'Technical Approaches',
    desc: 'Generative, Abstract, Spatial',
    icon: Layers,
  },
  {
    id: 'ecosystem',
    label: 'Platform Ecosystem',
    desc: 'The Big Four platforms',
    icon: Map,
  },
  {
    id: 'nomenclature',
    label: 'Nomenclature',
    desc: 'Disambiguation guide',
    icon: BookOpen,
  },
  {
    id: 'hackathons',
    label: 'Hackathon Circuit',
    desc: 'Academic, Commercial, Creative',
    icon: Trophy,
  },
  {
    id: 'infographics',
    label: 'Key Data',
    desc: 'Prizes, skills & communities',
    icon: Sparkles,
  },
  {
    id: 'community',
    label: 'Community',
    desc: 'Engagement & watering holes',
    icon: Users,
  },
  {
    id: 'pathway',
    label: 'Entry Pathway',
    desc: 'Your roadmap to get started',
    icon: Compass,
  },
];

export function ExecutiveSummary() {
  return (
    <SectionWrapper id="executive-summary" bg="paper" texture>
      <SectionHeading
        overline="Executive Summary"
        description="The Odyssey-2 Pro hackathon in Palo Alto catalyzed the transition of world models from academic research to practical platforms. This report maps the landscape of technical approaches, platforms, communities, and entry pathways that define the February 2026 inflection point."
      >
        2026: The Year World Models Came Alive
      </SectionHeading>

      {/* Table of Contents grid */}
      <nav aria-label="Report sections" className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tocItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-start gap-4 rounded-lg border border-japandi-sand/60 bg-japandi-warm-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-japandi-royal/30 hover:shadow-md cursor-pointer"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-japandi-royal/10 text-japandi-royal transition-colors group-hover:bg-japandi-royal group-hover:text-japandi-warm-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-japandi-charcoal">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-japandi-mist">{item.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </nav>
    </SectionWrapper>
  );
}
