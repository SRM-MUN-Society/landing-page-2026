# SRMMUN 2026 — Design Language

A sophisticated design system built for the 14th edition of SRM Model United Nations conference. This document outlines the visual language, design principles, and implementation details that give SRMMUN its distinctive diplomatic elegance.

---

## Design Philosophy

The SRMMUN 2026 design embodies **diplomatic formality meets modern clarity** — a visual language that honors the gravitas of international discourse while embracing contemporary web aesthetics. The system draws inspiration from:

- **Official UN documentation** — clean hierarchies, precise typography
- **Classic diplomatic correspondence** — paper textures, ink, brass accents
- **Modern digital interfaces** — smooth motion, glass morphism, spatial depth

### Core Principles

1. **Clarity First** — Information hierarchy is always legible and purposeful
2. **Refined Motion** — Animations are smooth, intentional, and never distracting  
3. **Tactile Materiality** — Glass surfaces, paper textures, and dimensional layers
4. **Diplomatic Elegance** — Formal without being stuffy, authoritative without being cold

---

## Color System

### Primary Palette: Ink & Paper

The foundation is a refined neutral palette inspired by black ink on cream paper.

**Neutrals** (`--n-*`)
```
--n-0:   #ffffff  Pure white
--n-25:  #fdfdfc  Off-white (primary background)
--n-50:  #f8f8f7  Paper tint
--n-100: #f1f1ef  Sunken backgrounds
--n-900: #141414  Primary ink
--n-950: #0a0a0a  Deep black
```

**Ink Ramp** (`--g-*`)
```
--g-950: #0a0a0a  Deep black
--g-900: #0f0f0f  
--g-800: #171717  Primary dark accent
--g-700: #262626
--g-300: #a3a3a3  Light accent
--g-200: #d4d4d4
--g-100: #ececec
--g-50:  #f5f5f5  
```

### Accent Colors

**Brass** — The primary accent, evoking UN brass fixtures and ceremonial seals
```css
--brass:      #b08a3e  Primary brass
--brass-deep: #806128  Dark brass for emphasis
```

**Supporting**
```css
--navy:       #16314a  Deep diplomatic blue
--paper:      #faf7f0  Textured paper background
--paper-line: #e6ded0  Paper ruling lines
--red-seal:   #9b2c2c  Official seal red
```

### Semantic Roles

Colors are assigned to semantic roles for consistent theming:

```css
--bg:            var(--n-25)    /* Primary background */
--bg-alt:        var(--n-50)    /* Alternate section */
--bg-sunk:       var(--n-100)   /* Recessed areas */
--bg-invert:     var(--g-950)   /* Dark mode */

--ink:           var(--n-900)   /* Primary text */
--ink-soft:      var(--n-600)   /* Secondary text */
--ink-mute:      var(--n-500)   /* Muted text */
--ink-invert:    #f3f3f3        /* Light text */

--accent:        var(--g-800)   /* Primary accent */
--accent-deep:   var(--g-950)   /* Deep accent */
--accent-bright: var(--g-300)   /* Light accent */

--line:          var(--n-200)   /* Borders */
--line-soft:     var(--n-150)   /* Subtle dividers */
--line-strong:   var(--n-300)   /* Emphasized borders */
```

### Dark Mode (`.is-invert`)

The system supports a full inversion for dark sections:

```css
.is-invert {
  --bg: var(--g-950);
  --ink: #f3f3f3;
  --accent: var(--g-300);
  color-scheme: dark;
}
```

---

## Typography

### Font Families

**Display** — `Instrument Serif`  
Reserved for large headlines, dramatic moments, and brand statements. Elegant, high-contrast serif.

**Serif** — `Newsreader`  
For body text in long-form content. Variable font with optical sizing for optimal readability at any size.

**UI** — `Inter Tight`  
Interface elements, navigation, labels. Clean, modern sans-serif with excellent legibility.

**Monospace** — `JetBrains Mono`  
Code blocks, technical data, timestamps.

```css
--font-display: 'Instrument Serif', 'Times New Roman', Times, 'Liberation Serif', serif;
--font-serif:   'Newsreader', 'Times New Roman', Times, 'Liberation Serif', serif;
--font-ui:      'Inter Tight', 'Inter', -apple-system, sans-serif;
--font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
```

### Type Scale

Fluid, responsive type scale using `clamp()` for seamless scaling:

```css
--t-2xs: clamp(0.68rem, 0.66rem + 0.10vw, 0.74rem);  /* 11-12px */
--t-xs:  clamp(0.76rem, 0.73rem + 0.14vw, 0.84rem);  /* 12-13px */
--t-sm:  clamp(0.86rem, 0.82rem + 0.18vw, 0.95rem);  /* 14-15px */
--t-md:  clamp(1.00rem, 0.95rem + 0.24vw, 1.13rem);  /* 16-18px — body */
--t-lg:  clamp(1.16rem, 1.08rem + 0.38vw, 1.38rem);  /* 19-22px */
--t-xl:  clamp(1.36rem, 1.22rem + 0.64vw, 1.75rem);  /* 22-28px */
--t-2xl: clamp(1.62rem, 1.38rem + 1.06vw, 2.30rem);  /* 26-37px */
--t-3xl: clamp(1.94rem, 1.54rem + 1.78vw, 3.05rem);  /* 31-49px */
--t-4xl: clamp(2.34rem, 1.70rem + 2.86vw, 4.05rem);  /* 37-65px */
--t-5xl: clamp(2.80rem, 1.80rem + 4.45vw, 5.40rem);  /* 45-86px */
--t-6xl: clamp(3.30rem, 1.75rem + 6.90vw, 7.20rem);  /* 53-115px */
--t-7xl: clamp(3.80rem, 1.35rem + 10.9vw, 9.80rem);  /* 61-157px */
--t-8xl: clamp(4.20rem, 0.40rem + 16.9vw, 13.5rem); /* 67-216px — hero */
```

### Line Heights & Tracking

```css
--lh-tight: 0.94;    /* Display headlines */
--lh-snug:  1.12;    /* Large headings */
--lh-base:  1.62;    /* Body text — optimal readability */
--lh-loose: 1.78;    /* Spacious paragraphs */

--tr-tight: -0.022em;  /* Tighten large type */
--tr-snug:  -0.012em;  /* Subtle tightening */
--tr-wide:   0.04em;   /* Looser spacing */
--tr-caps:   0.16em;   /* All-caps labels */
```

### Typography Classes

**Display Headings** — `.display`
```css
.display {
  font-family: var(--font-display);
  font-weight: 400;
  line-height: var(--lh-tight);
  letter-spacing: var(--tr-tight);
}

.display--sm  { font-size: var(--t-3xl); }
.display--md  { font-size: var(--t-4xl); }
.display--lg  { font-size: var(--t-5xl); }
.display--xl  { font-size: var(--t-6xl); }
.display--2xl { font-size: var(--t-7xl); }
.display--3xl { font-size: var(--t-8xl); }
```

**Eyebrow Labels** — `.eyebrow`
```css
.eyebrow {
  font-family: var(--font-ui);
  font-size: 0.56rem;          /* Fixed ~9px */
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
```

**Lede Text** — `.lede`
```css
.lede {
  font-family: var(--font-serif);
  font-size: var(--t-lg);
  line-height: var(--lh-base);
  color: var(--ink-soft);
}
```

---

## Spacing & Layout

### Space Scale

```css
--s-1: 0.25rem;  /*  4px */
--s-2: 0.5rem;   /*  8px */
--s-3: 0.75rem;  /* 12px */
--s-4: 1rem;     /* 16px — base unit */
--s-5: 1.5rem;   /* 24px */
--s-6: 2rem;     /* 32px */
--s-7: 2.5rem;   /* 40px */
--s-8: 3rem;     /* 48px */
--s-9: 4rem;     /* 64px */
--s-10: 5rem;    /* 80px */
--s-11: 6.5rem;  /* 104px */
--s-12: 8rem;    /* 128px */
--s-13: 10rem;   /* 160px */
--s-14: 13rem;   /* 208px */
```

### Semantic Spacing

```css
--gutter: clamp(1.15rem, 0.6rem + 2.6vw, 3.5rem);   /* Horizontal padding */
--section-y: clamp(4.5rem, 2.5rem + 8vw, 11rem);    /* Vertical section spacing */
```

### Container Widths

```css
--maxw: 82rem;        /* 1312px — Standard content */
--maxw-wide: 96rem;   /* 1536px — Wide layouts */
--maxw-text: 40rem;   /* 640px  — Optimal reading width */
```

### Layout Utilities

**Shell** — Standard content container
```css
.shell {
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.shell--wide { max-width: var(--maxw-wide); }
.shell--text { max-width: var(--maxw-text); }
```

---

## Glass Morphism

A signature visual element: translucent glass surfaces with backdrop blur and edge highlights.

### Glass Variables

```css
--glass-bg:        rgba(255, 255, 255, 0.58);  /* Base glass tint */
--glass-bg-strong: rgba(255, 255, 255, 0.78);  /* Stronger opacity */
--glass-bg-thin:   rgba(255, 255, 255, 0.4);   /* Subtle tint */
--glass-blur:      18px;                        /* Backdrop blur */
--glass-blur-lg:   32px;                        /* Stronger blur */
--glass-sat:       1.15;                        /* Saturation boost */

/* Edge highlights */
--glass-edge-a:    rgba(255, 255, 255, 0.95);  /* Bright edge */
--glass-edge-b:    rgba(0, 0, 0, 0.18);        /* Mid-tone */
--glass-edge-c:    rgba(20, 20, 20, 0.08);     /* Shadow */
```

### Glass Implementation

Header bar when scrolled (`.header.is-stuck`):
```css
.header.is-stuck .header__bar {
  background: linear-gradient(180deg, var(--glass-tint), transparent 62%), 
              var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat));
  box-shadow: inset 0 1px 0 var(--glass-hi), var(--sh-3);
}

/* Beveled edge using mask composite */
.header.is-stuck .header__bar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(150deg, 
    var(--glass-edge-a), 
    var(--glass-edge-b) 40%, 
    var(--glass-edge-c)
  );
  mask: linear-gradient(#000 0 0) content-box exclude, 
        linear-gradient(#000 0 0);
  pointer-events: none;
}
```

---

## Shadows & Depth

Six-level shadow system for consistent elevation:

```css
--sh-1: 0 1px 2px rgba(20,20,20,.045), 0 1px 1px rgba(20,20,20,.035);
--sh-2: 0 2px 4px rgba(20,20,20,.04), 0 4px 8px rgba(20,20,20,.045);
--sh-3: 0 4px 8px rgba(20,20,20,.04), 0 10px 20px rgba(20,20,20,.055);
--sh-4: 0 8px 16px rgba(20,20,20,.045), 0 20px 40px rgba(20,20,20,.07);
--sh-5: 0 16px 32px rgba(20,20,20,.05), 0 36px 72px rgba(20,20,20,.085);
--sh-6: 0 28px 56px rgba(20,20,20,.06), 0 64px 128px rgba(20,20,20,.11);

/* Special shadows */
--sh-green: 0 18px 44px rgba(0,0,0,.16), 0 4px 12px rgba(0,0,0,.1);
--sh-paper: 0 1px 1px rgba(20,20,20,.06), 0 8px 18px rgba(20,20,20,.07),
            0 22px 44px rgba(20,20,20,.05);
```

**Usage Guidance:**
- `sh-1` — Subtle lift (cards on surface)
- `sh-2` — Small elevation (buttons, inputs)
- `sh-3` — Floating elements (dropdown menus)
- `sh-4` — Modals, dialogs
- `sh-5` — Major overlays
- `sh-6` — Full-screen takeovers

---

## Border Radius

```css
--r-xs:   4px;   /* Tight corners */
--r-sm:   8px;   /* Small elements */
--r-md:   14px;  /* Cards, panels */
--r-lg:   22px;  /* Large surfaces */
--r-xl:   32px;  /* Hero elements */
--r-2xl:  44px;  /* Oversized */
--r-pill: 999px; /* Fully rounded */
```

---

## Motion & Transitions

### Duration Scale

```css
--d-xs:  140ms;   /* Instant feedback */
--d-sm:  260ms;   /* Quick transitions */
--d-md:  440ms;   /* Standard animations */
--d-lg:  720ms;   /* Prominent motion */
--d-xl:  1100ms;  /* Dramatic reveals */
--d-2xl: 1600ms;  /* Hero sequences */
```

### Easing Curves

```css
--e-silk:  cubic-bezier(0.16, 1, 0.30, 1);      /* Smooth, silky ease-out */
--e-swift: cubic-bezier(0.22, 1, 0.36, 1);      /* Quick, snappy */
--e-out:   cubic-bezier(0.33, 1, 0.68, 1);      /* Standard ease-out */
--e-inout: cubic-bezier(0.65, 0, 0.35, 1);      /* Symmetrical */
--e-drape: cubic-bezier(0.34, 1.16, 0.64, 1);   /* Gentle overshoot */
--e-gavel: cubic-bezier(0.5, 0, 0.15, 1.4);     /* Pronounced bounce */
```

### Animation Principles

1. **Respect `prefers-reduced-motion`** — Always provide non-motion alternatives
2. **Choreograph sequences** — Stagger related elements for visual flow
3. **Use appropriate duration** — Fast for small changes, slower for dramatic reveals
4. **Ease naturally** — Default to `--e-silk` for most transitions

### Example: Staggered Reveal

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity var(--d-lg) var(--e-silk),
              transform var(--d-lg) var(--e-silk);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

[data-reveal-delay="0.1"] { transition-delay: 100ms; }
[data-reveal-delay="0.2"] { transition-delay: 200ms; }
```

---

## Components

### Buttons

**Primary Button** — `.btn`
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: 0.7rem 1.5rem;
  border-radius: var(--r-pill);
  font-family: var(--font-ui);
  font-size: var(--t-sm);
  font-weight: 500;
  transition: all var(--d-sm) var(--e-swift);
}

.btn--green {
  background: linear-gradient(135deg, #2d3d2f, #1a2820);
  color: #f3f3f3;
  box-shadow: var(--sh-green);
}

.btn--lg {
  padding: 0.95rem 2rem;
  font-size: var(--t-md);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 24px 56px rgba(0,0,0,.22);
}
```

### Cards

**Glass Card**
```css
.card {
  position: relative;
  padding: var(--s-7);
  border-radius: var(--r-lg);
  background: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--sh-3);
}

.card::before {
  /* Glass edge highlight (same as header bar) */
}
```

### Header

**Sticky Glass Navigation**

The header uses a sophisticated state system:
- Default: Transparent background
- Scrolled (`.is-stuck`): Glass morphism activated
- Hidden (`.is-hidden`): Slides up on scroll down

```css
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: var(--z-header);
  transition: transform var(--d-lg) var(--e-silk);
}

.header.is-hidden {
  transform: translateY(-118%);
}
```

---

## Special Effects

### Bloom Effect

Glowing orbs for atmosphere and visual hierarchy:

```css
.bloom {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, currentColor, transparent 68%);
  filter: blur(60px);
  pointer-events: none;
  mix-blend-mode: soft-light;
}

.bloom--green {
  background: radial-gradient(circle, 
    rgba(80, 160, 100, 0.45), 
    transparent 68%
  );
}
```

### Noise Texture

Subtle grain overlay for depth:

```css
--noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");

.with-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--noise);
  opacity: 0.03;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### Perspective Grid

3D transformed grid for hero sections:

```css
.perspective-grid {
  position: absolute;
  inset: -10%;
  background-image:
    linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
  background-size: 64px 64px;
  transform: perspective(700px) rotateX(58deg) translateY(20%) scale(1.6);
  transform-origin: 50% 100%;
  mask-image: radial-gradient(60% 55% at 50% 64%, #000 0%, transparent 78%);
}
```

---

## Z-Index Scale

Consistent layering system:

```css
--z-base:    1;      /* Default layer */
--z-raise:   10;     /* Lifted content */
--z-sticky:  100;    /* Sticky elements */
--z-header:  400;    /* Site header */
--z-drawer:  600;    /* Slide-out panels */
--z-curtain: 800;    /* Page transitions */
--z-loader:  900;    /* Loading states */
--z-cursor:  1000;   /* Custom cursor (if used) */
```

---

## Accessibility

### Focus States

All interactive elements must have clear focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Glass elements get a glow */
.glass-element:focus-visible {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5),
              var(--sh-3);
}
```

### Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Add class-based override */
html.reduced-motion * {
  animation: none !important;
  transition: none !important;
}
```

### Color Contrast

All text meets WCAG AA standards:
- Body text: 16px at 4.5:1 contrast minimum
- Large text (18px+): 3:1 contrast minimum
- Interactive elements: 3:1 against backgrounds

---

## Responsive Breakpoints

The design uses fluid scaling via `clamp()` rather than hard breakpoints, but these are common checkpoints:

```css
/* Approximate breakpoints (not enforced, just reference) */
320px   — Mobile portrait
375px   — Small mobile
640px   — Large mobile / Small tablet
768px   — Tablet portrait
1024px  — Tablet landscape / Small desktop
1280px  — Desktop
1536px  — Large desktop
1920px  — XL desktop
```

### Responsive Patterns

**Fluid Type**
```css
font-size: clamp(1rem, 0.95rem + 0.24vw, 1.13rem);
```

**Fluid Space**
```css
padding-block: clamp(4.5rem, 2.5rem + 8vw, 11rem);
```

**Responsive Grid**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: var(--gutter);
}
```

---

## Design Tokens Summary

### Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#fdfdfc` | Primary background |
| `--ink` | `#141414` | Primary text |
| `--brass` | `#b08a3e` | Accent color |
| `--t-md` | `clamp(1rem, ..., 1.13rem)` | Body text |
| `--gutter` | `clamp(1.15rem, ..., 3.5rem)` | Horizontal padding |
| `--d-md` | `440ms` | Standard transition |
| `--e-silk` | `cubic-bezier(0.16, 1, 0.30, 1)` | Default easing |
| `--r-md` | `14px` | Standard border radius |
| `--sh-3` | `0 4px 8px...` | Standard shadow |

---

## Implementation Notes

### CSS Architecture

The system uses a modular CSS architecture:

```
globals.css          — Entry point
└─ tokens.css        — Design tokens (this document)
└─ base.css          — Resets, base styles
└─ components.css    — Reusable components
└─ pages.css         — Page-specific styles
└─ boot.css          — Initialization, utilities
```

### Naming Convention

- **Tokens**: `--{category}-{name}` (e.g., `--t-md`, `--s-4`)
- **Components**: BEM-style (e.g., `.header__bar`, `.btn--green`)
- **Utilities**: Descriptive (e.g., `.u-z1`, `.is-visible`)
- **Data attributes**: `data-*` (e.g., `data-reveal`, `data-magnetic`)

### Best Practices

1. **Use semantic tokens** — Prefer `--ink` over `--n-900`
2. **Leverage CSS custom properties** — They cascade and can be scoped
3. **Respect the type scale** — Don't use arbitrary font sizes
4. **Test dark mode** — Use `.is-invert` for section-level theming
5. **Validate motion** — Always test with `prefers-reduced-motion`

---

## Credits

**Design System** — SRMMUN 2026 Web Team  
**Typography** — Instrument Serif, Newsreader, Inter Tight  
**Inspiration** — United Nations visual identity, diplomatic correspondence, modern glassmorphism

---

*This is a living document. As the design evolves, update this reference to maintain consistency across the project.*
