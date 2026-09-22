'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { initMobileNav } from '@/lib/app-init';

export default function MobileNav() {
  useEffect(() => {
    const cleanup = initMobileNav();
    return cleanup;
  }, []);

  return (
    <div className="mnav" id="mnav" aria-hidden="true">
      <nav aria-label="Mobile">
        <ul className="mnav__list">
          <li className="mnav__item">
            <Link className="mnav__link" href="/">
              <span className="mnav__num">01</span>Home
            </Link>
          </li>
          <li className="mnav__item">
            <Link className="mnav__link" href="/committees">
              <span className="mnav__num">02</span>Committees
            </Link>
          </li>
          <li className="mnav__item">
            <Link className="mnav__link" href="/schedule">
              <span className="mnav__num">03</span>Schedule
            </Link>
          </li>
          <li className="mnav__item">
            <Link className="mnav__link" href="/contact">
              <span className="mnav__num">04</span>Contact
            </Link>
          </li>
        </ul>
        <div className="mnav__foot">
          <a className="link" href="mailto:delegateaffairs.srmmun@gmail.com">delegateaffairs.srmmun@gmail.com</a>
          <span className="mono">30, 31 OCT · 1 NOV 2026 · KATTANKULATHUR</span>
        </div>
      </nav>
    </div>
  );
}
