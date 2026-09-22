/* ==========================================================================
   SRMMUN 2026 — BOOT SEQUENCE
   Three beats:
     1. IDENT      Society lockup fades in, rule expands, sub-line appears
     2. COLONNADE  mark assembles column by column
     3. MORPH      colonnade scales + translates to match the hero logo
                   position, then the boot fades out — no doors, no seam.
   Skippable at any point (click, Enter, Space, Escape).
   ========================================================================== */

import { gsap } from 'gsap';
import { isReducedMotion, startScroll, stopScroll } from './motion';

export function runBootSequence(el: HTMLElement, onDone?: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  let done = false;
  let tl: gsap.core.Timeline | null = null;

  function finish() {
    if (done) return;
    done = true;
    if (tl) tl.kill();
    gsap.killTweensOf(el);
    gsap.killTweensOf('.boot__ident, .boot__glow, .boot__ident-rule, .boot__ident-sub, .boot__mark, .boot__vig, .boot__scan');
    document.body.classList.remove('is-booting');
    el.setAttribute('hidden', '');
    startScroll();
    (window as any).MUNBooted = true;
    requestAnimationFrame(() => {
      document.dispatchEvent(new CustomEvent('mun:loaded'));
      if (onDone) onDone();
    });
  }

  function bindSkip(onSkip: () => void) {
    const clickHandler = (e: MouseEvent) => { e.preventDefault(); onSkip(); };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        onSkip();
      }
    };
    el.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      el.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }

  /* -------------------------------------------------- reduced-motion path */
  if (isReducedMotion()) {
    const ident = el.querySelector<HTMLElement>('.boot__ident');
    if (ident) ident.style.opacity = '1';
    const timer = setTimeout(finish, 600);
    const unbind = bindSkip(() => { clearTimeout(timer); finish(); });
    return () => { clearTimeout(timer); unbind(); };
  }

  /* -------------------------------------------------------- full animation */
  document.body.classList.add('is-booting');
  stopScroll();

  const cols = Array.from(el.querySelectorAll<HTMLElement>('.boot__mark .cn-col'));
  const slab = el.querySelector<HTMLElement>('.boot__mark .cn-slab');
  const markEl = el.querySelector<HTMLElement>('.boot__mark');

  tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
    onComplete: finish,
  });

  /* ── Beat 1: studio ident ── */
  tl.fromTo('.boot__ident',
    { opacity: 0, scale: 1.07, filter: 'blur(12px)' },
    { opacity: 1, scale: 1,    filter: 'blur(0px)', duration: 0.75, ease: 'expo.out' },
    0.1)
    .to('.boot__glow',       { opacity: 0.45, duration: 0.8 }, 0.2)
    .to('.boot__ident-rule', { width: 'min(60vw, 22rem)', duration: 0.5, ease: 'power3.inOut' }, 0.45)
    .to('.boot__ident-sub',  { opacity: 1, duration: 0.35 }, 0.6)
    .to('.boot__ident',      { opacity: 0, scale: 0.97, filter: 'blur(6px)', duration: 0.28, ease: 'power2.in' }, 1.1);

  /* ── Beat 2: colonnade assembles ── */
  tl.set('.boot__mark', { opacity: 1 }, 1.4);
  if (slab) {
    tl.fromTo(slab,
      { xPercent: 26, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.45, ease: 'expo.out' }, 1.42);
  }
  if (cols.length) {
    tl.fromTo(cols,
      { xPercent: -55, opacity: 0, scaleY: 0.55, transformOrigin: '50% 100%' },
      { xPercent: 0, opacity: 1, scaleY: 1, duration: 0.4, ease: 'back.out(1.9)',
        stagger: { each: 0.045, from: 'end' } }, 1.48);
  }

  /* ── Beat 3: morph — colonnade flies to the hero logo position ── */
  tl.add(() => {
    if (done) return;
    if (!markEl) return;

    // Find the hero logo target (the colonnade mark in the GlyphPortal front overlay)
    const heroMark = document.querySelector<HTMLElement>('[data-hero-logo]');
    if (!heroMark) {
      // No target found — just fade the boot screen out
      gsap.to(el, { opacity: 0, duration: 0.5, ease: 'power2.inOut', onComplete: finish });
      return;
    }

    const from = markEl.getBoundingClientRect();
    const to   = heroMark.getBoundingClientRect();

    if (!from.width || !to.width) {
      gsap.to(el, { opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: finish });
      return;
    }

    // Scale ratio between boot mark and hero mark
    const scaleX = to.width  / from.width;
    const scaleY = to.height / from.height;
    const scale  = (scaleX + scaleY) / 2;

    // Translation needed to align centres
    const dx = (to.left + to.width  / 2) - (from.left + from.width  / 2);
    const dy = (to.top  + to.height / 2) - (from.top  + from.height / 2);

    gsap.to(markEl, {
      x: dx, y: dy, scale,
      duration: 0.7,
      ease: 'expo.inOut',
      transformOrigin: '50% 50%',
    });

    // Fade everything else out simultaneously
    gsap.to([
      el.querySelector('.boot__vig'),
      el.querySelector('.boot__scan'),
      el.querySelector('.boot__glow'),
    ], { opacity: 0, duration: 0.45, ease: 'power2.in' });

    // Boot screen fades after mark lands
    gsap.to(el, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      delay: 0.55,
      onComplete: finish,
    });

  }, 2.05); // fire after colonnade is fully assembled

  const safetyTimer = setTimeout(() => { finish(); }, 6000);

  (window as any).MUNBootTL = tl;

  const unbind = bindSkip(() => {
    finish();
  });

  return () => {
    unbind();
    clearTimeout(safetyTimer);
    if (tl) tl.kill();
  };
}
