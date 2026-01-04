'use client';

// ============================================
// COMPONENT: Mobile Menu Button
// ============================================
// Hamburger menu button for mobile devices
// ============================================

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * MobileMenu component
 * Hamburger button for toggling sidebar on mobile
 */
export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg"
      aria-label="Toggle sidebar"
    >
      <svg
        className="w-6 h-6 text-gray-900 dark:text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}

