import React, { useState, Suspense, lazy } from 'react';
import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Award,
  Code,
  GraduationCap,
  BookOpen,
  Cpu,
  Microscope,
  Terminal,
} from 'lucide-react';
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

const About: React.FC = () => {
  const [selectedSphere, setSelectedSphere] = useState<SphereData | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Profile Image Column */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <div className="relative group">
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
                    href="https://github.com/divital-coder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/divyansh-goyal-34654b200/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-100 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">2x</p>
                    <p className="text-xs text-gray-500 mt-1">GSoC Fellow</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">10+</p>
                    <p className="text-xs text-gray-500 mt-1">Open Source Packages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-3 space-y-10">
              {/* Name and Title */}
              <div>
                <div className="inline-block px-3 py-1 mb-4 border border-gray-300 text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/50">
                  Founder, BroadFire AI
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                  Divyansh Goyal
                </h1>
                <p className="text-xl text-gray-600">Scientific Computing Research Engineer</p>
                <p className="text-lg text-blue-600 font-medium mt-1">
                  Princeton University &middot; JuliaHealth &middot; SciML
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-600">
                  I build tools at the intersection of high-performance computing, medical imaging,
                  and scientific machine learning. My work spans GPU-accelerated 3D visualization
                  systems, neurosymbolic reasoning architectures, and the Julia scientific computing
                  ecosystem.
                </p>
                <p className="leading-relaxed text-gray-500">
                  As a two-time Google Summer of Code fellow, I developed{' '}
                  <span className="text-gray-700 font-medium">MedEye3d.jl</span> for real-time
                  medical image visualization and{' '}
                  <span className="text-gray-700 font-medium">MedVoxelHD</span> for supervoxel
                  segmentation powered by Kolmogorov networks. At Princeton, I build{' '}
                  <span className="text-gray-700 font-medium">HepMC3.jl</span>, porting CERN's Monte
                  Carlo event record library to Julia for high-energy physics research.
                </p>
                <p className="leading-relaxed text-gray-500">
                  I founded BroadFire AI as an open research initiative exploring spatial
                  intelligence, mechanistic interpretability, and embodied AI &mdash; with a focus
                  on making these capabilities safe, transparent, and accessible.
                </p>
              </div>

              {/* Highlight Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: Award,
                    title: 'Google Summer of Code',
                    subtitle: '2024 & 2025 Fellow',
                    description:
                      'MedEye3d.jl GPU visualization and MedVoxelHD supervoxel segmentation for JuliaHealth',
                  },
                  {
                    icon: Code,
                    title: 'Princeton University',
                    subtitle: 'Research Software Engineer',
                    description:
                      'HepMC3.jl for high-energy physics Monte Carlo events, presented at JuliaHEP 2025',
                  },
                  {
                    icon: GraduationCap,
                    title: 'JuliaHealth',
                    subtitle: 'Community Manager',
                    description:
                      'Leading open science community for medical imaging and computational biology packages',
                  },
                ].map((item) => (
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

              {/* Technical Expertise */}
              <div className="bg-[#0A0A0A] p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
                  Technical Stack
                </h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { label: 'Languages', value: 'Julia, Python, C++, TypeScript, GLSL' },
                    { label: 'GPU / HPC', value: 'CUDA.jl, ModernGL.jl, OpenCL, MPI' },
                    { label: 'ML / AI', value: 'Flux.jl, PyTorch, JAX, Transformers' },
                    { label: 'Scientific', value: 'SciML, DifferentialEquations.jl, Makie' },
                    { label: 'Medical', value: 'MedEye3d, ITK, SimpleITK, NIfTI' },
                    { label: 'Infrastructure', value: 'Linux, Docker, Slurm, CI/CD' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 py-2">
                      <span className="text-blue-400 text-xs font-mono uppercase tracking-wider min-w-[80px] pt-0.5">
                        {item.label}
                      </span>
                      <span className="text-gray-400 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Contributions */}
              <div className="bg-white p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Open Source Contributions</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { name: 'MedEye3d.jl', desc: 'GPU-accelerated 3D medical visualization' },
                    { name: 'MedVoxelHD', desc: 'Supervoxel segmentation with KANs' },
                    { name: 'HepMC3.jl', desc: 'High-energy physics event records' },
                    { name: 'ITKIOWrapper.jl', desc: 'Medical image I/O for Julia' },
                    { name: 'SciMLOperators.jl', desc: 'Linear algebra operators for SciML' },
                    { name: 'DataInterpolations.jl', desc: 'Interpolation methods for data' },
                    { name: 'MedImages.jl', desc: 'Medical imaging data structures' },
                    { name: 'Eva.jl', desc: 'Neurosymbolic language model' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-3 text-sm py-2 px-3 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                      <div>
                        <span className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-gray-400 ml-1.5">&mdash; {item.desc}</span>
                      </div>
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
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
            <MagneticWaveBackground />
          </Suspense>
        </div>
        <div className="absolute inset-0 bg-gray-900/40 z-[1]" />

        <div className="max-w-6xl mx-auto relative z-[2]">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Research Domains</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Click on the spheres to explore each research area in depth
            </p>
          </div>

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
          <div className="inline-block px-3 py-1 mb-6 border border-gray-300 text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/50">
            Career
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Experience</h2>

          <div className="space-y-0">
            {[
              {
                id: 'broadfire',
                period: '2025 - Present',
                role: 'Founder',
                org: 'BroadFire AI',
                description:
                  'Open research initiative exploring spatial intelligence, neurosymbolic reasoning, mechanistic interpretability, and embodied AI systems.',
                tags: ['Research', 'AI Safety'],
              },
              {
                id: 'princeton',
                period: '2024 - Present',
                role: 'Research Software Engineer',
                org: 'Princeton University',
                description:
                  'Development of HepMC3.jl wrapper for high-energy physics Monte Carlo event records. Presented at JuliaHEP 2025 conference.',
                tags: ['Julia', 'HPC', 'Physics'],
              },
              {
                id: 'gsoc25',
                period: '2025',
                role: 'Google Summer of Code Fellow',
                org: 'JuliaHealth',
                description:
                  'Built MedVoxelHD, an advanced supervoxel segmentation system using Kolmogorov-Arnold Networks for medical image analysis.',
                tags: ['Medical Imaging', 'GPU'],
              },
              {
                id: 'gsoc24',
                period: '2024',
                role: 'Google Summer of Code Fellow',
                org: 'JuliaHealth',
                description:
                  'Developed MedEye3d.jl, a GPU-accelerated 3D medical imaging visualization toolkit using ModernGL.jl and CUDA.jl.',
                tags: ['OpenGL', 'CUDA', 'Julia'],
              },
              {
                id: 'juliahealth',
                period: '2023 - Present',
                role: 'Community Manager',
                org: 'JuliaHealth',
                description:
                  'Leading the open science research community. Core contributor to MedImages.jl, ITKIOWrapper.jl, and ITK_jll.jl for medical imaging analysis.',
                tags: ['Open Source', 'Community'],
              },
              {
                id: 'sciml',
                period: '2024 - Present',
                role: 'SciML Developer',
                org: 'Julia SciML',
                description:
                  'Developer grants for SciMLOperators.jl (linear algebra operators) and DataInterpolations.jl (statistical interpolation methods).',
                tags: ['Scientific ML', 'Julia'],
              },
            ].map((item, index, arr) => (
              <div key={item.id} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform flex-shrink-0 mt-1" />
                  {index < arr.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-2" />}
                </div>
                <div className="pb-10">
                  <span className="text-sm text-blue-600 font-medium">{item.period}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{item.role}</h3>
                  <p className="text-gray-600 font-medium">{item.org}</p>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 mb-6 border border-gray-300 text-xs font-bold tracking-widest uppercase text-gray-500 bg-white/50">
            Philosophy
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">What I Believe In</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Open Science',
                text: 'Research should be reproducible, accessible, and built on open foundations. Every package I write is open source.',
              },
              {
                icon: Microscope,
                title: 'Rigorous Engineering',
                text: 'Performance-critical code demands type stability, proper benchmarking, and GPU awareness. Measure twice, ship once.',
              },
              {
                icon: Cpu,
                title: 'Spatial Intelligence',
                text: 'The next frontier of AI lies in understanding 3D space, embodiment, and physical reasoning beyond language alone.',
              },
              {
                icon: Terminal,
                title: 'Julia Ecosystem',
                text: 'Julia solves the two-language problem. I invest in its scientific computing ecosystem because the abstractions are right.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-blue-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
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
