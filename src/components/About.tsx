import React from 'react';
import { Brain, Cpu, Network } from 'lucide-react';
import profileImage from '../assets/profile.png';

const About: React.FC = () => {
    return (
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Highlights Section */}
            <section className="mb-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About Me</h1>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Image Column */}
                        <div className="lg:w-1/3 flex-shrink-0">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <img
                                    src={profileImage}
                                    alt="Divyansh Goyal"
                                    className="relative w-full rounded-xl shadow-lg object-cover aspect-[3/4]"
                                />
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="lg:w-2/3 prose prose-lg max-w-none text-gray-600 space-y-6">
                            <p className="font-semibold text-gray-900">
                                November 14, 2025<br />
                                Pumas AI
                            </p>

                            <p>
                                Hello,
                            </p>

                            <p>
                                I am an undergraduate scientific computing research engineer (Princeton University) and the Community Manager for the open science research community, JuliaHealth. In particular, over the last 2 years, I have been a Google Summer of Code fellow hacking together and building a GPU Accelerated medical imaging visualization and segmentation toolkit (using ModernGL.jl and CUDA.jl) as well as an advanced supervoxel segmentation algorithm based on Kolmogorov and Recurrent Neural Networks.
                            </p>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Highlights:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Google summer of code-2024, Medical imaging visualization and segmentation MedEye3d.jl</li>
                                    <li>Google Summer of Code-2025, Digital Twin based approach for advanced supervoxel segmentation MedVoxelHD, SuperVoxel Algorithms, MedImages</li>
                                    <li>Princeton Research software engineer for HepMC3.jl</li>
                                    <li>Gave talks at JuliaHEP 2025, Juliacon Local Paris under various grants.</li>
                                    <li>SciML Developer Grants for Linear Operators and Statistical packages.</li>
                                </ul>
                            </div>

                            <p>
                                I have relatively steep inclination towards machine learning and have acquired extensive knowledge of such routines over 3 primary domains namely, Cellular imaging (Particle picking and segmentation in Cryo-ET datasets), High-Energy Physics (Diffusion models for detector simulation) and AI agents with Camel-AI open source framework for orchestration of communicative AI agents.
                            </p>

                            <p>
                                Being an active contributor to the Julia programming language's sub-ecosystem of medical-imaging packages under the JuliaHealth organisation, I have contributed immensely towards the development of packages such as the likes of an imaging and visualization tool namely (MedEye3d.jl) under Google-Summer-of-Code 2024 and 2025. Extending community contributions further, I led the development of other supporting packages such as MedImages.jl (Medical imaging data-analysis), ITKIOWrapper.jl and ITK_jll.jl (Wrapper packages providing image registrations functions from the Insight Toolkit C++ library) involving various routines for medical imaging data analysis and manipulation commonly within the NIFTI AND DICOM file formats.
                            </p>

                            <p>
                                Further as a research software engineer at Princeton, the development of HepMC3.jl, a wrapper package involving the port of HepMC3 (High energy physics monte-carlo events) C++ library by CERN to Julia as a project was accepted and presented at the 2025 JuliaHEP conference.
                            </p>

                            <p>
                                I currently contribute to the SciML, scientific machine learning packages as an intern in Julia primarily the Linear Algebra operators package, such as SciMLOperators.jl and statistical packages such as DataInterpolations.jl.
                            </p>

                            <p>
                                Being an ongoing Beta Microsoft Learn Student ambassador, I constantly interact with the State-of-the-art LLMs and host workshops around using Azure for building complete AI solutions and running experiments on GPUs via jupyter notebooks. Further my involvement also as an ambassador within the Camel-AI community, I contribute to cookbooks for using and interacting with the Camel-AI agent framework, utilizing various LLM backends. Eg: an ongoing cookbook example issue assigned to me for completion by camel-AI development team.
                            </p>

                            <p>
                                Embarking on an endeavor as such will allow me to expand my horizons even further within the landscape of foundation models of biology, pharmacology and other overlapping areas, and the current innovative drug simulation techniques.
                            </p>

                            <p className="mt-8">
                                Sincerely,<br />
                                <span className="font-semibold text-gray-900">Divyansh Goyal</span><br />
                                New Delhi, India
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Domains Section */}
            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Experiments, Products & Research</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Spatial Intelligence */}
                    <div className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-orange-500/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                            <Network className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Spatial Intelligence</h3>
                        <p className="text-gray-600">
                            Exploring the intersection of physical space and artificial intelligence, focusing on how AI perceives and interacts with 3D environments.
                        </p>
                    </div>

                    {/* Mechanistic Interpretability */}
                    <div className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-orange-500/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                            <Brain className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Mechanistic Interpretability</h3>
                        <p className="text-gray-600">
                            Reverse engineering neural networks to understand the internal algorithms and representations that drive model behavior.
                        </p>
                    </div>

                    {/* Optimization and HPC */}
                    <div className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-orange-500/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                            <Cpu className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Optimization and HPC</h3>
                        <p className="text-gray-600">
                            Leveraging High Performance Computing for large-scale scientific simulations and optimizing algorithms for maximum efficiency.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
