'use client';

// ============================================
// COMPONENT: File List (Homepage)
// ============================================
// Displays all Markdown files as clickable cards
// Updates automatically with hot reload
// ============================================

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { MarkdownFile } from '@/lib/types';

/**
 * FileList component
 * Homepage component showing all Markdown files as cards
 * Auto-updates every 2-3 seconds (hot reload)
 */
export function FileList() {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch file list and poll for updates (hot reload)
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/markdown/list');
        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchFiles();

    // Poll every 2 seconds for hot reload
    const interval = setInterval(fetchFiles, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Caricamento file...</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Nessun file trovato
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Aggiungi file .md nella cartella MD_Contents/
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {files.map((file) => (
        <Link
          key={file.slug}
          href={`/${file.slug}`}
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {file.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {file.filename}
              </p>
              {file.lastModified && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {new Date(file.lastModified).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
            <svg
              className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}

