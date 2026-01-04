'use client';

// ============================================
// COMPONENT: Sidebar Navigation
// ============================================
// Fixed left sidebar with list of all Markdown files
// Updates automatically with hot reload
// Responsive: hidden on mobile, hamburger menu
// ============================================

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MarkdownFile } from '@/lib/types';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Sidebar component
 * Fixed left navigation showing all Markdown files
 * Auto-updates every 2-3 seconds (hot reload)
 */
export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

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

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Documenti
            </h2>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* File List */}
          <nav className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                Caricamento...
              </div>
            ) : files.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p className="mb-2">Nessun file trovato</p>
                <p className="text-sm">Aggiungi file .md in MD_Contents/</p>
              </div>
            ) : (
              <ul className="space-y-1">
                {files.map((file) => {
                  const isActive = pathname === `/${file.slug}`;
                  return (
                    <li key={file.slug}>
                      <Link
                        href={`/${file.slug}`}
                        onClick={onClose}
                        className={`
                          block px-3 py-2 rounded-md text-sm transition-colors
                          ${
                            isActive
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }
                        `}
                      >
                        {file.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
            {files.length} {files.length === 1 ? 'file' : 'file'}
          </div>
        </div>
      </aside>
    </>
  );
}

