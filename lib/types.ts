// Type definitions for the application

export type FontFamily = 'sans' | 'serif' | 'mono';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export interface FormatPreferences {
  fontFamily: FontFamily;
  fontSize: FontSize;
}

export interface MarkdownFile {
  slug: string;
  title: string;
  filename: string;
  lastModified?: string;
}

export interface MarkdownContent {
  content: string;
  title: string;
  slug: string;
}

