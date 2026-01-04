// ============================================
// API ROUTE: Markdown File Content
// ============================================
// GET /api/markdown/[slug]
// Returns content of specific Markdown file
// ============================================

import { NextResponse } from 'next/server';
import { readMarkdownFile } from '@/lib/fileSystem';

interface RouteParams {
  params: {
    slug: string;
  };
}

/**
 * GET handler for markdown file content
 * @param request - Next.js request object
 * @param context - Route context with params
 * @returns MarkdownContent object or 404
 */
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = params;
    const content = await readMarkdownFile(slug);

    if (!content) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return NextResponse.json(
      { error: 'Failed to read markdown file' },
      { status: 500 }
    );
  }
}

