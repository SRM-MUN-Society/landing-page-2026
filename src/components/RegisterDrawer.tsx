'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { initDrawer } from '@/lib/app-init';

export default function RegisterDrawer() {
  useEffect(() => {
    initDrawer();
  }, []);

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label="Register for SRM MUN 2026" aria-hidden="true">
      <div className="drawer__scrim"></div>
      <div className="drawer__panel">
        <div className="drawer__head">
          <button className="drawer__close" data-close-drawer type="button" aria-label="Close">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="drawer__avatar">
            <img src="/img/opt/srm-mun-society-pfp.png" alt="" />
          </div>
          <h2 className="display" style={{ fontSize: 'var(--t-2xl)', lineHeight: 1.1 }}>SRM MUN 2026</h2>
          <a className="drawer__handle" href="https://www.instagram.com/srm_munsoc/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 16 16" fill="none">
              <rect x="2.5" y="2.5" width="11" height="11" rx="3.4" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8" cy="8" r="2.7" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="11.4" cy="4.6" r=".85" fill="currentColor"/>
            </svg>
            @srm_munsoc
          </a>
          <p className="mono" style={{ color: 'var(--ink-mute)', marginTop: '.7rem' }}>
            14TH EDITION &middot; 30, 31 OCT &middot; 1 NOV 2026
          </p>
          <p className="body-sm" style={{ marginTop: '.6rem' }}>Everything you need, in one place.</p>
        </div>

        <div className="drawer__body">
          <Link className="tile tile--primary" href="/register" data-close-drawer>
            <span className="tile__ico">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M9.5 2v3.5H13M5.5 9h5M5.5 11.5h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </span>
            <span>
              <span className="tile__t">
                Registration Form <span className="chip chip--brass" style={{ marginLeft: '.35rem' }}>Opens soon</span>
              </span>
              <span className="tile__d">Secure your seat at the 14th Edition.</span>
            </span>
            <span className="tile__go">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>

          <a className="tile" href="https://chat.whatsapp.com/E3QCqwsKrSCD4YIV9SnUNZ" target="_blank" rel="noopener noreferrer">
            <span className="tile__ico">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2.5 13.5l1-3.2A5.6 5.6 0 1 1 5.8 12.5l-3.3 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>
              <span className="tile__t">WhatsApp Community</span>
              <span className="tile__d">Announcements, allotments and reminders, first.</span>
            </span>
            <span className="tile__go">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8H13M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          <a className="tile" href="https://instagram.com/srm_munsoc" target="_blank" rel="noopener noreferrer">
            <span className="tile__ico">
              <svg viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="2.5" width="11" height="11" rx="3.4" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="8" cy="8" r="2.7" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="11.4" cy="4.6" r=".85" fill="currentColor"/>
              </svg>
            </span>
            <span>
              <span className="tile__t">Instagram</span>
              <span className="tile__d">The conference as it happens. @srm_munsoc</span>
            </span>
            <span className="tile__go">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          <a className="tile" href="https://www.linkedin.com/company/srm-mun-society/" target="_blank" rel="noopener noreferrer">
            <span className="tile__ico">
              <svg viewBox="0 0 16 16" fill="none">
                <rect x="2.5" y="2.5" width="11" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5.2 6.8v4M5.2 4.9v.05M8 10.8V6.8M8 8.4c0-1.7 2.8-1.7 2.8 0v2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </span>
            <span>
              <span className="tile__t">LinkedIn</span>
              <span className="tile__d">Institutional updates and partnership enquiries.</span>
            </span>
            <span className="tile__go">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>

          <a className="tile" href="mailto:delegateaffairs.srmmun@gmail.com">
            <span className="tile__ico">
              <svg viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3.5" width="12" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M2.6 4.5 8 8.6l5.4-4.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </span>
            <span>
              <span className="tile__t">Email the Secretariat</span>
              <span className="tile__d">A question the form does not answer.</span>
            </span>
            <span className="tile__go">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8H13M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>

        <p className="drawer__foot">
          Links marked as opening soon will activate when the Secretariat announces the registration window.
        </p>
      </div>
    </div>
  );
}
