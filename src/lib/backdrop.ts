/* ==========================================================================
   SRMMUN 2026 — LOGO BACKDROP (TypeScript)
   Living field of colonnade arches.
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion, isCoarsePointer } from './motion';

function arch(x: string, w: string, top: string, bottom: string): string {
  const r = parseFloat(w) / 2;
  return 'M' + x + ' ' + bottom + ' V' + (parseFloat(top) + r) +
         ' a' + r + ' ' + r + ' 0 0 1 ' + w + ' 0 V' + bottom + ' Z';
}

function colonnade(n: number, x0: number, gap: number, w0: number, shrink: number, baseY: number, height: number): string {
  let out = '', x = x0, w = w0, h = height;
  for (let i = 0; i < n; i++) {
    out += '<path class="bd-arch" data-i="' + i + '" d="' +
           arch(x.toFixed(1), w.toFixed(1), (baseY - h).toFixed(1), baseY.toFixed(1)) + '"/>';
    x += w + gap * (w / w0);
    w *= shrink;
    h *= shrink;
  }
  return out;
}

export function initBackdrop(hostElement?: HTMLElement | null): (() => void) | undefined {
  if (typeof window === 'undefined') return;
  const host = hostElement || document.querySelector<HTMLElement>('[data-backdrop]');
  if (!host) return;

  const svg =
    '<svg class="bd__svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" ' +
    'fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<g class="bd__plane" data-depth="0.04" opacity=".16">' +
        colonnade(11, -140, 26, 74, 0.955, 620, 300) +
      '</g>' +
      '<g class="bd__plane" data-depth="0.10" opacity=".12">' +
        colonnade(8, -220, 46, 124, 0.945, 760, 470) +
      '</g>' +
      '<g class="bd__plane" data-depth="0.19" opacity=".08">' +
        colonnade(5, -360, 82, 232, 0.93, 980, 760) +
      '</g>' +
    '</svg>';

  host.innerHTML = svg;

  if (isReducedMotion()) return;

  const planes = Array.prototype.slice.call(host.querySelectorAll<HTMLElement>('.bd__plane'));

  /* 1 — endless lateral drift */
  planes.forEach(function (p, i) {
    gsap.to(p, {
      xPercent: -6 - i * 3,
      duration: 26 + i * 9,
      ease: 'none',
      yoyo: true,
      repeat: -1
    });
  });

  /* 2 — arches breathe in a travelling wave */
  planes.forEach(function (p, pi) {
    const arches = p.querySelectorAll('.bd-arch');
    gsap.to(arches, {
      scaleY: 1.045,
      transformOrigin: '50% 100%',
      duration: 3.2 + pi * 0.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.09, from: 'start' }
    });
  });

  /* 3 — scroll pushes the planes vertically */
  planes.forEach(function (p) {
    const d = parseFloat(p.getAttribute('data-depth') || '0.1') || 0.1;
    gsap.to(p, {
      yPercent: -d * 100,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: () => document.body.scrollHeight - window.innerHeight,
        scrub: 1.1
      }
    });
  });

  /* 4 — scroll velocity skew */
  const svgEl = host.querySelector('.bd__svg');
  if (svgEl) {
    const qSkew = gsap.quickTo(svgEl, 'skewY', { duration: 0.9, ease: 'power3.out' });
    ScrollTrigger.create({
      start: 0,
      end: () => document.body.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        const v = Math.max(-2.2, Math.min(2.2, self.getVelocity() / -1600));
        qSkew(v);
      }
    });
  }

  /* 5 — pointer lean */
  if (!isCoarsePointer()) {
    const qx = gsap.quickTo(host, 'x', { duration: 1.4, ease: 'power3.out' });
    const qy = gsap.quickTo(host, 'y', { duration: 1.4, ease: 'power3.out' });
    const onPointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5);
      const ny = (e.clientY / window.innerHeight - 0.5);
      qx(nx * -34);
      qy(ny * -22);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }
}
