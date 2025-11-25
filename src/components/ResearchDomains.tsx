import React from 'react';
import { ResearchDomain } from '../types';
import { 
  Bot, 
  BrainCircuit, 
  ShieldAlert, 
  Cpu, 
  Glasses, 
  ServerCrash 
} from 'lucide-react';

const domains: ResearchDomain[] = [
  {
    id: 'embodied-agents',
    title: 'Embodied Physical Agents',
    description: 'Developing intelligent systems capable of perceiving, reasoning, and acting within the physical world with unprecedented dexterity and adaptability.',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'spatial-intelligence',
    title: 'Spatial Intelligence',
    description: 'Creating AI models that understand 3D geometry and spatial relationships, enabling seamless interaction with complex environments.',
    icon: Glasses,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'mech-interp',
    title: 'Mechanistic Interpretability',
    description: 'Reverse-engineering neural networks to understand the internal algorithms that drive behavior, ensuring transparency and safety.',
    icon: BrainCircuit,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'red-teaming',
    title: 'AI Red Teaming',
    description: 'Rigorous adversarial testing to identify vulnerabilities, biases, and failure modes in advanced AI systems before deployment.',
    icon: ShieldAlert,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'edge-ai',
    title: 'Edge AI & HPC',
    description: 'Optimizing high-performance computing architectures to run complex models on edge devices with minimal latency.',
    icon: Cpu,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'supercomputing',
    title: 'Supercomputing Infrastructure',
    description: 'Leveraging massive parallel processing for training next-generation foundation models.',
    icon: ServerCrash,
    color: 'from-indigo-500 to-blue-600'
  }
];

const ResearchDomains: React.FC = () => {
  return (
    <section id="research" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Research Domains
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pushing the boundaries of what's possible at the intersection of hardware, software, and intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain) => (
            <div 
              key={domain.id}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-sm"
            >
              {/* Subtle Gradient Blob Background Effect */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${domain.color} rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${domain.color} flex items-center justify-center mb-6 shadow-md`}>
                <domain.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                {domain.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {domain.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors cursor-pointer">
                <span>Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchDomains;