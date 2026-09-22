'use client';

import { useEffect } from 'react';

export default function DarkPageWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force header to dark mode
    const header = document.querySelector('[data-header]');
    if (header) {
      header.classList.add('on-dark');
    }

    // Cleanup on unmount
    return () => {
      const header = document.querySelector('[data-header]');
      if (header) {
        header.classList.remove('on-dark');
      }
    };
  }, []);

  return <>{children}</>;
}
