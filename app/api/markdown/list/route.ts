// ============================================
// API ROUTE: Markdown File List
// ============================================
// GET /api/markdown/list
// Returns list of all Markdown files with metadata
// ============================================

import { NextResponse } from 'next/server';
import { readMarkdownFiles } from '@/lib/fileSystem';

/**
 * GET handler for markdown file list
 * Returns array of MarkdownFile objects
 */
export async function GET() {
  try {
    const files = await readMarkdownFiles();
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error reading markdown files:', error);
    return NextResponse.json(
      { error: 'Failed to read markdown files' },
      { status: 500 }
    );
  }
}

