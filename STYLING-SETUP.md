# Styling Architecture - SRMMUN 2026

## ✅ **FIXED: Tailwind CSS Now Properly Enabled**

### The Problem

Your website had **two styling systems competing**:

1. ✅ **Custom CSS** - Beautiful, semantic design system in `/src/styles/`
2. ❌ **Tailwind CSS** - Installed but **not configured or enabled**

This caused issues when trying to integrate modern React components that rely on Tailwind utility classes.

---

## Current Setup (Fixed)

### globals.css - Correct Load Order
```css
/* Custom design system loads FIRST */
@import "../styles/tokens.css";     
@import "../styles/base.css";       
@import "../styles/components.css"; 
@import "../styles/pages.css";      
@import "../styles/boot.css";       

/* Tailwind utilities load LAST (utilities only, no reset) */
@import "./tailwind.css";
```

### tailwind.css - Utilities Only
```css
@import "tailwindcss" layer(utilities);
```

### How It Works

- **Your custom CSS** loads first and establishes the base
- **Tailwind utilities** load last, providing only utility classes
- **No Tailwind reset/preflight** to prevent conflicts
- Both systems coexist without interference

---

## Writing Components

### Use Your Custom CSS for:
```tsx
// Page-level components with semantic classes
<section className="hero">
  <div className="shell">
    <h1 className="display display--xl">SRMMUN 2026</h1>
    <p className="lede">Your content here</p>
  </div>
</section>
```

### Use Tailwind for:
```tsx
// Utility-based layouts and third-party components
<div className="flex items-center justify-between gap-4">
  <button className="px-4 py-2 rounded-lg bg-white/90 hover:bg-white">
    Click me
  </button>
</div>
```

### Best of Both:
```tsx
// Combine them!
<section className="cta-band">
  <div className="shell flex flex-col items-center gap-8">
    <h2 className="display display--lg">Register Now</h2>
    <button className="btn btn--green flex items-center gap-2">
      <span>Get Started</span>
      <svg className="w-4 h-4">...</svg>
    </button>
  </div>
</section>
```

---

## Why Components Were Failing

### Before (Broken):
```tsx
// Tailwind classes did nothing
<div className="flex w-full rounded-2xl">  ❌
  <Image fill className="object-cover" /> ❌
</div>
```

### After (Fixed):
```tsx
// Now works properly!
<div className="flex w-full rounded-2xl">  ✅
  <Image fill className="object-cover" /> ✅
</div>
```

---

## File Structure

```
src/
├── app/
│   └── globals.css          ← Imports Tailwind + custom CSS
├── styles/
│   ├── tokens.css           ← Design tokens (colors, spacing, etc.)
│   ├── base.css             ← Base styles, typography
│   ├── components.css       ← Reusable components
│   ├── pages.css            ← Page-specific styles
│   └── boot.css             ← Utilities
└── components/
    └── ui/
        └── gallery-carousel.tsx  ← Now works with Tailwind!
```

---

## Tailwind CSS Version

You're using **Tailwind CSS v4** (the latest version):

### Key Differences from v3:
- ✅ No `tailwind.config.ts` needed
- ✅ Use `@import "tailwindcss"` instead of `@tailwind` directives
- ✅ Simpler, faster, more integrated with PostCSS
- ✅ Better compatibility with custom CSS

---

## Best Practices Going Forward

### ✅ DO:
1. Use **custom semantic classes** for site-wide components (header, hero, sections)
2. Use **Tailwind utilities** for one-off layouts and imported components
3. Keep design tokens in `tokens.css` and reference them with `var(--token-name)`
4. Test components in browser after adding Tailwind classes

### ❌ DON'T:
1. Don't disable Tailwind again - components need it
2. Don't use `!important` to override - layer order already handles precedence
3. Don't duplicate - if a semantic class exists, use it instead of utilities

---

## Troubleshooting

### If Tailwind classes aren't working:

1. **Check globals.css** - Make sure `@import "tailwindcss"` is present
2. **Restart dev server** - Stop and run `npm run dev` again
3. **Clear `.next` folder** - Run `rm -rf .next` and rebuild
4. **Check spelling** - Tailwind class names are case-sensitive

### If custom styles aren't working:

1. **Check import order** - Custom CSS should load *after* Tailwind
2. **Check specificity** - Your custom classes should be specific enough
3. **Use browser DevTools** - Inspect which styles are being applied

---

## Benefits of This Setup

✅ **Modern components work** - Libraries and examples using Tailwind just work  
✅ **Your design system intact** - All custom CSS still functions perfectly  
✅ **Faster development** - Use utilities for quick layouts, custom CSS for brand  
✅ **Type safety** - Tailwind in Next.js has great TypeScript support  
✅ **Small bundle** - Tailwind only includes classes you actually use  

---

## Example: Gallery Carousel

The gallery carousel now works because:

1. **Tailwind utilities** - `flex`, `w-full`, `rounded-2xl`, etc. now render
2. **Next.js Image** - `fill` prop works with proper positioning
3. **Responsive classes** - `sm:`, `md:`, `lg:` breakpoints work
4. **Hover states** - `hover:scale-110`, `active:scale-95` work

```tsx
<div className="flex gap-2">              {/* Tailwind utilities */}
  <button className="btn btn--green">    {/* Your custom class */}
    Register
  </button>
</div>
```

---

## Questions?

If you run into styling issues:

1. Check this document first
2. Verify globals.css has the correct imports
3. Make sure dev server is running
4. Use browser DevTools to inspect which styles are applied

**The website will now work properly with both systems!** 🎉
