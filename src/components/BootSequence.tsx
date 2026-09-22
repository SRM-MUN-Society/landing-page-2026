'use client';

import React, { useEffect, useRef, useState } from 'react';
import { runBootSequence } from '@/lib/boot';
import { hydrateIllustrations } from '@/lib/illustrations';

export default function BootSequence() {
  const bootRef = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (bootRef.current) {
      hydrateIllustrations(bootRef.current);
      const cleanup = runBootSequence(bootRef.current, () => {
        setBooted(true);
      });
      return cleanup;
    }
  }, []);

  if (booted) return null;

  return (
    <div ref={bootRef} className="boot" role="status" aria-live="polite" aria-label="Loading SRM MUN 2026">
      <span className="boot__scan"  aria-hidden="true" />
      <span className="boot__vig"   aria-hidden="true" />
      <span className="boot__glow"  aria-hidden="true" />

      <div className="boot__stage">
        {/* 1 — studio ident */}
        <div className="boot__slot">
          <div className="boot__ident">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/opt/MUNSOC-logo-white.png" alt="SRM MUN Society" />
            <span className="boot__ident-rule" />
            <p className="boot__ident-sub">SRM Institute of Science and Technology · Kattankulathur</p>
          </div>
        </div>
        {/* 2 — colonnade mark */}
        <div className="boot__slot">
          <div className="boot__mark" data-illo="colonnade" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
