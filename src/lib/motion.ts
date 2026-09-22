/* ==========================================================================
   SRMMUN 2026 — Motion Engine (TypeScript)
   GSAP 3 + ScrollTrigger + CustomEase + Lenis.
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { Observer } from 'gsap/Observer';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';

export interface EaseConfig {
  out: string;
  inOut: string;
  expo: string;
  quart: string;
  back: string;
  silk: string;
  swift: string;
}

export const EASE: EaseConfig = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  quart: 'power4.out',
  back: 'back.out(1.7)',
  silk: 'power4.out',
  swift: 'power3.out'
};

export const DUR = { xs: 0.25, sm: 0.45, md: 0.7, lg: 1.1, xl: 1.6 };

let isRegistered = false;
export function registerGsapPlugins() {
  if (typeof window === 'undefined' || isRegistered) return;
  gsap.registerPlugin(ScrollTrigger, Observer, Flip, ScrollToPlugin, CustomEase);
  try {
    CustomEase.create('silk', 'M0,0 C0.16,1 0.3,1 1,1');
    CustomEase.create('swift', 'M0,0 C0.22,1 0.36,1 1,1');
    CustomEase.create('drape', 'M0,0 C0.34,1.16 0.64,1 1,1');
    EASE.silk = 'silk';
    EASE.swift = 'swift';
  } catch {
    EASE.silk = 'power4.out';
    EASE.swift = 'power3.out';
  }
  gsap.defaults({ ease: EASE.silk, duration: DUR.md });
  isRegistered = true;
}

export function isReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCoarsePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
}

export function $<T extends Element = HTMLElement>(sel: string, ctx?: Element | Document | null): T | null {
  return (ctx || document).querySelector(sel) as T | null;
}

export function $$<T extends Element = HTMLElement>(sel: string, ctx?: Element | Document | null): T[] {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)) as T[];
}

export function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function on(el: EventTarget | null | undefined, ev: string, fn: EventListenerOrEventListenerObject, o?: boolean | AddEventListenerOptions) {
  if (el) el.addEventListener(ev, fn, o || false);
}

/* ============================================================== 1. LENIS */
let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;
  registerGsapPlugins();
  if (isReducedMotion()) {
    document.documentElement.classList.add('no-smooth');
    return null;
  }
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    lerp: 0.095
  });

  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  gsap.ticker.add((time: number) => {
    lenisInstance?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  (window as any).lenis = lenisInstance;
  return lenisInstance;
}

export function scrollTo(target: string | HTMLElement, opts?: any) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, Object.assign({ offset: -80, duration: 1.2 }, opts || {}));
  } else {
    const el = typeof target === 'string' ? $(target) : target;
    if (el) el.scrollIntoView({ behavior: isReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}

export function stopScroll() {
  if (lenisInstance) lenisInstance.stop();
  if (typeof document !== 'undefined') document.documentElement.classList.add('is-locked');
}

export function startScroll() {
  if (lenisInstance) lenisInstance.start();
  if (typeof document !== 'undefined') document.documentElement.classList.remove('is-locked');
}

/* ========================================================= 2. TEXT SPLIT */
function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function collect(el: HTMLElement, mode: string) {
  return {
    words: $$<HTMLElement>('.sp-word-i', el),
    chars: $$<HTMLElement>('.sp-char', el),
    all: mode === 'chars' ? $$<HTMLElement>('.sp-char', el) : $$<HTMLElement>('.sp-word-i', el)
  };
}

export function splitText(el: HTMLElement, mode: 'words' | 'chars' = 'chars') {
  if (!el || el.dataset.split === 'done') return collect(el, mode);
  el.dataset.originalHtml = el.innerHTML;

  const words = el.textContent?.split(/(\s+)/) || [];
  let out = '';
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (/^\s+$/.test(w)) { out += ' '; continue; }
    if (!w) continue;
    let inner = '';
    if (mode === 'chars') {
      for (let c = 0; c < w.length; c++) {
        inner += '<span class="sp-char" style="display:inline-block;will-change:transform">' +
                 (w[c] === ' ' ? '&nbsp;' : escapeHtml(w[c])) + '</span>';
      }
    } else {
      inner = escapeHtml(w);
    }
    out += '<span class="sp-word" style="display:inline-block;overflow:hidden;vertical-align:top">' +
           '<span class="sp-word-i" style="display:inline-block;will-change:transform">' + inner + '</span></span>';
  }
  el.innerHTML = out;
  el.dataset.split = 'done';
  return collect(el, mode);
}

export function revealText(el: HTMLElement, opts: any = {}) {
  registerGsapPlugins();
  if (isReducedMotion()) {
    gsap.set(el, { opacity: 1 });
    return null;
  }
  const parts = splitText(el, opts.mode || 'words');
  const targets = opts.mode === 'chars' ? parts.chars : parts.words;
  gsap.set(el, { opacity: 1 });
  return gsap.from(targets, {
    yPercent: 118,
    rotate: opts.rotate === false ? 0 : 2.2,
    duration: opts.duration || 1.0,
    ease: EASE.silk,
    stagger: opts.stagger || (opts.mode === 'chars' ? 0.016 : 0.055),
    delay: opts.delay || 0,
    scrollTrigger: opts.scrollTrigger === false ? null : {
      trigger: opts.trigger || el,
      start: opts.start || 'top 88%',
      once: true
    }
  });
}

/* ================================================= 3. SCROLL REVEAL SYSTEM */
const REVEALS: Record<string, gsap.TweenVars> = {
  up:    { y: 44, opacity: 0 },
  down:  { y: -40, opacity: 0 },
  left:  { x: -56, opacity: 0 },
  right: { x: 56, opacity: 0 },
  fade:  { opacity: 0 },
  scale: { scale: 0.9, opacity: 0, transformOrigin: '50% 60%' },
  rise:  { y: 80, scale: 0.97, opacity: 0 },
  blur:  { opacity: 0, filter: 'blur(14px)', y: 26 },
  tilt:  { y: 60, rotateX: -22, opacity: 0, transformOrigin: '50% 100%' },
  clip:  { clipPath: 'inset(0 0 100% 0)', y: 20 }
};

export function initReveals(root?: Element | Document | null) {
  if (typeof window === 'undefined') return;
  registerGsapPlugins();
  const target = root || document;
  $$('[data-reveal]', target).forEach(function (el: HTMLElement) {
    if (el.dataset.revealInit) return;
    el.dataset.revealInit = '1';
    const kind = el.dataset.reveal || 'up';
    const from = REVEALS[kind] || REVEALS.up;
    const delay = parseFloat(el.dataset.revealDelay || '0');
    const stagger = parseFloat(el.dataset.revealStagger || '0');
    const start = el.dataset.revealStart || 'top 86%';
    const targets = stagger ? Array.from(el.children) : el;

    if (isReducedMotion()) {
      gsap.set(targets, { opacity: 1, clearProps: 'all' });
      return;
    }

    gsap.set(el, { opacity: 1 });

    const box = el.getBoundingClientRect();
    const inFirstScreen = box.top < window.innerHeight * 0.92 && box.bottom > 0;

    const vars: gsap.TweenVars = Object.assign({}, from, {
      duration: parseFloat(el.dataset.revealDuration || '1.0'),
      ease: EASE.silk,
      delay: delay,
      stagger: stagger,
      clearProps: 'filter,clipPath'
    });
    if (!inFirstScreen) {
      vars.scrollTrigger = { trigger: el, start: start, once: true };
    }
    gsap.from(targets, vars);
  });
}

/* ================================================ 4. PARALLAX */
export function initParallax(root?: Element | Document | null) {
  if (typeof window === 'undefined' || isReducedMotion()) return;
  registerGsapPlugins();
  const target = root || document;
  $$('[data-parallax]', target).forEach(function (el: HTMLElement) {
    if (el.dataset.parallaxInit) return;
    el.dataset.parallaxInit = '1';
    const amt = parseFloat(el.dataset.parallax || '0.15');
    const sc = parseFloat(el.dataset.parallaxScale || '0');
    const rot = parseFloat(el.dataset.parallaxRotate || '0');
    gsap.to(el, {
      yPercent: amt * 100,
      scale: sc ? 1 + sc : 1,
      rotate: rot,
      ease: 'none',
      scrollTrigger: {
        trigger: el.dataset.parallaxTrigger ? $(el.dataset.parallaxTrigger) : el.parentElement,
        start: (el.dataset.parallaxStart as any) || 'top bottom',
        end: (el.dataset.parallaxEnd as any) || 'bottom top',
        scrub: parseFloat(el.dataset.parallaxScrub || '1')
      }
    });
  });
}

/* ====================================================== 6. MAGNETIC BUTTONS */
export function initMagnetic(root?: Element | Document | null) {
  if (typeof window === 'undefined' || isReducedMotion() || isCoarsePointer()) return;
  registerGsapPlugins();
  const target = root || document;
  $$('[data-magnetic]', target).forEach(function (el: HTMLElement) {
    if (el.dataset.magInit) return;
    el.dataset.magInit = '1';
    const strength = parseFloat(el.dataset.magnetic || '0.34');
    const inner = $('[data-magnetic-inner]', el) || (el.firstElementChild as HTMLElement) || el;
    const qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: EASE.silk });
    const qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: EASE.silk });
    const ix = gsap.quickTo(inner, 'x', { duration: 0.65, ease: EASE.silk });
    const iy = gsap.quickTo(inner, 'y', { duration: 0.65, ease: EASE.silk });

    on(el, 'pointermove', function (e: any) {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      qx(dx * strength); qy(dy * strength);
      ix(dx * strength * 0.42); iy(dy * strength * 0.42);
    });
    on(el, 'pointerleave', function () {
      qx(0); qy(0); ix(0); iy(0);
    });
  });
}

/* ================================================= 7. CUSTOM INERTIA CURSOR */
export function initCursor() {
  if (typeof window === 'undefined' || isCoarsePointer() || isReducedMotion()) return;
  if ($('.cursor')) return;
  registerGsapPlugins();
  const dot = document.createElement('div');
  dot.className = 'cursor';
  dot.innerHTML = '<span class="cursor__ring"></span><span class="cursor__dot"></span><span class="cursor__label"></span>';
  document.body.appendChild(dot);
  const ring = $('.cursor__ring', dot);
  const core = $('.cursor__dot', dot);
  const label = $('.cursor__label', dot);

  if (!ring || !core || !label) return;

  const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: EASE.silk });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: EASE.silk });
  const dx = gsap.quickTo(core, 'x', { duration: 0.1, ease: 'power2.out' });
  const dy = gsap.quickTo(core, 'y', { duration: 0.1, ease: 'power2.out' });
  const lx = gsap.quickTo(label, 'x', { duration: 0.5, ease: EASE.silk });
  const ly = gsap.quickTo(label, 'y', { duration: 0.5, ease: EASE.silk });

  on(document, 'pointermove', function (e: any) {
    rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    lx(e.clientX); ly(e.clientY);
    dot.classList.add('is-on');
  });
  on(document, 'pointerdown', function () { dot.classList.add('is-down'); });
  on(document, 'pointerup',   function () { dot.classList.remove('is-down'); });
  on(document, 'pointerleave',function () { dot.classList.remove('is-on'); });

  on(document, 'pointerover', function (e: any) {
    const t = e.target.closest('a,button,[data-cursor]');
    if (!t) return;
    dot.classList.add('is-hover');
    const txt = t.getAttribute('data-cursor');
    if (txt) { label.textContent = txt; dot.classList.add('has-label'); }
  });
  on(document, 'pointerout', function (e: any) {
    const t = e.target.closest('a,button,[data-cursor]');
    if (!t) return;
    dot.classList.remove('is-hover', 'has-label');
  });
}

/* ========================================================= 9. COUNT-UP NUMS */
export function initCounters(root?: Element | Document | null) {
  if (typeof window === 'undefined') return;
  registerGsapPlugins();
  const target = root || document;
  $$('[data-count]', target).forEach(function (el: HTMLElement) {
    if (el.dataset.countInit) return;
    el.dataset.countInit = '1';
    const to = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.countSuffix || '';
    const prefix = el.dataset.countPrefix || '';
    const dec = parseInt(el.dataset.countDecimals || '0', 10);
    const group = el.dataset.countGroup !== 'false';
    function fmt(n: number) {
      let t = n.toFixed(dec);
      if (group) t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return prefix + t + suffix;
    }
    if (isReducedMotion()) { el.textContent = fmt(to); return; }
    const obj = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(obj, {
      v: to, duration: 1.9, ease: EASE.quart,
      onUpdate: function () { el.textContent = fmt(obj.v); },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });
}

/* ====================================================== 14. SCROLL PROGRESS */
export function initProgress() {
  if (typeof window === 'undefined') return;
  registerGsapPlugins();
  const bar = $('[data-scroll-progress]');
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1, ease: 'none', transformOrigin: 'left center',
    scrollTrigger: { start: 0, end: () => document.body.scrollHeight - window.innerHeight, scrub: 0.25 }
  });
}

/* ======================================================== 15. STICKY HEADER */
export function initHeader() {
  if (typeof window === 'undefined') return;
  const header = $('[data-header]');
  if (!header) return;
  let last = 0;
  function upd() {
    const y = window.scrollY || document.documentElement.scrollTop;
    header!.classList.toggle('is-stuck', y > 24);
    header!.classList.toggle('is-hidden', y > last && y > 420 && !document.body.classList.contains('menu-open'));
    last = y;
  }
  if (lenisInstance) lenisInstance.on('scroll', upd);
  else on(window, 'scroll', upd, { passive: true });
  upd();
}

export function initHeaderContrast() {
  if (typeof window === 'undefined') return;
  registerGsapPlugins();
  const header = $('[data-header]');
  if (!header) return;
  const darks = $$('.is-invert, .soon, .footer');
  if (!darks.length) return;
  let over = 0;
  function sync() { header!.classList.toggle('on-dark', over > 0); }
  darks.forEach(function (sec) {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 72px',
      end: 'bottom 72px',
      onToggle: function (self) {
        over += self.isActive ? 1 : -1;
        if (over < 0) over = 0;
        sync();
      }
    });
  });
  sync();
}

/* ================================================== 13b. POINTER SPOTLIGHT */
export function initSpotlight(root?: Element | Document | null) {
  if (typeof window === 'undefined' || isCoarsePointer() || isReducedMotion()) return;
  const target = root || document;
  $$('.bento--glass', target).forEach(function (grid: HTMLElement) {
    if (grid.dataset.spotInit) return;
    grid.dataset.spotInit = '1';
    on(grid, 'pointermove', function (e: any) {
      const cell = e.target.closest('.bento__cell');
      if (!cell || !grid.contains(cell)) return;
      const r = cell.getBoundingClientRect();
      cell.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      cell.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, { passive: true });
  });
}

/* ================================================================ ALL INIT */
export function initAll(root?: Element | Document | null) {
  const target = root || document;
  initReveals(target);
  initParallax(target);
  initMagnetic(target);
  initCounters(target);
  initSpotlight(target);
  if (typeof window !== 'undefined') ScrollTrigger.refresh();
}

export function bootMotion() {
  if (typeof window === 'undefined') return;
  registerGsapPlugins();
  document.documentElement.classList.toggle('reduced-motion', isReducedMotion());
  initSmoothScroll();
  initCursor();
  initHeader();
  initHeaderContrast();
  initProgress();
  initAll(document);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { ScrollTrigger.refresh(); });
  }
  on(window, 'load', () => { ScrollTrigger.refresh(); });
}

export const MUN = {
  EASE, DUR,
  reduced: isReducedMotion(),
  coarse: isCoarsePointer(),
  $, $$, clamp, lerp,
  splitText, revealText,
  scrollTo, stopScroll, startScroll,
  initAll, initReveals, initMagnetic,
  initCounters, initSpotlight, boot: bootMotion,
  get lenis() { return lenisInstance; }
};

if (typeof window !== 'undefined') {
  (window as any).MUN = MUN;
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
}
