'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { hydrateIllustrations } from '@/lib/illustrations';
import { initMagnetic, isReducedMotion } from '@/lib/motion';

interface ComingSoonProps {
  crumb: string;
  eyebrow: string;
  description: string;
}

export default function ComingSoon({ crumb, eyebrow, description }: ComingSoonProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;
    hydrateIllustrations(root);
    initMagnetic(root);

    if (isReducedMotion()) return;

    const segs = Array.from(root.querySelectorAll<HTMLElement>('.soon__meter i'));
    const pct = root.querySelector<HTMLElement>('[data-soon-pct]');
    const stat = root.querySelector<HTMLElement>('[data-soon-status]');
    const cols = Array.from(root.querySelectorAll<HTMLElement>('.cn-col'));
    const slab = root.querySelector<HTMLElement>('.cn-slab');
    const slots = Array.from(root.querySelectorAll<HTMLElement>('[data-slot]'));

    const tl = gsap.timeline({ delay: 0.25 });
    if (slab) tl.from(slab, { xPercent: 22, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0);
    if (cols.length) {
      tl.from(cols, {
        xPercent: -50, opacity: 0, scaleY: 0.6, transformOrigin: '50% 100%',
        duration: 0.7, ease: 'back.out(1.8)', stagger: { each: 0.07, from: 'end' }
      }, 0.1);
    }
    tl.from('.soon__title', { yPercent: 30, opacity: 0, duration: 0.9, ease: 'power4.out' }, 0.35)
      .from('.soon__sub', { y: 18, opacity: 0, duration: 0.7 }, 0.5)
      .from(slots, { y: 22, opacity: 0, duration: 0.55, ease: 'power3.out', stagger: 0.045 }, 0.6);

    const m = { v: 0 };
    tl.to(m, {
      v: 62, duration: 2.6, ease: 'power2.inOut',
      onUpdate: () => {
        const n = Math.round(m.v);
        if (pct) pct.textContent = String(n).padStart(3, '0') + '%';
        const lit = Math.round((n / 100) * segs.length);
        for (let i = 0; i < segs.length; i++) segs[i].classList.toggle('is-on', i < lit);
      }
    }, 0.7);
    tl.call(() => { if (stat) stat.textContent = 'slate under seal'; }, undefined, 2.4);

    const sweeps: gsap.core.Tween[] = [];
    slots.forEach((sl, i) => {
      const sweep = document.createElement('span');
      sweep.style.cssText = 'position:absolute;inset:0;pointer-events:none;' +
        'background:linear-gradient(105deg,transparent 42%,rgba(243,243,243,.16) 50%,transparent 58%);';
      sl.appendChild(sweep);
      const tween = gsap.fromTo(sweep, { xPercent: -120 }, {
        xPercent: 120, duration: 1.5, ease: 'power2.inOut',
        repeat: -1, repeatDelay: 2.6, delay: i * 0.22
      });
      sweeps.push(tween);
    });

    return () => {
      tl.kill();
      sweeps.forEach((sw) => sw.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="soon" data-soon>
      <span className="soon__grid" aria-hidden="true"></span>
      <span className="soon__glow" aria-hidden="true"></span>
      <span className="soon__frame" aria-hidden="true"><i></i><i></i><i></i><i></i></span>

      <div className="soon__inner">
        <nav className="crumbs" aria-label="Breadcrumb" style={{ color: 'rgba(243,243,243,.55)' }}>
          <Link href="/" style={{ color: 'var(--g-300)' }}>Home</Link>
          <span>/</span>
          <span>{crumb}</span>
        </nav>

        <div className="soon__mark" data-illo="colonnade" aria-hidden="true"></div>

        <p className="eyebrow eyebrow--plain" style={{ color: 'var(--g-400)' }}>{eyebrow}</p>
        <h1 className="soon__title">Coming soon</h1>
        <p className="lede soon__sub">{description}</p>

        <div className="soon__slots" aria-hidden="true">
          <div className="soon__slot" data-slot><span>Slot</span><b>01</b></div>
          <div className="soon__slot" data-slot><span>Slot</span><b>02</b></div>
          <div className="soon__slot" data-slot><span>Slot</span><b>03</b></div>
          <div className="soon__slot" data-slot><span>Slot</span><b>04</b></div>
          <div className="soon__slot" data-slot><span>Slot</span><b>05</b></div>
          <div className="soon__slot" data-slot><span>Slot</span><b>06</b></div>
        </div>

        <div className="soon__meter" aria-hidden="true">
          {Array.from({ length: 32 }).map((_, i) => <i key={i}></i>)}
        </div>
        <div className="soon__readout">
          <span data-soon-status>awaiting confirmation</span>
          <span data-soon-pct>000%</span>
        </div>

        <div className="row row--wrap" style={{ justifyContent: 'center', marginTop: 'clamp(1rem,2vw,1.75rem)' }}>
          <button className="btn btn--green btn--lg" data-open-drawer data-magnetic="0.25" type="button">
            <span data-magnetic-inner>Register Now</span>
            <span className="btn__ico">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2.5 8H13M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
          <Link className="btn btn--light btn--lg" href="/" data-magnetic="0.18">
            <span data-magnetic-inner>Back to home</span>
          </Link>
        </div>

        <p className="mono" style={{ color: 'rgba(243,243,243,.45)', marginTop: '.5rem' }}>
          ANNOUNCED FIRST ON @SRM_MUNSOC
        </p>
      </div>
    </section>
  );
}
