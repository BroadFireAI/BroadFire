import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

interface TreatisePost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const treatisePosts: TreatisePost[] = [
  {
    slug: 'understanding-superposition',
    title: 'Understanding Superposition in Neural Networks',
    excerpt:
      'How do neural networks represent more features than they have dimensions? We explore the phenomenon of superposition and its implications for interpretability research.',
    date: '2025-01-15',
    readTime: '12 min',
    tags: ['Interpretability', 'Research'],
    featured: true,
  },
  {
    slug: 'julia-scientific-ml',
    title: 'Why We Use Julia for Scientific Machine Learning',
    excerpt:
      'An overview of our experience using Julia for high-performance scientific computing, including benchmarks and comparisons with Python and Rust.',
    date: '2025-01-08',
    readTime: '8 min',
    tags: ['Julia', 'Engineering'],
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const Treatises: React.FC = () => {
  const featuredPost = treatisePosts.find((p) => p.featured);
  const regularPosts = treatisePosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] mb-6">Treatises</h1>
        <p className="text-lg text-[#525252] max-w-2xl leading-relaxed">
          Technical deep-dives, research explorations, and scholarly discourse.
        </p>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Link
            to={`/treatises/${featuredPost.slug}`}
            className="block p-8 bg-[#FAFAFA] border border-[#E5E5E5] hover:border-blue-200 hover:shadow-lg transition-all group"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 mb-4">
              Featured
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#0A0A0A] mb-4 group-hover:text-blue-600 transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-[#525252] leading-relaxed mb-6">{featuredPost.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#525252]">
              <span>{formatDate(featuredPost.date)}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {featuredPost.readTime}
              </span>
              <div className="flex gap-2">
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-white rounded border border-[#E5E5E5]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Regular posts */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-1">
          {regularPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/treatises/${post.slug}`}
              className="block py-6 border-b border-[#E5E5E5] hover:bg-[#FAFAFA] -mx-4 px-4 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-[#0A0A0A] mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[#525252] text-sm leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#525252]">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#525252] group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Treatises;
