/* ==========================================================================
   SRMMUN 2026 — Interactive Chrome & Utilities (TypeScript)
   Countdown, drawer, mobile nav, copy, tabs, accordion.
   ========================================================================== */

import { gsap } from 'gsap';
import { $, $$, isReducedMotion, stopScroll, startScroll } from './motion';

export const EVENT_START_UTC = Date.UTC(2026, 9, 30, 3, 30, 0);   // 09:00 IST
export const EVENT_END_UTC   = Date.UTC(2026, 10, 1, 12, 30, 0);  // 18:00 IST, 1 Nov

/* ========================================================= 2. MOBILE NAV */
export function initMobileNav(): (() => void) | undefined {
  if (typeof window === 'undefined') return;
  const btn = $('[data-menu-toggle]');
  const sheet = $('.mnav');
  if (!btn || !sheet) return;

  function toggle(force?: boolean) {
    const open = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    btn!.setAttribute('aria-expanded', String(open));
    sheet!.setAttribute('aria-hidden', String(!open));
    if (open) stopScroll();
    else startScroll();
  }

  const onBtnClick = () => toggle();
  btn.addEventListener('click', onBtnClick);

  const links = $$('.mnav__link', sheet);
  const onLinkClick = () => toggle(false);
  links.forEach((a) => a.addEventListener('click', onLinkClick));

  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') toggle(false); };
  document.addEventListener('keydown', onKey);

  return () => {
    btn.removeEventListener('click', onBtnClick);
    links.forEach((a) => a.removeEventListener('click', onLinkClick));
    document.removeEventListener('keydown', onKey);
  };
}

/* ====================================================== 3. REGISTER DRAWER */
const REGISTRATION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfpn29r4eD6mSpaqRI3mMXQd0DclJUb-d7YRGbaely8ACADBQ/formResponse';

export function initDrawer(): { open: () => void; close: () => void } | undefined {
  if (typeof window === 'undefined') return;
  
  // Redirect all registration buttons to Google Form
  $$('[data-open-drawer]').forEach((b) => {
    b.addEventListener('click', (e) => { 
      e.preventDefault(); 
      window.open(REGISTRATION_URL, '_blank');
    });
  });

  const drawer = $('.drawer');
  if (!drawer) return;
  const panel = $('.drawer__panel', drawer);
  let lastFocus: HTMLElement | null = null;

  function open() {
    // Redirect to Google Form instead of opening drawer
    window.open(REGISTRATION_URL, '_blank');
  }

  function close() {
    drawer!.classList.remove('is-open');
    drawer!.setAttribute('aria-hidden', 'true');
    startScroll();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $$('[data-close-drawer]', drawer).forEach((b) => {
    b.addEventListener('click', (e) => { e.preventDefault(); close(); });
  });

  const scrim = $('.drawer__scrim', drawer);
  if (scrim) scrim.addEventListener('click', close);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!drawer.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    const f = $$<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', panel)
      .filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  const obj = { open, close };
  (window as any).MUNDrawer = obj;
  return obj;
}

/* ======================================== 4. COUNTDOWN + LIVE TOWER CLOCK */
export function initCountdown(): (() => void) | undefined {
  if (typeof window === 'undefined') return;
  const roots = $$('[data-countdown]');
  const towers = $$('[data-tower-clock]').filter((t) => !t.closest('.boot'));
  if (!roots.length && !towers.length) return;

  const clockUnits = roots.map((root) => ({
    root,
    d: $('[data-cd="d"]', root),
    h: $('[data-cd="h"]', root),
    m: $('[data-cd="m"]', root),
    s: $('[data-cd="s"]', root),
    note: $('[data-cd="note"]', root),
    prev: {} as Record<string, string>
  }));

  const hands = towers.map((t) => ({
    root: t,
    hour: $('[data-hand="hour"]', t),
    minute: $('[data-hand="minute"]', t),
    second: $('[data-hand="second"]', t),
    mode: t.getAttribute('data-tower-clock') || 'countdown'
  }));

  function setDigit(el: HTMLElement | null, val: number, store: Record<string, string>, key: string) {
    if (!el) return;
    const s = String(val).padStart(key === 'd' ? 3 : 2, '0');
    if (store[key] === s) return;
    store[key] = s;
    el.textContent = s;
    if (!isReducedMotion()) {
      gsap.fromTo(el, { yPercent: -42, opacity: 0.25 },
        { yPercent: 0, opacity: 1, duration: 0.44, ease: 'power3.out', overwrite: true });
    }
  }

  let rafId: number | null = null;
  let intervalId: any = null;

  function tick() {
    const now = Date.now();
    const diff = EVENT_START_UTC - now;
    const live = diff <= 0 && now <= EVENT_END_UTC;
    const over = now > EVENT_END_UTC;
    const t = Math.max(0, diff);

    const d = Math.floor(t / 86400000);
    const h = Math.floor(t / 3600000) % 24;
    const m = Math.floor(t / 60000) % 60;
    const s = Math.floor(t / 1000) % 60;

    clockUnits.forEach((c) => {
      setDigit(c.d, d, c.prev, 'd');
      setDigit(c.h, h, c.prev, 'h');
      setDigit(c.m, m, c.prev, 'm');
      setDigit(c.s, s, c.prev, 's');
      if (c.note && c.prev.note !== String(live)) {
        c.prev.note = String(live);
        c.note.textContent = over ? 'The fourteenth session stands adjourned'
                           : live ? 'Committee is in session'
                           : 'Until the gavel falls';
      }
      c.root.classList.toggle('is-live', live);
    });

    hands.forEach((c) => {
      let sa: number, ma: number, ha: number;
      if (c.mode === 'local' || live || over) {
        const n = new Date();
        sa = n.getSeconds() * 6 + n.getMilliseconds() * 0.006;
        ma = n.getMinutes() * 6 + n.getSeconds() * 0.1;
        ha = (n.getHours() % 12) * 30 + n.getMinutes() * 0.5;
      } else {
        sa = -(s * 6 + ((t % 1000) / 1000) * 6);
        ma = -(m * 6 + s * 0.1);
        ha = -((h % 12) * 30 + m * 0.5);
      }
      if (c.second) c.second.setAttribute('transform', 'rotate(' + sa.toFixed(2) + ')');
      if (c.minute) c.minute.setAttribute('transform', 'rotate(' + ma.toFixed(2) + ')');
      if (c.hour)   c.hour.setAttribute('transform', 'rotate(' + ha.toFixed(2) + ')');
    });
  }

  tick();

  if (isReducedMotion()) {
    intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }

  function loop() {
    tick();
    rafId = requestAnimationFrame(loop);
  }
  loop();

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (intervalId) clearInterval(intervalId);
  };
}
