// ============================================
// LAYOUT: Root Layout
// ============================================
// Main layout with sidebar, format provider, and global styles
// ============================================

import type { Metadata } from 'next';
import { LayoutClient } from './LayoutClient';
import './globals.css';

export const metadata: Metadata = {
  title: 'MD to WWW - Markdown Documentation',
  description: 'General purpose Markdown to Website converter',
  authors: [{ name: 'Giuseppe Bosi' }],
};

/**
 * Root layout component
 * Provides format context, sidebar, and format panel to all pages
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

