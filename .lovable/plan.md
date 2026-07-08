# Kedah Tech Valley — Landing Page Build

A premium, cinematic single-page site for Kedah Tech Valley (PPTDK), built on the existing TanStack Start + Tailwind v4 + shadcn stack.

## Design system

Update `src/styles.css` with a dark institutional palette:

- Background: deep navy-black `oklch(0.14 0.02 250)`
- Surface / card: charcoal with subtle blue `oklch(0.19 0.02 250)`
- Border: thin cool white at 8–12% opacity
- Primary (Kedah green): `oklch(0.82 0.18 145)` — soft, luminous
- Accent (soft gold): `oklch(0.82 0.12 85)`
- Foreground: near-white `oklch(0.97 0.005 250)`
- Muted foreground: `oklch(0.68 0.02 250)`
- Gradients + glow tokens: `--gradient-hero`, `--gradient-glow`, `--shadow-glow`, `--shadow-elegant`

Typography via Google Fonts `<link>` in `__root.tsx`:

- Display: **Instrument Serif** for editorial accents + **Space Grotesk** for large sans headlines
- Body: **Inter**
- Mono (metric cards / eyebrows): **JetBrains Mono**

Global effects: glassmorphism utility (`backdrop-blur` + border + gradient overlay), subtle grain, soft radial glow behind hero.

## Route + head metadata

`src/routes/index.tsx` becomes the full landing page. Update `__root.tsx` head with real title/description/OG:

- Title: "Kedah Tech Valley — Merancakkan Ekonomi Digital Kedah"
- Description: institutional summary in Malay/English

## Content

Single `src/content/site.ts` object exporting all copy verbatim from the brief (nav, hero, sections 2–12, ecosystem lists, membership tiers, programs, news placeholders, footer, socials). No invented stats or endorsements.

## Components (in `src/components/ktv/`)

1. `Nav.tsx` — sticky glass nav, wordmark left, center links, "Join Community" CTA, mobile Sheet hamburger.
2. `Hero.tsx` — full-viewport cinematic hero:
  - Animated SVG/Canvas network background (`NetworkBackground.tsx`) — particles + connecting lines, subtle green nodes
  - Abstract stylized Kedah map silhouette as SVG overlay with glowing nodes
  - Editorial headline, sub, 2 CTAs
  - Floating metric cards (glass) with soft float animation
  - Scroll indicator
3. `About.tsx` — 3 glass cards (Community / Catalyst / PPTDK)
4. `VisionMission.tsx` — split layout, vision left, 5 mission cards right
5. `Problem.tsx` — 4 opportunity-framed cards
6. `Role.tsx` — 4-pillar grid with lucide icons
7. `Ecosystem.tsx` — categorized grid (Community / Agencies / Industry) + disclaimer note; stylized digital Kedah ecosystem map as decorative SVG
8. `Membership.tsx` — current 3 tiers + proposed 6-tier comparison grid + status note
9. `Programs.tsx` — 6 activity cards + gallery grid with placeholder images (using existing user-uploaded event photos via Lovable Assets)
10. `PartnerCTA.tsx` — institutional CTA band with gradient + glow
11. `News.tsx` — 3 placeholder article cards
12. `Contact.tsx` — form (name/email/org/interest select/message) + social links row (frontend only, no backend wiring)
13. `Footer.tsx` — 4 columns + PPTDK legal line + copyright

Shared: `SectionHeader.tsx` (eyebrow + headline), `GlassCard.tsx`.

## Motion

Use CSS-only animations from existing tokens (`animate-fade-in`, keyframes for float, slow drift on network background). No new heavy libs; keep smooth scroll via CSS `scroll-behavior`.

## Images

Use the uploaded KTV event photos (`image_1.png`, `image.png`, `mebers.jpg`, `image_2.png`, `image_3.png`) via `lovable-assets` CLI for the Programs gallery. Hero visual is pure SVG/canvas — no stock photos, no AI-generated hero image.

## Responsive & a11y

- Mobile-first grids with `grid-cols-[minmax(0,1fr)_auto]` on multi-item rows
- `min-w-0` / `shrink-0` / `truncate` per responsive rules
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), single H1 (hero)
- AA contrast against dark surface; focus rings on all interactive elements

## Out of scope (not requested)

- Backend for contact form (form is UI only; submit shows toast)
- Auth, DB, Lovable Cloud
- Additional routes beyond `/`

## Files touched

- `src/styles.css` (tokens + utilities)
- `src/routes/__root.tsx` (fonts, meta)
- `src/routes/index.tsx` (compose sections)
- `src/content/site.ts` (new)
- `src/components/ktv/*` (new, ~13 files)  
  
  
Makesure the Kedah Tech Valley website so it feels much closer to a premium cinematic website like [alethia.earth](http://alethia.earth), especially in terms of scroll-based animation, pinned visual storytelling, parallax, hover effects, and image usage.
  Very important:  
  Use the actual images from this Gamma deck as the main visual assets:  
  [https://pitch-deck-kedah-tech-va-06m677l.gamma.site/kedahtechvalley](https://pitch-deck-kedah-tech-va-06m677l.gamma.site/kedahtechvalley)
  Extract and use:
  - Kedah Tech Valley logo
  - community / committee group photos
  - event photos
  - strategy graphics
  - network / ecosystem visuals
  - membership-related visuals
  - any available KTV branded images from the deck
  Do not replace everything with generic stock photos. The website must feel authentic to Kedah Tech Valley by using real Gamma deck images wherever possible.
  If direct extraction from Gamma is not possible, create clearly named image placeholders and tell me exactly which images I need to upload manually into the project assets folder.
  Animation and interaction requirements:
  1. Scroll-tracking hero animation  
  Create a hero section where the visual reacts to scroll progress.  
  As the user scrolls:
  - background image slowly zooms out
  - digital grid fades in
  - floating metric cards move at different speeds
  - Kedah Tech Valley logo or symbol subtly scales and fades
  - headline moves upward slightly
  - CTA buttons fade into position
  Use Framer Motion if available. Use useScroll and useTransform for scroll-linked animation.
  2. Pinned storytelling section  
  Create a sticky / pinned section after the hero.  
  The left side should stay fixed with a large visual area.  
  The right side should scroll through 4 story cards:
  - Community Platform
  - Digital Economy Catalyst
  - Industry × Academia × Government
  - Strategic Technology Ecosystem
  As each card enters view:
  - the image on the left changes
  - metric cards update
  - background glow shifts
  - small network nodes animate
  This section should feel like an animated scroll documentary, not a normal static webpage.
  3. Parallax image layers  
  Use multiple layers:
  - main Gamma photo layer
  - dark gradient overlay
  - subtle grid layer
  - floating particles / dots
  - thin network lines
  - small floating cards
  Each layer should move at a different scroll speed for parallax depth.
  4. Hover effects  
  Add polished hover effects across the website:
  - cards lift slightly on hover
  - border glow appears
  - image zooms subtly inside the card
  - CTA buttons have animated shine / glow
  - ecosystem logos/cards have soft magnetic hover movement
  - membership cards expand or reveal extra detail on hover
  - case study cards show a dark overlay and “View details” on hover
  Keep hover effects premium and subtle. Do not make them childish or too flashy.
  5. Animated image gallery  
  Create a section using real images from the Gamma deck.  
  Layout:
  - large featured image
  - smaller stacked images
  - horizontal marquee or slow-moving gallery row
  - hover to pause / zoom
  - dark overlays with captions:
    - “Komuniti Teknologi Digital Kedah”
    - “Industri × Akademia × Kerajaan”
    - “Driving Kedah’s Digital Future”
    - “Sokongan Jaringan Komuniti & Agensi”
  6. Ecosystem network animation  
  For the “Kekuatan & Sokongan Jaringan” section, create an animated network map.  
  Categories:
  - Komuniti Terkemuka
  - Agensi Penting
  - Tech Industri
  - Strategic Organizations
  Use nodes and connecting lines.  
  On hover:
  - highlight connected category
  - show short tooltip
  - dim unrelated nodes
  Do not claim legal partnership unless stated. Use wording such as:  
  “Jaringan dan sokongan ekosistem yang sedang berkembang.”
  7. Scroll reveal for sections  
  Every major section should animate in:
  - eyebrow text fades up
  - headline fades up with slight delay
  - cards stagger one by one
  - images slide in with parallax
  - numbers count up smoothly where applicable
  Use reduced-motion support for accessibility.
  8. Animated metric cards  
  Add floating dashboard-style cards inspired by Alethia’s data cards, but for KTV:
  - “7+ Bulan Konsisten”
  - “Tech Awareness”
  - “Industri × Akademia × Kerajaan”
  - “Komuniti × Agensi”
  - “PPTDK Registered”
  - “Driving Kedah’s Digital Future”
  Cards should float subtly, react to scroll, and have glassmorphism styling.
  9. Design quality  
  Make the overall website:
  - darker
  - more cinematic
  - more premium
  - less generic SaaS
  - more institutional and ecosystem-driven
  - more suitable for government agencies, tech founders, universities, students, and strategic partners
  Use deep navy, black, Kedah green, gold accents, white typography, subtle gradients, soft glow, large editorial headings, and elegant spacing.
  10. Performance  
  Keep animations smooth and lightweight.  
  Use lazy loading for images.  
  Compress images where possible.  
  Avoid heavy video files unless necessary.  
  Prefer CSS / Framer Motion scroll-linked animation over huge background videos.
  Build this upgrade directly into the current Kedah Tech Valley website.  
    
  Use all uploaded Kedah Tech Valley assets as the primary website visuals. Do not use generic stock photos unless no suitable uploaded image exists. Use the Gamma deck PDF as content reference, but use the uploaded individual image files as actual website images.
  Use the uploaded Alethia screenshots only as visual and interaction references for premium layout, scroll tracking, hover effects, parallax, floating metric cards, and cinematic spacing. Do not copy Alethia’s logo, wording, images, or branding.