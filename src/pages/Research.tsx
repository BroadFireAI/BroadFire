import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Cpu, Microscope, Dna } from 'lucide-react';

interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  topics: string[];
  publications?: number;
}

const researchAreas: ResearchArea[] = [
  {
    id: 'multimodal-llms',
    title: 'Multimodal Large Language Models',
    description:
      'Developing and analyzing foundation models that integrate text, vision, audio, and other modalities for unified understanding and generation.',
    icon: Brain,
    topics: [
      'Vision-language models',
      'Cross-modal alignment',
      'Multimodal reasoning',
      'Emergent capabilities',
    ],
    publications: 12,
  },
  {
    id: 'neurosymbolic',
    title: 'Neuro-symbolic AI',
    description:
      'Bridging neural networks with symbolic reasoning to create systems that combine learning from data with structured knowledge and logical inference.',
    icon: Cpu,
    topics: [
      'Neural theorem proving',
      'Knowledge graph integration',
      'Symbolic program synthesis',
      'Hybrid architectures',
    ],
    publications: 8,
  },
  {
    id: 'interpretability',
    title: 'Mechanistic Interpretability',
    description:
      'Reverse-engineering neural networks to understand the algorithms and representations they learn, enabling safer and more aligned AI systems.',
    icon: Microscope,
    topics: [
      'Circuit discovery',
      'Feature visualization',
      'Activation patching',
      'Superposition research',
    ],
    publications: 15,
  },
  {
    id: 'scientific-ml',
    title: 'Scientific Machine Learning',
    description:
      'Applying ML to computational biology, whole-cell modeling, and other scientific domains where data-driven approaches meet mechanistic understanding.',
    icon: Dna,
    topics: [
      'Whole-cell models',
      'Protein structure prediction',
      'Drug discovery',
      'Systems biology',
    ],
    publications: 10,
  },
];

const Research: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] mb-6">Research</h1>
        <p className="text-lg text-[#525252] max-w-3xl leading-relaxed">
          Our research spans fundamental questions in artificial intelligence, from understanding
          how neural networks work internally to building systems that can reason across multiple
          modalities.
        </p>
      </section>

      {/* Research Areas Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {researchAreas.map((area) => (
            <article
              key={area.id}
              className="group p-8 bg-[#FAFAFA] border border-[#E5E5E5] hover:border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-white border border-[#E5E5E5] group-hover:border-blue-200 transition-colors">
                  <area.icon className="w-6 h-6 text-blue-600" />
                </div>
                {area.publications && (
                  <span className="text-sm text-[#525252] font-mono">
                    {area.publications} papers
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold text-[#0A0A0A] mb-3 group-hover:text-blue-600 transition-colors">
                {area.title}
              </h2>

              <p className="text-[#525252] mb-6 leading-relaxed">{area.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {area.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 text-xs font-medium text-[#525252] bg-white border border-[#E5E5E5]"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <Link
                to={`/publications?area=${area.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View publications
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section className="bg-[#FAFAFA] border-t border-[#E5E5E5] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-[#0A0A0A] mb-8">Our Stack</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'Julia', description: 'Scientific computing and performance-critical code' },
              { name: 'Rust', description: 'Systems programming and memory-safe infrastructure' },
              { name: 'Python', description: 'ML frameworks and rapid prototyping' },
            ].map((lang) => (
              <div
                key={lang.name}
                className="flex-1 min-w-[200px] p-6 bg-white border border-[#E5E5E5]"
              >
                <h3 className="font-mono text-lg font-semibold text-[#0A0A0A] mb-2">{lang.name}</h3>
                <p className="text-sm text-[#525252]">{lang.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;
