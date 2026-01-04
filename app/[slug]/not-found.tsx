import Link from 'next/link';

/**
 * 404 page for non-existent markdown files
 */
export default function NotFound() {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Documento non trovato
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Il file che stai cercando non esiste o è stato rimosso.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Torna alla Homepage
        </Link>
      </div>
    </div>
  );
}

