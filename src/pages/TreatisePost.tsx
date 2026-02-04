import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';

// Content for treatises
const treatiseContent: Record<
  string,
  {
    title: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
  }
> = {
  'understanding-superposition': {
    title: 'Understanding Superposition in Neural Networks',
    date: '2025-01-15',
    readTime: '12 min',
    tags: ['Interpretability', 'Research'],
    content: `One of the most fascinating discoveries in mechanistic interpretability is the phenomenon of **superposition** - the ability of neural networks to represent more features than they have dimensions.

## What is Superposition?

In a simple world, we might expect neural networks to dedicate one neuron to each concept they need to represent. A "cat neuron" would fire when the network sees a cat, a "dog neuron" for dogs, and so on.

But real neural networks are far more efficient. They use a technique called superposition to pack many more features into their representations than you might expect from their dimensionality alone.

## Why Does Superposition Happen?

The key insight is that most features in the world are **sparse** - they don't co-occur frequently. If "cat" and "skyscraper" rarely appear in the same context, the network can use overlapping representations for both without much interference.

This is analogous to compressed sensing in signal processing, where sparse signals can be recovered from fewer measurements than traditional sampling theory would suggest.

## Implications for Interpretability

Superposition makes interpretability research both harder and more interesting:

1. **Features aren't neurons**: We can't simply look at individual neurons to understand what a network has learned
2. **Dictionary learning**: We need methods like sparse autoencoders to extract the true features
3. **Interference**: Sometimes features interfere with each other, leading to errors

## Current Research Directions

Our team is working on several approaches to understand and work with superposition:

- Developing better methods for identifying superposed features
- Understanding when and why networks choose to use superposition
- Building architectures that are easier to interpret despite superposition

## Conclusion

Superposition is a fundamental aspect of how neural networks represent information. Understanding it is crucial for building interpretable and safe AI systems.

---

*This post is part of our series on mechanistic interpretability. Stay tuned for more deep dives into how neural networks work.*`,
  },
  'julia-scientific-ml': {
    title: 'Why We Use Julia for Scientific Machine Learning',
    date: '2025-01-08',
    readTime: '8 min',
    tags: ['Julia', 'Engineering'],
    content: `At BroadFire, we've made Julia a core part of our technical stack for scientific machine learning. Here's why.

## The Two-Language Problem

Traditional scientific computing often suffers from the "two-language problem": you prototype in Python for its ease of use, then rewrite performance-critical code in C++ or Fortran.

Julia solves this by being both easy to write and fast to execute. The same code you write for prototyping can run at near-C speeds.

## Differentiable Programming

Julia's ecosystem excels at differentiable programming - the ability to automatically compute gradients through arbitrary code. This is crucial for:

- Physics-informed neural networks
- Differentiable simulation
- End-to-end optimization of complex systems

Libraries like Zygote.jl and Enzyme.jl make this seamless.

## Our Experience

We've used Julia for:

- **MedEye3d.jl**: GPU-accelerated medical imaging visualization
- **SciMLOperators.jl**: High-performance linear operators
- **HepMC3.jl**: Interfacing with CERN's particle physics libraries

The performance gains have been substantial, often 10-100x faster than equivalent Python code.

## Trade-offs

Julia isn't perfect:

- Smaller ecosystem than Python
- First-run compilation time (though this is improving)
- Fewer ML practitioners are familiar with it

But for our use cases in scientific ML, the benefits outweigh these costs.

## Conclusion

If you're working on scientific machine learning, especially problems involving differential equations, simulations, or custom numerical methods, Julia deserves serious consideration.

---

*Interested in contributing to our Julia projects? Check out our open-source work on GitHub.*`,
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const TreatisePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? treatiseContent[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-2xl font-semibold text-[#0A0A0A] mb-4">Post not found</h1>
          <p className="text-[#525252] mb-8">The treatise you're looking for doesn't exist.</p>
          <Link
            to="/treatises"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Treatises
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Back link */}
        <Link
          to="/treatises"
          className="inline-flex items-center gap-2 text-[#525252] hover:text-[#0A0A0A] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Treatises
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#525252] pb-6 border-b border-[#E5E5E5]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </span>
            <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="prose-custom">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
};

export default TreatisePost;
