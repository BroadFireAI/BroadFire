import { ScrollProgressBar } from '@/components/scrollytelling/scroll-progress-bar';
import { Hero } from '@/components/scrollytelling/hero';
import { ExecutiveSummary } from '@/components/scrollytelling/executive-summary';
import { SectionWrapper } from '@/components/scrollytelling/section-wrapper';
import { SectionHeading } from '@/components/scrollytelling/section-heading';
import { SectionDivider } from '@/components/scrollytelling/section-divider';
import { InteractiveTimeline } from '@/components/scrollytelling/interactive-timeline';
import { TechnicalApproachCards } from '@/components/scrollytelling/technical-approach-cards';
import { EcosystemMap } from '@/components/scrollytelling/ecosystem-map';
import { HackathonCircuit } from '@/components/scrollytelling/hackathon-circuit';
import { CommunityMap } from '@/components/scrollytelling/community-map';
import { EntryPathway } from '@/components/scrollytelling/entry-pathway';
import { CreativeProjectCards } from '@/components/scrollytelling/creative-project-cards';
import { Footer } from '@/components/scrollytelling/footer';
import { PrizePyramid } from '@/components/infographics/prize-pyramid';
import { SkillStackDiagram } from '@/components/scrollytelling/skill-stack-diagram';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WorldModels() {
  return (
    <main>
      <ScrollProgressBar />

      {/* 1. HERO */}
      <Hero />

      {/* 2. EXECUTIVE SUMMARY & TABLE OF CONTENTS */}
      <ExecutiveSummary />

      <SectionDivider />

      {/* 3. INTERACTIVE TIMELINE */}
      <SectionWrapper id="timeline" bg="white" texture>
        <SectionHeading
          overline="January - June 2026"
          description="From the Odyssey API launch to the CVPR challenges in Denver, trace the milestones that defined the inflection point for spatial intelligence."
        >
          Key Milestones Timeline
        </SectionHeading>
        <InteractiveTimeline />
      </SectionWrapper>

      <SectionDivider />

      {/* 4. TECHNICAL APPROACHES */}
      <SectionWrapper id="approaches" bg="paper">
        <SectionHeading
          overline="Architecture Comparison"
          description="The February 2026 landscape reveals three distinct architectural philosophies, each optimized for different applications and computational constraints."
        >
          Technical Approaches to World Models
        </SectionHeading>
        <TechnicalApproachCards />
      </SectionWrapper>

      <SectionDivider />

      {/* 5. BIG FOUR ECOSYSTEM MAP */}
      <SectionWrapper id="ecosystem" bg="white" texture>
        <SectionHeading
          overline="Platform Landscape"
          description="Four platforms dominate the February 2026 world model landscape, each offering distinct entry points for developers and researchers."
        >
          The Big Four Platform Ecosystem
        </SectionHeading>
        <EcosystemMap />
      </SectionWrapper>

      <SectionDivider />

      {/* 6. NOMENCLATURE DISAMBIGUATION */}
      <SectionWrapper id="nomenclature" bg="paper">
        <SectionHeading
          overline="Naming Clarity"
          description="Three distinct entities share similar names in the spatial intelligence ecosystem. Understanding these distinctions is essential for navigating the landscape effectively."
        >
          Nomenclature Disambiguation
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-l-4 border-l-japandi-royal bg-japandi-warm-white shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-japandi-royal">Odyssey.ml</CardTitle>
              <CardDescription>World Models & Spatial Intelligence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-japandi-charcoal">Key Event:</span>
                <p className="text-japandi-mist">February 5, 2026 Palo Alto Hackathon</p>
              </div>
              <div>
                <span className="font-semibold text-japandi-charcoal">Technology:</span>
                <p className="text-japandi-mist">
                  Odyssey-2 Pro platform for generative world modeling
                </p>
              </div>
              <div>
                <span className="font-semibold text-japandi-charcoal">Prize:</span>
                <p className="text-japandi-mist">$50,000 first place with API credits</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-japandi-earth bg-japandi-warm-white shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-japandi-earth">OddySey</CardTitle>
              <CardDescription>Blockchain Infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-japandi-charcoal">Timeline:</span>
                <p className="text-japandi-mist">2017-2020 (Netherlands)</p>
              </div>
              <div>
                <span className="font-semibold text-japandi-charcoal">Technology:</span>
                <p className="text-japandi-mist">Distributed ledger platform</p>
              </div>
              <div>
                <span className="font-semibold text-japandi-charcoal">Status:</span>
                <p className="text-japandi-mist">Inactive, unrelated to world models</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-japandi-sage bg-japandi-warm-white shadow-sm transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-japandi-sage">Project Odyssey</CardTitle>
              <CardDescription>AI Filmmaking & Creative Tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-japandi-charcoal">Key Event:</span>
                <p className="text-japandi-mist">Chroma Awards competition</p>
              </div>
              <div>
                <span className="font-semibold text-japandi-charcoal">Technology:</span>
                <p className="text-japandi-mist">AI-assisted cinematic production</p>
              </div>
              <div>
                <span className="font-semibold text-japandi-charcoal">Community:</span>
                <p className="text-japandi-mist">Discord-based creative challenges</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      <SectionDivider />

      {/* 7. HACKATHON CIRCUIT */}
      <SectionWrapper id="hackathons" bg="white" texture>
        <SectionHeading
          overline="Events & Competitions"
          description="Academic workshops, commercial hackathons, and creative challenges form a vibrant circuit driving world model innovation."
        >
          Hackathon Circuit Visualization
        </SectionHeading>
        <HackathonCircuit />
      </SectionWrapper>

      <SectionDivider />

      {/* 8. KEY DATA / INFOGRAPHICS */}
      <SectionWrapper id="infographics" bg="linen">
        <SectionHeading
          overline="Key Data"
          description="Prize structures, required skill stacks, and community hubs - the essential data for navigating the world model landscape."
        >
          Visual Infographics
        </SectionHeading>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <PrizePyramid />
          <SkillStackDiagram />
          <CommunityMap />
        </div>
      </SectionWrapper>

      <SectionDivider />

      {/* 9. ENTRY PATHWAY */}
      <SectionWrapper id="pathway" bg="white" texture>
        <SectionHeading
          overline="Getting Started"
          description="Building world model applications requires a deliberate skill acquisition sequence. Each stage builds upon the previous foundation."
        >
          Your Entry Pathway
        </SectionHeading>
        <EntryPathway />
      </SectionWrapper>

      <SectionDivider />

      {/* 10. COMMUNITY & CREATIVE PROJECTS */}
      <SectionWrapper id="community" bg="paper">
        <SectionHeading
          overline="Community & Projects"
          description="Access expertise and early information flows through strategic community participation, then build your portfolio with these concrete project starters."
        >
          Community & Creative Starters
        </SectionHeading>
        <CreativeProjectCards />
      </SectionWrapper>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
