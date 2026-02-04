import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] mb-6 mt-8 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold text-[#0A0A0A] mb-4 mt-8">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3 mt-6">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-lg font-semibold text-[#0A0A0A] mb-2 mt-4">{children}</h4>
        ),
        p: ({ children }) => <p className="text-[#525252] leading-relaxed mb-4">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-6 text-[#525252]">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-6 text-[#525252]">{children}</ol>
        ),
        li: ({ children }) => <li className="text-[#525252]">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-[#0A0A0A]">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-700 underline transition-colors"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-200 pl-4 my-6 text-[#525252] italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-[#F5F5F5] text-[#0A0A0A] px-1.5 py-0.5 text-sm font-mono">
                {children}
              </code>
            );
          }
          return <code className={className}>{children}</code>;
        },
        pre: ({ children }) => (
          <pre className="bg-[#0A0A0A] text-gray-100 p-4 overflow-x-auto mb-6 text-sm font-mono">
            {children}
          </pre>
        ),
        img: ({ src, alt }) => (
          <figure className="my-8">
            <img src={src} alt={alt || ''} className="w-full max-w-full h-auto shadow-md" />
            {alt && (
              <figcaption className="text-center text-sm text-[#525252] mt-2 italic">
                {alt}
              </figcaption>
            )}
          </figure>
        ),
        hr: () => <hr className="my-8 border-[#E5E5E5]" />,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-[#E5E5E5]">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-[#FAFAFA]">{children}</thead>,
        th: ({ children }) => (
          <th className="border border-[#E5E5E5] px-4 py-2 text-left font-semibold text-[#0A0A0A]">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-[#E5E5E5] px-4 py-2 text-[#525252]">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
