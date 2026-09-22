'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { hydrateIllustrations } from '@/lib/illustrations';
import { isReducedMotion, EASE } from '@/lib/motion';

export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isInitial = useRef(true);

  useEffect(() => {
    if (curtainRef.current) {
      hydrateIllustrations(curtainRef.current);
    }
  }, []);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (!curtainRef.current || isReducedMotion()) return;

    const curtain = curtainRef.current;
    const panels = curtain.querySelectorAll('.curtain__panel');

    // Wipe down reveal on route change
    gsap.timeline()
      .set(curtain, { display: 'block' })
      .fromTo(panels,
        { yPercent: 0 },
        { yPercent: -102, duration: 0.85, ease: EASE.silk || 'power4.out', stagger: 0.04 }
      )
      .set(curtain, { display: 'none' });
  }, [pathname]);

  return (
    <div ref={curtainRef} className="curtain" data-curtain aria-hidden="true" style={{ display: 'none' }}>
      <div className="curtain__panels">
        <div className="curtain__panel"></div>
        <div className="curtain__panel"></div>
        <div className="curtain__panel"></div>
        <div className="curtain__panel"></div>
        <div className="curtain__panel"></div>
      </div>
      <div className="curtain__mark" data-illo="colonnade"></div>
    </div>
  );
}
