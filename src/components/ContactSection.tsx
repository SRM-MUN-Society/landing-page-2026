'use client';

import React, { useEffect, useRef } from 'react';
import { hydrateIllustrations } from '@/lib/illustrations';
import { initMagnetic } from '@/lib/motion';

export default function ContactSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    hydrateIllustrations(rootRef.current);
    initMagnetic(rootRef.current);
  }, []);

  return (
    <div ref={rootRef} className="contact-page" style={{ paddingTop: '140px', paddingBottom: '4rem', minHeight: '100vh' }}>
      <div className="shell">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="eyebrow" style={{ color: 'var(--g-400)', marginBottom: '1rem' }}>Get in Touch</p>
            <h1 className="display display--lg" style={{ color: '#fff', marginBottom: '1.5rem' }}>
              Contact Us
            </h1>
            <p className="lede" style={{ color: 'var(--g-200)', maxWidth: '600px', margin: '0 auto' }}>
              Reach out to the Secretariat of SRM MUN 2026. We're here to help with any questions about 
              registration, committees, or the conference.
            </p>
          </div>

          {/* Secretariat Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {/* Secretary General */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 300ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.4)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.4rem 1rem',
                  background: 'linear-gradient(135deg, #c5a880 0%, #a48256 100%)',
                  color: '#0a0a0a',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '999px',
                  marginBottom: '1rem',
                }}>
                  Secretary General
                </span>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: '#fff',
                  marginBottom: '0.5rem'
                }}>
                  Meeraja S
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a 
                  href="tel:+919500072995"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--g-200)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c5a880'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--g-200)'}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 9500072995
                </a>
              </div>
            </div>

            {/* Deputy Secretary General */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 300ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.4)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.4rem 1rem',
                  background: 'linear-gradient(135deg, #c5a880 0%, #a48256 100%)',
                  color: '#0a0a0a',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '999px',
                  marginBottom: '1rem',
                }}>
                  Deputy Secretary General
                </span>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: '#fff',
                  marginBottom: '0.5rem'
                }}>
                  Sahana Parameswaran
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a 
                  href="tel:+917338702651"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--g-200)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c5a880'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--g-200)'}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 7338702651
                </a>
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '2.5rem',
            backdropFilter: 'blur(10px)',
            marginBottom: '3rem',
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: '#fff',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Email Us
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}>
              {/* Delegation Email */}
              <div>
                <h3 style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#c5a880',
                  marginBottom: '0.75rem',
                }}>
                  For Delegation Matters
                </h3>
                <a 
                  href="mailto:delegateaffairs.srmmun@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--g-200)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 200ms ease',
                    wordBreak: 'break-word',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c5a880'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--g-200)'}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  delegateaffairs.srmmun@gmail.com
                </a>
              </div>

              {/* General Email */}
              <div>
                <h3 style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#c5a880',
                  marginBottom: '0.75rem',
                }}>
                  For General Inquiries
                </h3>
                <a 
                  href="mailto:srmmunsociety26@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--g-200)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 200ms ease',
                    wordBreak: 'break-word',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c5a880'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--g-200)'}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  srmmunsociety26@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media / Additional Info */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--g-300)', marginBottom: '1rem' }}>
              Follow us for updates and announcements
            </p>
            <a 
              href="https://www.instagram.com/srm_munsoc/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn--light"
              data-magnetic="0.2"
            >
              <span data-magnetic-inner>@srm_munsoc</span>
              <span className="btn__ico">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
