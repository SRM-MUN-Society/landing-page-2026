'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { hydrateIllustrations } from '@/lib/illustrations';
import { initHeader, initHeaderContrast, initMagnetic } from '@/lib/motion';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (headerRef.current) {
      hydrateIllustrations(headerRef.current);
      initHeader();
      initHeaderContrast();
      initMagnetic(headerRef.current);
    }
  }, []);

  return (
    <header ref={headerRef} className="header" data-header>
      <div className="shell shell--wide">
        <div className="header__bar">
          <Link href="/" className="brand" aria-label="SRM MUN 2026 — home">
            <span className="brand__mark" data-illo="colonnade" aria-hidden="true"></span>
            <span className="brand__txt">
              <span className="brand__name">SRMMUN</span>
              <span className="brand__sub">14th Edition · 2026</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              <li>
                <Link
                  className="nav__link"
                  data-nav-link
                  href="/"
                  aria-current={pathname === '/' ? 'page' : undefined}
                >
                  <i>Home</i><i>Home</i>
                </Link>
              </li>
              <li>
                <Link
                  className="nav__link"
                  data-nav-link
                  href="/committees"
                  aria-current={pathname === '/committees' ? 'page' : undefined}
                >
                  <i>Committees</i><i>Committees</i>
                </Link>
              </li>
              <li>
                <Link
                  className="nav__link"
                  data-nav-link
                  href="/schedule"
                  aria-current={pathname === '/schedule' ? 'page' : undefined}
                >
                  <i>Schedule</i><i>Schedule</i>
                </Link>
              </li>
              <li>
                <Link
                  className="nav__link"
                  data-nav-link
                  href="/contact"
                  aria-current={pathname === '/contact' ? 'page' : undefined}
                >
                  <i>Contact</i><i>Contact</i>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header__actions">
            <button className="reg-btn" data-open-drawer data-magnetic="0.22" type="button" aria-haspopup="dialog">
              <span className="reg-btn__ring" aria-hidden="true"></span>
              <span data-magnetic-inner>Register Now</span>
              <span className="reg-btn__dot" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button className="menu-btn" data-menu-toggle type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
