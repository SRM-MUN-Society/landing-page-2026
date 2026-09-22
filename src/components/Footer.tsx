'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { hydrateIllustrations } from '@/lib/illustrations';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      hydrateIllustrations(footerRef.current);
    }
  }, []);

  return (
    <footer ref={footerRef} className="footer is-invert">
      <div className="shell shell--wide">
        <div className="footer__grid">
          <div>
            <div style={{ width: '8rem', color: 'var(--g-300)', marginBottom: '1.25rem' }} data-illo="colonnade" aria-hidden="true"></div>
            <p className="display" style={{ fontSize: 'var(--t-2xl)', color: '#fff' }}>SRM MUN 2026</p>
            <p className="mono" style={{ color: 'var(--g-400)', marginTop: '.5rem' }}>14TH EDITION &middot; BE A PART OF THE LEGACY</p>
          </div>

          <div>
            <p className="footer__h">Conference</p>
            <div className="footer__links">
              <Link href="/">Home</Link>
              <Link href="/committees">Committees</Link>
              <Link href="/schedule">Schedule</Link>
              <Link href="/register">Register</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <p className="footer__h">Society</p>
            <div className="footer__links">
              <a href="https://www.instagram.com/srm_munsoc/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/company/srm-mun-society/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://x.com/srm_munsoc" target="_blank" rel="noopener noreferrer">X</a>
              <a href="https://www.facebook.com/SRMMUNSOC" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>

          <div>
            <p className="footer__h">Reach us</p>
            <div className="footer__links">
              <a href="mailto:delegateaffairs.srmmun@gmail.com">delegateaffairs.srmmun@gmail.com</a>
            </div>
            <p className="footer__h" style={{ marginTop: '2rem' }}>Dates</p>
            <p className="mono" style={{ color: 'rgba(226,240,228,.7)' }}>30 &middot; 31 OCT<br />01 NOV 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
