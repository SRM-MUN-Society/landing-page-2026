# CSS Cleanup & Conflict Resolution

## ✅ Fixed: Spacing Issues

### The Problem
Tailwind's **Preflight** (CSS reset) was adding default margins and padding that conflicted with your custom `.section` padding, creating excessive whitespace.

### The Solution
Changed the import order and restricted Tailwind to **utilities layer only**:

```css
/* globals.css - NEW ORDER */
@import "../styles/tokens.css";     /* Custom tokens first */
@import "../styles/base.css";       /* Your base styles */
@import "../styles/components.css"; /* Your components */
@import "../styles/pages.css";      /* Page styles */
@import "../styles/boot.css";       /* Utilities */
@import "./tailwind.css";           /* Tailwind utilities ONLY */
```

```css
/* tailwind.css - Utilities only, no reset */
@import "tailwindcss" layer(utilities);
```

---

## CSS System Analysis

### Your Custom CSS (Keep & Use)

**Design Tokens** (`tokens.css`)
- ✅ Custom properties: `--bg`, `--ink`, `--accent`, `--brass`
- ✅ Spacing scale: `--s-1` through `--s-14`, `--gutter`, `--section-y`
- ✅ Typography scale: `--t-2xs` through `--t-8xl`
- ✅ Motion: `--d-xs` through `--d-2xl`, easing curves
- ✅ Shadows: `--sh-1` through `--sh-6`
- ✅ Glass system: `--glass-bg`, `--glass-blur`, etc.

**Semantic Classes** (`base.css`, `components.css`)
- ✅ `.display`, `.display--xl`, `.display--lg` - Display headings
- ✅ `.eyebrow` - Uppercase labels
- ✅ `.lede` - Lead paragraphs
- ✅ `.shell`, `.shell--wide`, `.shell--text` - Containers
- ✅ `.section`, `.section--tight` - Section spacing
- ✅ `.glass` - Glass morphism effects
- ✅ `.btn`, `.btn--green` - Buttons
- ✅ `.header`, `.nav`, `.footer` - Page chrome

**Keep using these!** They're part of your brand identity.

---

## Tailwind Utilities (Now Available)

### Layout
```tsx
<div className="flex flex-col items-center justify-between gap-4">
<div className="grid grid-cols-3 gap-6">
<div className="absolute top-0 left-0 w-full h-full">
```

### Spacing
```tsx
<div className="p-4 px-6 mt-8 mb-4">
<div className="space-y-4">
```

### Sizing
```tsx
<div className="w-full h-[600px]">
<div className="w-1/2 h-screen">
<div className="min-w-0 max-w-7xl">
```

### Visual
```tsx
<div className="rounded-2xl shadow-lg opacity-90">
<div className="bg-white/90 backdrop-blur-sm">
<div className="border border-black/10">
```

### Typography
```tsx
<p className="text-sm font-medium leading-tight">
<h2 className="text-3xl font-bold tracking-tight">
```

### States
```tsx
<button className="hover:scale-110 active:scale-95">
<div className="focus-visible:outline focus-visible:outline-2">
```

---

## Removed Conflicts

### ❌ Removed: Tailwind Preflight Reset
- Was adding unwanted margins/padding
- Conflicted with `.section` spacing
- Now restricted to utilities only

### ❌ Prevented: Duplicate Utilities
Your custom CSS already has many utilities that Tailwind also provides. Here's how to decide which to use:

| Feature | Use Custom CSS | Use Tailwind |
|---------|---------------|--------------|
| Section containers | `.shell`, `.section` ✅ | - |
| Brand typography | `.display`, `.eyebrow`, `.lede` ✅ | - |
| Buttons | `.btn`, `.btn--green` ✅ | - |
| Glass effects | `.glass` ✅ | - |
| Layout grids/flex | - | `flex`, `grid`, `gap-4` ✅ |
| Quick spacing | - | `p-4`, `mt-8`, `space-y-4` ✅ |
| Absolute positioning | - | `absolute`, `top-0`, `left-0` ✅ |
| Responsive sizes | - | `w-full`, `h-[600px]` ✅ |
| Hover/focus states | - | `hover:scale-110` ✅ |

---

## Overlap Resolution

### Spacing
**Custom:** `.section { padding-block: var(--section-y); }`  
**Tailwind:** `py-8`, `py-12`

**Decision:** Use `.section` for page sections, Tailwind `py-*` for component internals.

### Containers
**Custom:** `.shell { max-width: var(--maxw); }`  
**Tailwind:** `max-w-7xl`, `mx-auto`

**Decision:** Use `.shell` for main content, Tailwind utilities for nested containers.

### Typography
**Custom:** `.display`, `.lede`, `.eyebrow`  
**Tailwind:** `text-4xl`, `font-bold`

**Decision:** Use custom classes for brand typography, Tailwind for utility text.

### Colors
**Custom:** `var(--bg)`, `var(--ink)`, `var(--accent)`  
**Tailwind:** `bg-white`, `text-black`

**Decision:** Reference custom properties in Tailwind: `bg-[var(--bg)]`

---

## Best Practices

### ✅ DO:

1. **Use custom semantic classes for brand identity:**
   ```tsx
   <section className="section">
     <div className="shell">
       <h2 className="display display--lg">Heading</h2>
       <p className="lede">Lead text</p>
     </div>
   </section>
   ```

2. **Use Tailwind for component internals:**
   ```tsx
   <div className="flex items-center gap-4 p-6 rounded-xl">
     <Image className="w-12 h-12 rounded-full" />
     <div className="flex-1">...</div>
   </div>
   ```

3. **Combine both systems:**
   ```tsx
   <section className="section is-invert">
     <div className="shell flex flex-col items-center gap-8">
       <h2 className="display display--xl">Title</h2>
       <div className="grid grid-cols-3 gap-6 w-full">
         <div className="glass p-6">...</div>
       </div>
     </div>
   </section>
   ```

### ❌ DON'T:

1. **Don't duplicate existing utilities:**
   ```tsx
   /* Bad - custom class already exists */
   <div className="section p-8">  ❌
   
   /* Good - use the semantic class */
   <div className="section">  ✅
   ```

2. **Don't override Tailwind with inline styles:**
   ```tsx
   /* Bad */
   <div className="flex" style={{ display: 'flex' }}>  ❌
   
   /* Good */
   <div className="flex">  ✅
   ```

3. **Don't fight specificity:**
   ```tsx
   /* Bad - competing styles */
   <div className="shell max-w-full">  ❌
   
   /* Good - use modifier */
   <div className="shell--flush">  ✅
   ```

---

## CSS Architecture Summary

```
Load Order:
1. tokens.css     ← Design system foundations
2. base.css       ← Base styles, typography, resets
3. components.css ← Semantic component classes
4. pages.css      ← Page-specific styles
5. boot.css       ← Custom utilities
6. tailwind.css   ← Tailwind utilities ONLY (no reset)
```

**Result:**
- ✅ No spacing conflicts
- ✅ Custom CSS takes precedence where defined
- ✅ Tailwind utilities available where needed
- ✅ Both systems coexist peacefully

---

## Maintenance

### Adding New Styles

**For brand/semantic components:**
Add to `components.css`:
```css
.card {
  padding: var(--s-6);
  border-radius: var(--r-lg);
  background: var(--bg-alt);
}
```

**For one-off layouts:**
Use Tailwind directly:
```tsx
<div className="flex items-center gap-4 p-6 rounded-lg bg-neutral-50">
```

### Checking for Conflicts

If something looks wrong:

1. **Inspect in DevTools** - See which styles are applied
2. **Check specificity** - Custom classes should win
3. **Verify load order** - globals.css should match structure above
4. **Clear cache** - Delete `.next` folder and rebuild

---

## Migration Notes

If you ever need to remove Tailwind:
1. Delete `tailwind.css`
2. Remove `@import "./tailwind.css"` from `globals.css`
3. Uninstall: `npm uninstall tailwindcss @tailwindcss/postcss`

If you need to add more Tailwind features:
1. Update `tailwind.css` with additional layers
2. Document any new utilities being used
3. Test for conflicts with custom CSS

---

**The system is now clean and conflict-free!** 🎉
