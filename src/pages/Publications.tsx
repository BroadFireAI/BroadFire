import React, { useState } from 'react';
import { ExternalLink, FileText, Calendar, Users } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  area: string;
  abstract: string;
  arxivUrl?: string;
  pdfUrl?: string;
  codeUrl?: string;
}

const publications: Publication[] = [
  {
    id: '1',
    title: 'Scaling Laws for Multimodal Reasoning in Vision-Language Models',
    authors: ['A. Research', 'B. Collaborator', 'C. Team'],
    venue: 'NeurIPS 2025',
    year: 2025,
    area: 'multimodal-llms',
    abstract:
      'We investigate how reasoning capabilities in vision-language models scale with compute, data, and model size. Our findings reveal distinct scaling behaviors for different types of multimodal reasoning tasks.',
    arxivUrl: '#',
    codeUrl: '#',
  },
  {
    id: '2',
    title: 'Circuit Discovery in Large Language Models via Automated Interpretability',
    authors: ['D. Researcher', 'E. Scientist'],
    venue: 'ICML 2025',
    year: 2025,
    area: 'interpretability',
    abstract:
      'We present a novel approach to automatically discover circuits in large language models using gradient-based attribution and causal intervention methods.',
    arxivUrl: '#',
    pdfUrl: '#',
  },
  {
    id: '3',
    title: 'Neural-Symbolic Integration for Scientific Hypothesis Generation',
    authors: ['F. Author', 'G. Writer', 'H. Contributor'],
    venue: 'ICLR 2025',
    year: 2025,
    area: 'neurosymbolic',
    abstract:
      'We develop a hybrid system that combines neural language models with symbolic reasoning engines to generate and validate scientific hypotheses in biology.',
    arxivUrl: '#',
    codeUrl: '#',
  },
  {
    id: '4',
    title: 'Whole-Cell Modeling with Differentiable Simulation',
    authors: ['I. Biologist', 'J. Modeler'],
    venue: 'Nature Methods',
    year: 2024,
    area: 'scientific-ml',
    abstract:
      'We introduce a fully differentiable whole-cell simulation framework that enables end-to-end learning of cellular dynamics from experimental data.',
    arxivUrl: '#',
    pdfUrl: '#',
  },
  {
    id: '5',
    title: 'Superposition and Feature Splitting in Transformer Residual Streams',
    authors: ['K. Analyst', 'L. Interpreter'],
    venue: 'COLM 2024',
    year: 2024,
    area: 'interpretability',
    abstract:
      'We study how features are represented in transformer models, finding evidence for both superposition and feature splitting across different layers.',
    arxivUrl: '#',
  },
  {
    id: '6',
    title: 'Cross-Modal Alignment Without Paired Data',
    authors: ['M. Engineer', 'N. Developer', 'O. Builder'],
    venue: 'ACL 2024',
    year: 2024,
    area: 'multimodal-llms',
    abstract:
      'We propose a method for aligning representations across modalities using only unpaired data and self-supervised objectives.',
    arxivUrl: '#',
    codeUrl: '#',
    pdfUrl: '#',
  },
];

const areas = [
  { id: 'all', label: 'All' },
  { id: 'multimodal-llms', label: 'Multimodal LLMs' },
  { id: 'interpretability', label: 'Interpretability' },
  { id: 'neurosymbolic', label: 'Neuro-symbolic' },
  { id: 'scientific-ml', label: 'Scientific ML' },
];

const Publications: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState('all');

  const filteredPublications =
    selectedArea === 'all' ? publications : publications.filter((p) => p.area === selectedArea);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] mb-6">Publications</h1>
        <p className="text-lg text-[#525252] max-w-3xl leading-relaxed">
          Selected papers from our research on AI systems, interpretability, and scientific machine
          learning.
        </p>
      </section>

      {/* Filter tabs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                selectedArea === area.id
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-[#FAFAFA] text-[#525252] border border-[#E5E5E5] hover:border-gray-400'
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>
      </section>

      {/* Publications list */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <article
              key={pub.id}
              className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex p-3 bg-white border border-[#E5E5E5] group-hover:border-blue-200 transition-colors">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-[#0A0A0A] mb-2 group-hover:text-blue-600 transition-colors">
                    {pub.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#525252] mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {pub.authors.join(', ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {pub.venue} {pub.year}
                    </span>
                  </div>

                  <p className="text-[#525252] text-sm leading-relaxed mb-4 line-clamp-2">
                    {pub.abstract}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {pub.arxivUrl && (
                      <a
                        href={pub.arxivUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#525252] bg-white border border-[#E5E5E5] hover:border-blue-300 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        arXiv
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#525252] bg-white border border-[#E5E5E5] hover:border-blue-300 hover:text-blue-600 transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        PDF
                      </a>
                    )}
                    {pub.codeUrl && (
                      <a
                        href={pub.codeUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#525252] bg-white border border-[#E5E5E5] hover:border-blue-300 hover:text-blue-600 transition-colors"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-16 text-[#525252]">
            No publications found in this category.
          </div>
        )}
      </section>
    </div>
  );
};

export default Publications;
