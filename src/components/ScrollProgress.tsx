'use client';

import React, { useEffect } from 'react';
import { initProgress } from '@/lib/motion';

export default function ScrollProgress() {
  useEffect(() => {
    initProgress();
  }, []);

  return <div className="progress" data-scroll-progress aria-hidden="true" />;
}
