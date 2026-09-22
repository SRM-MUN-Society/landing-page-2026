/* ==========================================================================
   SRMMUN 2026 — Page choreography (TypeScript)
   Hero entrance is handled by GlyphPortal. This file owns:
     · Section heading word-reveals (scroll-triggered)
     · Countdown + tower scroll-driven entrance
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, isReducedMotion, registerGsapPlugins, revealText, EASE } from './motion';

/** Called from page.tsx after mount. Returns a cleanup function. */
export function initPageMotion(): (() => void) | undefined {
  if (typeof window === 'undefined') return;
  registerGsapPlugins();

  const REDUCED = isReducedMotion();
  const E = EASE.silk || 'power4.out';

  /* ─── Reveal hero front overlay after boot morph lands ─── */
  function revealHero() {
    const front = document.querySelector<HTMLElement>('.hero-front');
    if (front) front.classList.add('is-visible');
    /* Re-init magnetic on the CTA button now that it's interactive */
    const cta = front?.querySelector<HTMLElement>('[data-magnetic]');
    if (cta && !REDUCED) {
      // magnetic is already initialised globally by initAll; just refresh
      import('./motion').then(({ initMagnetic }) => initMagnetic(front ?? undefined));
    }
  }

  document.addEventListener('mun:loaded', revealHero, { once: true });
  if ((window as any).MUNBooted) revealHero();

  /* ─── Section headings: word mask-up on scroll ─── */
  $$('[data-reveal-heading]').forEach((h) => {
    revealText(h as HTMLElement, { mode: 'words', stagger: 0.06 });
  });

  /* ─── Countdown + tower scroll entrance ─── */
  const tc = $('[data-tc]');
  const tower = $('[data-tower]');

  if (tc && tower && !REDUCED) {
    const units   = $$('[data-tc-unit]', tc);
    const bits2   = $$('[data-tc-el]', tc);
    const parts   = $$('.tw-part', tower);
    const urns    = $$('.tw-urn', tower);
    const hMin    = $('[data-hand="minute"]', tower);
    const hHour   = $('[data-hand="hour"]', tower);
    const rings   = $$('.tower-rings circle', tc);
    const ground  = $('.tower-ground', tc);

    const ttl = gsap.timeline({
      scrollTrigger: { trigger: tc, start: 'top 72%', once: true },
    });

    if (bits2.length)
      ttl.from(bits2, { y: 22, opacity: 0, duration: 0.7, stagger: 0.08 }, 0);
    if (units.length)
      ttl.from(units, {
        y: 30, opacity: 0, scale: 0.94, duration: 0.75,
        ease: 'back.out(1.6)', stagger: 0.07,
      }, 0.12);
    if (rings.length)
      ttl.from(rings, {
        scale: 0.55, opacity: 0, transformOrigin: '50% 50%',
        duration: 1.2, stagger: 0.09, ease: E,
      }, 0.2);

    ttl.from(tower, { y: 60, opacity: 0, duration: 1.1, ease: E }, 0.3);

    if (parts.length)
      ttl.from(parts, {
        y: -34, opacity: 0, scaleY: 0.82, transformOrigin: '50% 100%',
        duration: 0.6, ease: 'back.out(2)',
        stagger: { each: 0.08, from: 'end' },
      }, 0.45);
    if (urns.length)
      ttl.from(urns, {
        scale: 0, transformOrigin: '50% 100%',
        duration: 0.4, ease: 'back.out(3)', stagger: 0.03,
      }, 1.05);
    if (ground)
      ttl.from(ground, { scaleX: 0.35, opacity: 0, duration: 0.9 }, 0.6);
    if (hMin)
      ttl.from(hMin,  { rotate: -1080, duration: 1.5, ease: 'power3.out', clearProps: 'transform' }, 0.55);
    if (hHour)
      ttl.from(hHour, { rotate: -360,  duration: 1.5, ease: 'power3.out', clearProps: 'transform' }, 0.55);

    gsap.fromTo(tower, { yPercent: 6 }, {
      yPercent: -4, ease: 'none',
      scrollTrigger: { trigger: tc, start: 'top bottom', end: 'bottom bottom', scrub: 1 },
    });
    gsap.to('.tc .tower-rings', {
      rotate: 26, ease: 'none',
      scrollTrigger: { trigger: tc, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
    });
  }

  ScrollTrigger.refresh();
  return () => { /* individual tweens clean themselves up via ScrollTrigger */ };
}

/**
 * Legacy export alias — kept so any other file importing initHomeMotion
 * doesn't break at runtime. Points to the same function.
 */
export { initPageMotion as initHomeMotion };
