'use client';

// ============================================
// COMPONENT: Format Panel
// ============================================
// Floating UI panel for text formatting options
// Allows users to change font family and size
// Preferences saved to localStorage
// ============================================

import { useFormat } from '@/contexts/FormatContext';
import { useState } from 'react';
import type { FontFamily, FontSize } from '@/lib/types';

/**
 * FormatPanel component
 * Floating panel in top-right corner for formatting options
 * Collapsible, responsive, with dark mode support
 */
export function FormatPanel() {
  const { preferences, updateFontFamily, updateFontSize, resetPreferences } = useFormat();
  const [isOpen, setIsOpen] = useState(false);

  const fontOptions: Array<{ value: FontFamily; label: string; class: string }> = [
    { value: 'sans', label: 'Sans Serif', class: 'font-sans' },
    { value: 'serif', label: 'Serif', class: 'font-serif' },
    { value: 'mono', label: 'Monospace', class: 'font-mono' },
  ];

  const sizeOptions: Array<{ value: FontSize; label: string; class: string }> = [
    { value: 'xs', label: 'Extra Small', class: 'text-xs' },
    { value: 'sm', label: 'Small', class: 'text-sm' },
    { value: 'base', label: 'Normal', class: 'text-base' },
    { value: 'lg', label: 'Large', class: 'text-lg' },
    { value: 'xl', label: 'Extra Large', class: 'text-xl' },
    { value: '2xl', label: '2X Large', class: 'text-2xl' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2"
        aria-label="Format settings"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <span className="hidden sm:inline">Formattazione</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Panel Content */}
          <div className="absolute top-14 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Formattazione Testo
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Font Family */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Carattere
              </label>
              <div className="space-y-2">
                {fontOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFontFamily(option.value)}
                    className={`w-full text-left px-4 py-2 rounded-md border transition-colors ${
                      preferences.fontFamily === option.value
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className={option.class}>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dimensione
              </label>
              <div className="space-y-2">
                {sizeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFontSize(option.value)}
                    className={`w-full text-left px-4 py-2 rounded-md border transition-colors ${
                      preferences.fontSize === option.value
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className={option.class}>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetPreferences}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reset Predefiniti
            </button>
          </div>
        </>
      )}
    </div>
  );
}

