// ============================================
// MODULO NATIVO Node.js: fs (File System)
// MODULO NATIVO Node.js: path (Path Utilities)
// LIBRERIA ESTERNA: fs-extra
// LIBRERIA ESTERNA: glob
// Installazione: npm install fs-extra glob
// ============================================
// Prerequisiti:
// 1. npm init -y (se nuovo progetto)
// 2. npm install fs-extra glob
// 3. npm install -D @types/fs-extra
// ============================================

import fs from 'fs-extra';
import path from 'path';
import type { MarkdownFile, MarkdownContent } from './types';
import { extractTitle } from './markdown';

// Path to the MD_Contents folder (relative to project root)
const MD_CONTENTS_PATH = path.join(process.cwd(), 'MD_Contents');

/**
 * Gets the path to the MD_Contents directory
 * Can be overridden with environment variable
 */
export function getMDContentsPath(): string {
  return process.env.MD_CONTENTS_PATH || MD_CONTENTS_PATH;
}

/**
 * Reads all Markdown files from MD_Contents directory
 * Returns metadata for each file (slug, title, filename)
 * @returns Array of MarkdownFile objects
 */
export async function readMarkdownFiles(): Promise<MarkdownFile[]> {
  const mdPath = getMDContentsPath();
  
  // Check if directory exists
  if (!(await fs.pathExists(mdPath))) {
    // Create directory if it doesn't exist
    await fs.ensureDir(mdPath);
    return [];
  }

  try {
    // Read directory and filter .md files (more reliable than glob on Windows)
    const allFiles = await fs.readdir(mdPath);
    const mdFiles = allFiles.filter((file) => file.endsWith('.md'));
    
    // Build full paths
    const files = mdFiles.map((filename) => path.join(mdPath, filename));

    // Process each file to extract metadata
    const filePromises = files.map(async (filePath) => {
      const filename = path.basename(filePath);
      const slug = filename.replace(/\.md$/, '');
      
      try {
        // Read file content to extract title
        const content = await fs.readFile(filePath, 'utf-8');
        const title = extractTitle(content);
        
        // Get file stats for last modified date
        const stats = await fs.stat(filePath);
        
        return {
          slug,
          title,
          filename,
          lastModified: stats.mtime.toISOString(),
        };
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        // Return file with error title
        return {
          slug,
          title: 'Error reading file',
          filename,
        };
      }
    });

    const markdownFiles = await Promise.all(filePromises);
    
    // Sort by filename alphabetically
    return markdownFiles.sort((a, b) => a.filename.localeCompare(b.filename));
  } catch (error) {
    console.error('Error reading markdown files:', error);
    return [];
  }
}

/**
 * Reads a specific Markdown file by slug
 * @param slug - The file slug (filename without .md extension)
 * @returns MarkdownContent object with content and metadata
 */
export async function readMarkdownFile(slug: string): Promise<MarkdownContent | null> {
  const mdPath = getMDContentsPath();
  
  // Sanitize slug to prevent path traversal attacks
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
  const filePath = path.join(mdPath, `${sanitizedSlug}.md`);

  try {
    // Check if file exists
    if (!(await fs.pathExists(filePath))) {
      return null;
    }

    // Read file content
    const content = await fs.readFile(filePath, 'utf-8');
    const title = extractTitle(content);

    return {
      content,
      title,
      slug: sanitizedSlug,
    };
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
}

/**
 * Checks if a markdown file exists
 * @param slug - The file slug
 * @returns true if file exists, false otherwise
 */
export async function markdownFileExists(slug: string): Promise<boolean> {
  const mdPath = getMDContentsPath();
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
  const filePath = path.join(mdPath, `${sanitizedSlug}.md`);
  return fs.pathExists(filePath);
}

