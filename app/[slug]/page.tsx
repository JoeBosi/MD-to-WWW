// ============================================
// PAGE: Dynamic Markdown Page
// ============================================
// Displays content of a specific Markdown file
// Handles 404 if file doesn't exist
// ============================================

import { notFound } from 'next/navigation';
import { MarkdownContent } from '@/components/MarkdownContent';
import { readMarkdownFile } from '@/lib/fileSystem';

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Dynamic page for Markdown files
 * Fetches content from API and renders with MarkdownContent component
 */
export default async function MarkdownPage({ params }: PageProps) {
  // In Next.js 15, params must be awaited
  const { slug } = await params;

  try {
    // Read markdown file directly from file system (more reliable than API fetch)
    const data = await readMarkdownFile(slug);

    if (!data) {
      notFound();
    }

    return (
      <div className="p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {data.title}
            </h1>
          </header>
          <article>
            <MarkdownContent content={data.content} />
          </article>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading markdown page:', error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  // In Next.js 15, params must be awaited
  const { slug } = await params;

  try {
    const data = await readMarkdownFile(slug);
    
    if (data) {
      return {
        title: `${data.title} - MD to WWW`,
        description: `Documentation: ${data.title}`,
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Document Not Found - MD to WWW',
  };
}

