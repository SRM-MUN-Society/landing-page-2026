'use client';

import React, { useEffect, useRef } from 'react';
import { hydrateIllustrations } from '@/lib/illustrations';
import { initPageMotion } from '@/lib/home-motion';
import { initAll } from '@/lib/motion';
import GlyphPortal, { type GlyphPortalStyle } from '@/components/ui/glyph-portal';
import { OrganizationLogos } from '@/components/ui/organization-logos';
import { GallerySection } from '@/components/ui/gallery-section';

const portalStyle: GlyphPortalStyle = {
  '--gp-paper':      '#fdfdfc',
  '--gp-ink':        '#141414',
  '--gp-field':      '#0a0a0a',
  '--gp-foreground': '#f3f3f3',
};

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        transform: 'scale(var(--gp-field-scale, 1))',
        background: [
          'radial-gradient(120% 90% at 50% 30%, #2a2a2a 0%, #141414 46%, #070707 100%)',
          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%)',
        ].join(', '),
      }}
    />
  );
}

/* ─── Front overlay: hero content sitting below the SRMMUN portal word ─── */
function HeroFront() {
  return (
    <div className="hero-front">
      <div
        className="hero-front__logo"
        data-hero-logo
        data-illo="colonnade"
        aria-hidden="true"
      />

      <div className="hero-front__below">
        <p className="hero-front__eyebrow">Be a part of the legacy</p>

        <p className="hero-front__edition">
          <span className="hero-front__rule" aria-hidden="true" />
          14th Edition
          <span className="hero-front__rule" aria-hidden="true" />
        </p>

        <p className="hero-front__meta">
          <b>30, 31 October</b> and <b>1 November 2026</b>
        </p>
        <p className="hero-front__meta hero-front__meta--soft">
          SRM Institute of Science and Technology &middot; Kattankulathur, Chennai
        </p>

        <div className="hero-front__cta">
          <button
            className="btn btn--green btn--lg"
            data-open-drawer
            data-magnetic="0.25"
            type="button"
            style={{ pointerEvents: 'auto' }}
          >
            <span data-magnetic-inner>Register Now</span>
            <span className="btn__ico">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M2.5 8H13M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const root = mainRef.current;
    hydrateIllustrations(root);

    const cleanupPage = initPageMotion();
    initAll(root);

    return () => {
      if (cleanupPage) cleanupPage();
    };
  }, []);

  return (
    <main id="main" ref={mainRef}>

      {/* ══════════════════════════════════════════════ HERO / GLYPH PORTAL ═══
          The whole hero lives in the `front` overlay.
          The About section is revealed as `children` after the scroll
          journey breaks through the letters.                             */}
      <GlyphPortal
        word="SRMMUN"
        fontFamily='"Instrument Serif", "Times New Roman", Times, serif'
        fontWeight={400}
        scrollLength={1.8}
        interactive={false}
        annotations={false}
        enterLabel="Scroll to enter"
        background={<HeroBackground />}
        front={<HeroFront />}
        style={portalStyle}
        className="hero-portal"
      >
        {/* ══════════════════════════════════════════════════════ ABOUT ═══ */}
        <div className="shell">
          <div className="soc-grid">
            <div className="soc-mark">
              <span className="bloom bloom--green" style={{ width: '24rem', height: '24rem', opacity: 0.3 }} aria-hidden="true" />
              <div className="soc-mark__art" data-parallax="-0.08" data-illo="colonnade" />
            </div>
            <div>
              <p className="eyebrow" data-reveal="fade" style={{ color: 'var(--g-400)' }}>About</p>
              <h2 className="display display--md" style={{ marginTop: '1rem', color: '#fff' }} data-reveal-heading>
                The SRM MUN Society
              </h2>
              <p className="lede" style={{ marginTop: '1.5rem', color: 'var(--g-200)' }} data-reveal="up" data-reveal-delay="0.1">
                The SRM MUN Society is the Model United Nations society of SRM Institute of Science
                and Technology, Kattankulathur. It has run SRMMUN since 2012, and it is student-run
                end to end &mdash; every committee, every guide, every logistics call.
              </p>
              <p style={{ marginTop: '1rem', color: 'var(--g-300)' }} data-reveal="up" data-reveal-delay="0.16">
                The Society works in two branches. The Organising Committee builds the conference
                across its specialised domains. The Delegation carries the Society&rsquo;s name to
                conferences across the country, and trains its members in debate, writing,
                journalism and photojournalism through the year.
              </p>
              <p style={{ marginTop: '1rem', color: 'var(--g-300)' }} data-reveal="up" data-reveal-delay="0.22">
                SRMMUN 2026 is its 14th edition. The people change every year. The standard does not.
              </p>
              <div className="row row--wrap" style={{ marginTop: '2rem' }} data-reveal="up" data-reveal-delay="0.28">
                <a className="btn btn--light" href="https://www.instagram.com/srm_munsoc/" target="_blank" rel="noopener noreferrer" data-magnetic="0.2">
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
      </GlyphPortal>

      {/* ══════════════════════════════════════════════ COLLABORATIONS ═══ */}
      <section className="section section--tight" style={{ background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
        <div className="shell">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center'
          }}>
            {/* Left: Animation */}
            <div data-reveal="up" data-reveal-delay="0.1">
              <OrganizationLogos />
            </div>

            {/* Right: Text */}
            <div>
              <p className="eyebrow" data-reveal="fade">Collaborations</p>
              <h2 className="display display--md" style={{ marginTop: '0.5rem' }} data-reveal-heading>
                Driven by Partnership
              </h2>
              <p className="lede" style={{ marginTop: '1rem' }} data-reveal="up" data-reveal-delay="0.1">
                SRMMUN 2026 stands on the strength of its institutional collaborators. 
                Recognized by the United Nations Academic Impact and the Sustainable Development 
                Solutions Network, this edition represents the shared commitment of organizations 
                working toward global dialogue and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ GALLERY ═══ */}
      <section className="section" style={{ background: 'var(--bg-alt)', position: 'relative', zIndex: 1 }}>
        <div className="shell">
          <div className="section-head center">
            <div>
              <p className="eyebrow" data-reveal="fade">Memories</p>
              <h2 className="display display--md" style={{ marginTop: '0.5rem' }} data-reveal-heading>
                Through the Years
              </h2>
              <p className="lede" style={{ marginTop: '1rem' }} data-reveal="up" data-reveal-delay="0.1">
                A glimpse into the moments that define SRMMUN — where dialogue meets action, 
                and delegates become diplomats.
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem' }} data-reveal="up" data-reveal-delay="0.2">
            <GallerySection />
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ CTA BAND ═══ */}
      <section className="cta-band">
        <div className="cta-band__bg" aria-hidden="true">
          <span className="bloom bloom--green" style={{ width: '40rem', height: '40rem', top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.38 }} />
        </div>
        <div className="shell shell--text u-z1">
          <p className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>Registrations</p>
          <h2 className="display display--lg" style={{ marginTop: '1.25rem' }}>Take the floor.</h2>
          <p className="lede" style={{ margin: '1.5rem auto 0', textAlign: 'center' }}>
            Everything opens from one place. The registration window, the guides and the announcements all arrive there first.
          </p>
          <div className="row" style={{ justifyContent: 'center', marginTop: '2.25rem' }}>
            <button className="btn btn--green btn--lg" data-open-drawer data-magnetic="0.25" type="button">
              <span data-magnetic-inner>Register Now</span>
              <span className="btn__ico">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M2.5 8H13M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
          <p className="body-sm" style={{ marginTop: '1.25rem' }}>
            Questions? Write to{' '}
            <a className="link link--on accent-text" href="mailto:delegateaffairs.srmmun@gmail.com">delegateaffairs.srmmun@gmail.com</a>
          </p>
        </div>
      </section>

    </main>
  );
}
