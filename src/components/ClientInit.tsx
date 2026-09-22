'use client';

import { useEffect } from 'react';
import { bootMotion } from '@/lib/motion';

export default function ClientInit() {
  useEffect(() => {
    bootMotion();
  }, []);

  return null;
}
