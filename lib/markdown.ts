// ============================================
// UTILITY: Markdown Processing
// ============================================
// Functions for parsing and processing Markdown files
// Extracts titles, processes content

/**
 * Extracts the title from a Markdown file
 * Looks for the first #, ##, or ### heading
 * @param markdown - The markdown content string
 * @returns The extracted title or "Untitled" if no heading found
 */
export function extractTitle(markdown: string): string {
  // Match first heading (h1, h2, or h3)
  // Pattern: # followed by whitespace, then capture the text
  const match = markdown.match(/^#{1,3}\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

/**
 * Gets the font size value in rem units
 * Used for calculating relative sizes for headings and other elements
 * @param size - The font size key
 * @returns The rem value as a string
 */
export function getFontSizeValue(size: string): string {
  const sizeMap: Record<string, string> = {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
  };
  return sizeMap[size] || '1rem';
}

