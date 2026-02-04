import React, { useState, Suspense, lazy } from 'react';
import { ExternalLink, Github, Linkedin, Mail, Award, Code, GraduationCap } from 'lucide-react';
import profileImage from '../assets/profile.png';
import OptimizedImage from './OptimizedImage';
import SphereModal from './SphereModal';

const Interactive3DSpheres = lazy(() => import('./Interactive3DSpheres'));
const MagneticWaveBackground = lazy(() => import('./MagneticWaveBackground'));

interface SphereData {
  id: string;
  title: string;
  description: string;
  color: [number, number, number];
  position: [number, number, number];
  details?: string[];
  links?: { label: string; url: string }[];
}

const researchSpheres: SphereData[] = [
  {
    id: 'spatial',
    title: 'Spatial Intelligence',
    description:
      'Exploring the intersection of physical space and artificial intelligence, focusing on how AI perceives, understands, and interacts with 3D environments.',
    color: [0.15, 0.4, 0.9],
    position: [-3.2, 0, 0],
    details: [
      'GPU-accelerated medical imaging visualization',
      'MedEye3d.jl: 3D segmentation toolkit',
      'Cryo-ET particle picking and segmentation',
      'ModernGL.jl and CUDA.jl implementations',
    ],
  },
  {
    id: 'interpretability',
    title: 'Mechanistic Interpretability',
    description:
      'Reverse engineering neural networks to understand the internal algorithms and representations that drive model behavior and decision-making.',
    color: [0.3, 0.5, 0.95],
    position: [0, 0, 0],
    details: [
      'Understanding transformer architectures',
      'Feature visualization and attribution',
      'Circuit analysis in deep networks',
      'Interpretable AI for medical diagnostics',
    ],
  },
  {
    id: 'hpc',
    title: 'Optimization and HPC',
    description:
      'Leveraging High Performance Computing for large-scale scientific simulations and optimizing algorithms for maximum computational efficiency.',
    color: [0.1, 0.3, 0.7],
    position: [3.2, 0, 0],
    details: [
      'SciMLOperators.jl development',
      'DataInterpolations.jl contributions',
      'HepMC3.jl: CERN library Julia port',
      'GPU kernel optimization with CUDA.jl',
    ],
    links: [{ label: 'SciML', url: 'https://sciml.ai' }],
  },
];

const highlights = [
  {
    icon: Award,
    title: 'Google Summer of Code',
    subtitle: '2024 & 2025 Fellow',
    description: 'MedEye3d.jl medical imaging visualization and MedVoxelHD supervoxel segmentation',
  },
  {
    icon: Code,
    title: 'Princeton University',
    subtitle: 'Research Software Engineer',
    description: 'HepMC3.jl development for high-energy physics Monte Carlo events',
  },
  {
    icon: GraduationCap,
    title: 'JuliaHealth',
    subtitle: 'Community Manager',
    description: 'Leading open science research community for medical imaging packages',
  },
];

const About: React.FC = () => {
  const [selectedSphere, setSelectedSphere] = useState<SphereData | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Profile Image Column */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="relative group">
                  {/* Decorative background elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-600/20 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

                  <OptimizedImage
                    src={profileImage}
                    alt="Divyansh Goyal"
                    className="relative shadow-xl aspect-[3/4] w-full"
                    placeholderColor="#e8e0d0"
                  />
                </div>

                {/* Contact Links */}
                <div className="mt-8 flex gap-4 justify-center">
                  <a
                    href="mailto:contact@broadfire.ai"
                    className="p-3 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </a>
                  <a
                    href="https://github.com"
                    className="p-3 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="p-3 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-3 space-y-8">
              {/* Name and Title */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Divyansh Goyal
                </h1>
                <p className="text-xl text-gray-600 mb-2">Scientific Computing Research Engineer</p>
                <p className="text-lg text-blue-600 font-medium">
                  Princeton University / JuliaHealth Community Manager
                </p>
              </div>

              {/* Bio */}
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="text-lg leading-relaxed">
                  Building the future of computational biology and medical imaging through
                  GPU-accelerated visualization, advanced segmentation algorithms, and
                  high-performance scientific computing.
                </p>
                <p className="leading-relaxed">
                  As a Google Summer of Code fellow and core contributor to JuliaHealth, I develop
                  tools that bridge the gap between cutting-edge research and practical medical
                  applications: from 3D visualization toolkits to supervoxel segmentation systems
                  powered by Kolmogorov networks.
                </p>
              </div>

              {/* Highlight Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-2">{item.subtitle}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Contributions List */}
              <div className="bg-white p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Contributions</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'MedEye3d.jl: GPU-accelerated visualization',
                    'MedVoxelHD: Supervoxel segmentation',
                    'HepMC3.jl: High-energy physics tools',
                    'ITKIOWrapper.jl: Medical imaging I/O',
                    'SciMLOperators.jl: Linear algebra ops',
                    'DataInterpolations.jl: Statistical tools',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-gray-600 py-2 px-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Domains Section with 3D Spheres */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
        {/* Magnetic wave distortion background shader */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
            <MagneticWaveBackground />
          </Suspense>
        </div>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gray-900/40 z-[1]" />

        <div className="max-w-6xl mx-auto relative z-[2]">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Research Domains</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Click on the spheres to explore each research area in depth
            </p>
          </div>

          {/* 3D Spheres Container */}
          <div className="h-[400px] lg:h-[500px] relative">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Loading 3D...
                </div>
              }
            >
              <Interactive3DSpheres
                spheres={researchSpheres}
                onSphereClick={(sphere) => setSelectedSphere(sphere)}
              />
            </Suspense>

            {/* Sphere Labels (positioned below spheres) */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4">
              {researchSpheres.map((sphere) => (
                <div
                  key={sphere.id}
                  className="text-center cursor-pointer group"
                  onClick={() => setSelectedSphere(sphere)}
                >
                  <h3 className="text-white font-semibold text-sm lg:text-base group-hover:text-blue-400 transition-colors">
                    {sphere.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 hidden sm:block">Click to explore</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Experience</h2>

          <div className="space-y-8">
            {[
              {
                id: 'princeton',
                period: '2024 - Present',
                role: 'Research Software Engineer',
                org: 'Princeton University',
                description:
                  'Development of HepMC3.jl wrapper for high-energy physics Monte Carlo events. Presented at JuliaHEP 2025 conference.',
              },
              {
                id: 'gsoc',
                period: '2024 - 2025',
                role: 'Google Summer of Code Fellow',
                org: 'JuliaHealth',
                description:
                  'Built GPU-accelerated medical imaging visualization (MedEye3d.jl) and advanced supervoxel segmentation algorithms (MedVoxelHD).',
              },
              {
                id: 'juliahealth',
                period: '2023 - Present',
                role: 'Community Manager',
                org: 'JuliaHealth',
                description:
                  'Leading open science research community. Contributing to MedImages.jl, ITKIOWrapper.jl, and ITK_jll.jl for medical imaging analysis.',
              },
              {
                id: 'sciml',
                period: '2024 - Present',
                role: 'SciML Developer',
                org: 'Julia SciML',
                description:
                  'Developer grants for Linear Operators (SciMLOperators.jl) and statistical packages (DataInterpolations.jl).',
              },
            ].map((item, index, arr) => (
              <div key={item.id} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
                  {index < arr.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-sm text-blue-600 font-medium">{item.period}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{item.role}</h3>
                  <p className="text-gray-600 font-medium">{item.org}</p>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for sphere details */}
      {selectedSphere && (
        <SphereModal
          isOpen={!!selectedSphere}
          onClose={() => setSelectedSphere(null)}
          title={selectedSphere.title}
          description={selectedSphere.description}
          color={selectedSphere.color}
        >
          {selectedSphere.details && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Focus Areas
              </h4>
              <ul className="space-y-2">
                {selectedSphere.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedSphere.links && (
            <div className="mt-6 flex gap-3">
              {selectedSphere.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </SphereModal>
      )}
    </div>
  );
};

export default About;
