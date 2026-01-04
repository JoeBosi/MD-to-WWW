// ============================================
// PAGE: Homepage
// ============================================
// Displays list of all Markdown files
// Auto-updates with hot reload
// ============================================

import { FileList } from '@/components/FileList';

/**
 * Homepage component
 * Shows list of all Markdown files as clickable cards
 */
export default function HomePage() {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Documentazione
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Seleziona un documento per iniziare
          </p>
        </header>
        <FileList />
      </div>
    </div>
  );
}

