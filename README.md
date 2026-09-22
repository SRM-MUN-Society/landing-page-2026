# SRM MUN 2026 — Official Website

The official conference website for the 14th Edition of SRM Model United Nations, taking place on **30, 31 October and 1 November 2026** at SRM Institute of Science and Technology, Kattankulathur, Chennai.

## 🌐 About

This is the digital home for SRMMUN 2026, built to provide delegates, partners, and visitors with all the information they need about the conference. The site features:

- **Home**: Conference overview with hero section, about the MUN Society, collaborations, and photo gallery
- **Committees**: Interactive 3D coverflow carousel showcasing all committees for the 14th edition
- **Schedule**: Three-day conference programme (coming soon)
- **Contact**: Direct access to the Secretariat team and email contacts

## 🏗️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Animations**: GSAP with ScrollTrigger
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd srmmun2026

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
srmmun2026/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── committees/        # Committees page
│   │   ├── schedule/          # Schedule page
│   │   ├── contact/           # Contact page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # UI components (carousels, etc.)
│   │   ├── Header.tsx        # Site header/navigation
│   │   ├── Footer.tsx        # Site footer
│   │   └── ...
│   ├── lib/                   # Utility functions
│   │   ├── illustrations.ts   # SVG illustration generators
│   │   ├── motion.ts         # GSAP animations & motion utilities
│   │   ├── app-init.ts       # App initialization & interactivity
│   │   └── ...
│   ├── data/                  # Content data files
│   │   └── committees.ts      # Committee information
│   └── styles/               # Additional CSS files
│       ├── components.css     # Component styles
│       ├── pages.css         # Page-specific styles
│       └── ...
├── public/                    # Static assets
│   ├── img/                  # Images and logos
│   └── gallery/              # Gallery photos
└── package.json
```

## 🎨 Design System

### Colors
- **Primary Gold**: `#c5a880` - Used for accents, buttons, highlights
- **Dark Background**: `#0a0a0a` - Primary background for dark sections
- **Text**: Shades of gray from `--g-100` to `--g-950`

### Typography
- **Display Font**: Instrument Serif (headings)
- **Body Font**: Inter (body text)
- **Mono Font**: JetBrains Mono (code/technical elements)

### Key Components
- **3D Coverflow Carousel**: Interactive committee showcase with perspective transforms
- **Glyph Portal**: Animated hero section with SVG illustrations
- **Gallery Carousel**: Fade-based image gallery with smooth transitions
- **Glass Morphism Cards**: Frosted glass effect cards with backdrop blur

## ✏️ Content Management

### Updating Committee Information

Edit `/src/data/committees.ts` to add, remove, or modify committees:

```typescript
{
  id: "unhrc",                    // Unique identifier
  title: "HUMAN RIGHTS",          // Committee name
  subtitle: "COUNCIL",            // Subtitle
  description: "...",             // Description text
  image: "https://...",          // Image URL (Unsplash)
  tag: "#UNHRC",                 // Optional hashtag
}
```

### Updating Contact Information

Edit `/src/components/ContactSection.tsx` to update Secretariat contacts and email addresses.

### Changing Registration Link

Update the `REGISTRATION_URL` constant in `/src/lib/app-init.ts`:

```typescript
const REGISTRATION_URL = 'https://your-registration-form-url';
```

## 🔧 Configuration

### Next.js Image Configuration

Remote image patterns are configured in `next.config.ts`. Currently allows:
- `images.unsplash.com` for committee images

Add new domains as needed:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
      pathname: '/**',
    },
  ],
}
```

### Environment Variables

Create a `.env.local` file for any environment-specific configuration:

```env
NEXT_PUBLIC_SITE_URL=https://srmmun.in
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

Key responsive features:
- Mobile navigation drawer
- Adaptive typography scaling
- Touch-friendly carousels
- Optimized image loading

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Reduced motion support (respects `prefers-reduced-motion`)
- Screen reader friendly

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

### Other Platforms

The site can be deployed to any platform supporting Next.js:

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎯 Key Features

### Animation System
- GSAP-powered animations
- ScrollTrigger-based scroll animations
- Magnetic button effects
- Reveal animations on scroll
- Smooth page transitions

### Illustrations
- Custom SVG illustrations generated via TypeScript
- Colonnade mark (MUN Society logo)
- Clock tower
- Various thematic icons (gavel, badge, placard, etc.)

### Header System
- Auto-detects dark/light backgrounds
- Switches logo color based on page background
- Sticky navigation with scroll progress
- Mobile-responsive drawer navigation

## 🤝 Secretariat Contact

- **Secretary General**: Meeraja S (+91 9500072995)
- **Deputy Secretary General**: Sahana Parameswaran (+91 7338702651)
- **Delegation Email**: delegateaffairs.srmmun@gmail.com
- **General Email**: srmmunsociety26@gmail.com
- **Instagram**: [@srm_munsoc](https://www.instagram.com/srm_munsoc/)

## 🏛️ Collaborations

SRMMUN 2026 is recognized by:
- United Nations Academic Impact (UNAI)
- Sustainable Development Solutions Network (SDSN)

## 📄 License

© 2026 SRM MUN Society. All rights reserved.

---

Built with ❤️ by the SRM MUN Society Organising Committee for the 14th Edition.
