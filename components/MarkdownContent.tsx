'use client';

// ============================================
// LIBRERIA ESTERNA: react-markdown
// LIBRERIA ESTERNA: remark-gfm
// LIBRERIA ESTERNA: rehype-pretty-code
// LIBRERIA ESTERNA: remark-slug
// Installazione: npm install react-markdown remark-gfm@3.0.1 rehype-pretty-code remark-slug
// ============================================

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkSlug from 'remark-slug';
import { useFormat } from '@/contexts/FormatContext';
import { getFontSizeValue } from '@/lib/markdown';

interface MarkdownContentProps {
  content: string;
}

/**
 * MarkdownContent component
 * Renders Markdown content with syntax highlighting, tables, and formatting
 * Applies user preferences for font family and size
 */
export function MarkdownContent({ content }: MarkdownContentProps) {
  const { preferences } = useFormat();

  // Map font family to Tailwind classes
  const fontFamilyClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  };

  // Map font size to Tailwind classes
  const fontSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const baseClasses = `${fontFamilyClasses[preferences.fontFamily]} ${fontSizeClasses[preferences.fontSize]}`;
  const baseFontSize = getFontSizeValue(preferences.fontSize);

  return (
    <div className={`prose prose-invert max-w-none ${baseClasses}`}>
      <ReactMarkdown
        remarkPlugins={[remarkSlug, remarkGfm]}
        rehypePlugins={[
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: false, // Allows custom black background
            },
          ],
        ]}
        components={{
          // Headings with anchor links (from remark-slug)
          h1: ({ children, id, ...props }) => (
            <h1
              id={id}
              className="text-3xl font-bold mt-8 mb-4 scroll-mt-20"
              style={{
                fontSize: `calc(${baseFontSize} * 2.25)`,
                fontFamily: preferences.fontFamily === 'serif' ? 'serif' : preferences.fontFamily === 'mono' ? 'monospace' : 'sans-serif',
              }}
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, id, ...props }) => (
            <h2
              id={id}
              className="text-2xl font-semibold mt-6 mb-3 scroll-mt-20"
              style={{
                fontSize: `calc(${baseFontSize} * 1.875)`,
                fontFamily: preferences.fontFamily === 'serif' ? 'serif' : preferences.fontFamily === 'mono' ? 'monospace' : 'sans-serif',
              }}
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, id, ...props }) => (
            <h3
              id={id}
              className="text-xl font-semibold mt-4 mb-2 scroll-mt-20"
              style={{
                fontSize: `calc(${baseFontSize} * 1.5)`,
                fontFamily: preferences.fontFamily === 'serif' ? 'serif' : preferences.fontFamily === 'mono' ? 'monospace' : 'sans-serif',
              }}
              {...props}
            >
              {children}
            </h3>
          ),
          // Paragraphs use base size
          p: ({ children, ...props }) => (
            <p className={`mb-4 ${baseClasses}`} {...props}>
              {children}
            </p>
          ),
          // Lists use base size
          ul: ({ children, ...props }) => (
            <ul className={`list-disc list-inside mb-4 space-y-2 ${baseClasses}`} {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className={`list-decimal list-inside mb-4 space-y-2 ${baseClasses}`} {...props}>
              {children}
            </ol>
          ),
          // Code blocks: black background, white text, monospace
          pre: ({ children, ...props }) => (
            <pre
              className="bg-black text-white p-4 rounded-lg overflow-x-auto my-4 font-mono"
              style={{
                fontSize: `calc(${baseFontSize} * 0.875)`,
              }}
              {...props}
            >
              {children}
            </pre>
          ),
          // Inline code: black background, white text
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return (
              <code
                className={
                  isInline
                    ? 'bg-black text-white px-1.5 py-0.5 rounded text-sm font-mono'
                    : className
                }
                style={
                  isInline
                    ? {
                        fontSize: `calc(${baseFontSize} * 0.875)`,
                      }
                    : undefined
                }
                {...props}
              >
                {children}
              </code>
            );
          },
          // Tables: professional compact styling
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table
                className="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody {...props}>{children}</tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              {...props}
            >
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th
              className={`px-4 py-2.5 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider ${baseClasses}`}
              style={{
                fontSize: `calc(${baseFontSize} * 0.75)`,
              }}
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className={`px-4 py-2.5 ${baseClasses}`}
              style={{
                fontSize: `calc(${baseFontSize} * 0.875)`,
              }}
              {...props}
            >
              {children}
            </td>
          ),
          // Links
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
          // Blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4"
              {...props}
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

