'use client';

// ============================================
// CLIENT COMPONENT: Layout Client Wrapper
// ============================================
// Client-side wrapper for layout with mobile menu state
// ============================================

import { useState } from 'react';
import { FormatProvider } from '@/contexts/FormatContext';
import { Sidebar } from '@/components/Sidebar';
import { FormatPanel } from '@/components/FormatPanel';
import { MobileMenu } from '@/components/MobileMenu';

interface LayoutClientProps {
  children: React.ReactNode;
}

/**
 * LayoutClient component
 * Handles client-side state for mobile menu
 */
export function LayoutClient({ children }: LayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <FormatProvider>
      <div className="flex min-h-screen">
        {/* Sidebar - Fixed on left */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content Area - Offset for sidebar */}
        <main className="flex-1 md:ml-64 min-h-screen">
          {/* Mobile Hamburger Menu Button */}
          <MobileMenu isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          {children}
        </main>
      </div>
      
      {/* Format Panel - Floating top-right */}
      <FormatPanel />
    </FormatProvider>
  );
}

