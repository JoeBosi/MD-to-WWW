// ============================================
// LIBRERIA ESTERNA: chokidar
// Installazione: npm install chokidar
// ============================================
// Prerequisiti:
// 1. npm install chokidar
// 2. Usato per watch file system changes
// ============================================

import chokidar from 'chokidar';
import path from 'path';

// Path to the MD_Contents folder
const MD_CONTENTS_PATH = path.join(process.cwd(), 'MD_Contents');

/**
 * Sets up a file watcher for the MD_Contents directory
 * Watches for file changes, additions, and deletions
 * @param callback - Function to call when files change
 * @returns The chokidar watcher instance
 */
export function watchMarkdownFiles(callback: () => void): chokidar.FSWatcher {
  const watcher = chokidar.watch(path.join(MD_CONTENTS_PATH, '**/*.md'), {
    ignored: /(^|[\/\\])\../, // Ignore dotfiles
    persistent: true,
    ignoreInitial: true, // Don't fire on initial scan
  });

  // Watch for file changes
  watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`);
    callback();
  });

  // Watch for new files
  watcher.on('add', (filePath) => {
    console.log(`File added: ${filePath}`);
    callback();
  });

  // Watch for file deletions
  watcher.on('unlink', (filePath) => {
    console.log(`File deleted: ${filePath}`);
    callback();
  });

  // Handle errors
  watcher.on('error', (error) => {
    console.error('Watcher error:', error);
  });

  return watcher;
}

