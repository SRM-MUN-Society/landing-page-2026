'use client';

import React, { useEffect, useRef } from 'react';
import { initBackdrop } from '@/lib/backdrop';

export default function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const cleanup = initBackdrop(ref.current);
      return cleanup;
    }
  }, []);

  return <div ref={ref} className="bd" data-backdrop aria-hidden="true" />;
}
