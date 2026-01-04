'use client';

// ============================================
// REACT CONTEXT: Format Preferences
// ============================================
// Manages global formatting preferences (font family, font size)
// Persists preferences to localStorage
// Provides update functions for components
// ============================================

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { FormatPreferences, FontFamily, FontSize } from '@/lib/types';

interface FormatContextType {
  preferences: FormatPreferences;
  updateFontFamily: (font: FontFamily) => void;
  updateFontSize: (size: FontSize) => void;
  resetPreferences: () => void;
}

const FormatContext = createContext<FormatContextType | undefined>(undefined);

// Default preferences
const defaultPreferences: FormatPreferences = {
  fontFamily: 'sans',
  fontSize: 'base',
};

const STORAGE_KEY = 'markdown-format-preferences';

/**
 * FormatProvider component
 * Provides format preferences context to all children
 * Loads preferences from localStorage on mount
 * Saves preferences to localStorage when they change
 */
export function FormatProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<FormatPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate parsed preferences
        if (
          parsed &&
          typeof parsed === 'object' &&
          ['sans', 'serif', 'mono'].includes(parsed.fontFamily) &&
          ['xs', 'sm', 'base', 'lg', 'xl', '2xl'].includes(parsed.fontSize)
        ) {
          setPreferences(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading format preferences:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save preferences to localStorage when they change (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      } catch (error) {
        console.error('Error saving format preferences:', error);
      }
    }
  }, [preferences, isLoaded]);

  const updateFontFamily = (font: FontFamily) => {
    setPreferences((prev) => ({ ...prev, fontFamily: font }));
  };

  const updateFontSize = (size: FontSize) => {
    setPreferences((prev) => ({ ...prev, fontSize: size }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <FormatContext.Provider
      value={{
        preferences,
        updateFontFamily,
        updateFontSize,
        resetPreferences,
      }}
    >
      {children}
    </FormatContext.Provider>
  );
}

/**
 * Hook to use format context
 * Must be used within FormatProvider
 * @throws Error if used outside FormatProvider
 */
export function useFormat() {
  const context = useContext(FormatContext);
  if (!context) {
    throw new Error('useFormat must be used within FormatProvider');
  }
  return context;
}

