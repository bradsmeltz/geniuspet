# PIF (Pet Identity First) Funnel

A 4-page frontend-only marketing funnel for GeniusPet to test Pet Identity First positioning. This is a belief validation experiment focused on messaging effectiveness and perceived value creation.

## Overview

This funnel tests the hypothesis that positioning a pet profile as a **digital identity** (rather than a lost pet solution) creates stronger perceived value and engagement.

**Key Positioning:**
- Frame the product as "activation" not "purchase"
- Tone is calm and inevitable, not urgent or fear-based
- Identity positioning, not emergency positioning

## File Structure

```
/pif-funnel/
├── index.html              # Landing page
├── profile-builder.html    # Fake onboarding (Step 1)
├── checkout.html           # Activation checkout (Step 2)
├── thank-you.html          # Post-purchase confirmation
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # Brand colors/fonts (CSS custom properties)
│   ├── global.css         # Shared styles (buttons, forms, typography)
│   └── pages.css          # Page-specific styles
├── js/
│   ├── profile-builder.js # Profile form logic & LocalStorage
│   └── utils.js           # Shared utilities
├── assets/
│   ├── images/
│   │   ├── logo.svg       # GeniusTag logo
│   │   └── hero-dog.jpg   # Landing hero image
│   └── icons/
│       ├── lock.svg
│       ├── checkmark.svg
│       ├── pet-silhouette.svg
│       ├── tag.svg
│       ├── scan.svg
│       └── profile.svg
└── README.md
```

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **Vanilla JavaScript** - No frameworks
- **LocalStorage** - Client-side data persistence

No backend, no database, no authentication required.

## How to Test Locally

### Option 1: Simple HTTP Server (Python)

```bash
cd pif-funnel
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Option 2: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Direct File Opening

You can open `index.html` directly in a browser, but some features (like LocalStorage) may work differently depending on browser security settings.

## User Flow

1. **Landing Page** (`index.html`)
   - User sees value proposition
   - Clicks "Activate Your Pet's Profile"

2. **Profile Builder** (`profile-builder.html`)
   - User enters pet name (required)
   - Optional: photo, breed, age
   - Data saved to LocalStorage
   - CTA enabled once pet name entered

3. **Checkout** (`checkout.html`)
   - Pet name flows from Step 1
   - Demo checkout form (no real payment)
   - Submit navigates to thank you

4. **Thank You** (`thank-you.html`)
   - Confirmation with order number
   - Next steps displayed
   - LocalStorage cleared

## Key Features

### Profile Builder
- **Required field**: Pet name only
- **Optional fields**: Photo, breed, age
- **Locked section**: Care notes shown as "Available after activation"
- **Real-time validation**: CTA disabled until pet name entered
- **Photo upload**: Preview with validation (image type, 5MB max)
- **Persistence**: Data saved to LocalStorage on change

### Data Flow
- Pet name passed via URL parameters between pages
- Falls back to LocalStorage if URL param missing
- LocalStorage cleared on thank you page (order complete)

## Brand Colors (CSS Variables)

```css
:root {
  /* Beige (Backgrounds) */
  --beige-light: #FAF7F5;
  --beige-medium: #E8DDD3;

  /* Neutral (Text) */
  --neutral-dark: #3D3D3D;
  --neutral-black: #1A1A1A;

  /* Red (CTAs) */
  --red-primary: #DD5A52;
  --red-dark: #C33D37;

  /* Blue (Accents) */
  --blue-primary: #4AA4C8;
}
```

## Responsive Breakpoints

- **Base**: Mobile-first (320px+)
- **Tablet**: 640px+
- **Desktop**: 1024px+

## Browser Compatibility

Tested on:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- iOS Safari
- Chrome Mobile

## Deployment

This is a static site that can be deployed to:

- **GitHub Pages**: Push to a gh-pages branch
- **Netlify**: Drop the folder or connect to Git
- **Vercel**: Import from Git repository
- **Any static hosting**: Upload files directly

No build step required.

## Important Notes

1. **This is a DEMO** - No actual payment processing
2. **Frontend only** - No server-side code
3. **LocalStorage only** - Data does not persist across devices
4. **Belief test** - Focus is on messaging, not features

## Design Principles

- Warm, calm, modern, spacious
- Beige backgrounds (not stark white)
- Soft shadows, rounded corners
- Generous padding and breathing room
- "Calm and inevitable" not "urgent and fear-based"
