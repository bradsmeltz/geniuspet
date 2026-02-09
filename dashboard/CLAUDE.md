# CLAUDE.md - GeniusPet Dashboard Project

## Visual References

**IMPORTANT:** Review these images before building:

- `reference-current-dashboard.png` — The current overwhelming design. **AVOID** this: too many elements, duplicate upsells, feature lists instead of outcomes.
  
- `reference-pet-profile.png` — The pet profile/Digital Care ID. **MATCH** this design language: warm colors, card-based, friendly aesthetic, coral CTAs.

## Project Summary

Building a mobile-first, conversion-optimized customer dashboard for GeniusPet (smart pet ID tag company). Deploy to GitHub Pages as functional prototype.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Lucide React (icons)
- GitHub Pages (deployment)

## Key Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Deploy (automatic via GitHub Actions on push to main)
git push origin main
```

## Architecture

### State Management
Use React Context for global state:
- `UserContext`: user data, plan status, tour completion
- `PetContext`: pets array, active pet, safety score calculations

### Routing
```
/                 → Dashboard (main view)
/profile          → Digital Care ID
/activity         → Scan history
/settings         → User settings
/demo             → Demo controls (hidden)
```

### Key Components
```
src/
├── components/
│   ├── dashboard/
│   │   ├── SafetyScore.jsx      # The conversion engine
│   │   ├── NextAction.jsx       # Single CTA based on state
│   │   ├── UpgradeSection.jsx   # Advanced Protection pitch
│   │   └── LostPetButton.jsx    # Always visible emergency button
│   └── tour/
│       └── GuidedTour.jsx       # 4-step onboarding
```

## Critical Business Logic

### Safety Score Calculation
```javascript
// FREE actions (max 65%):
// - Photo: +10%
// - Basic profile: +15%
// - Health info: +10%
// - Emergency contacts: +15%
// - Phone verified: +10%
// - Behavior info: +5%

// PAID actions (remaining 35%):
// - SMS alerts: +10%
// - Lost Pet Network: +15%
// - GPS sharing: +10%
```

### User Journey States
1. No pet registered → CTA: "Register Your Pet"
2. Profile incomplete → CTA: "Complete [Name]'s Profile (+X%)"
3. Profile complete, free plan → CTA: "Activate Full Protection"
4. Has Advanced → CTA: "Add GeniusVet"
5. Has GeniusVet → CTA: "Add GeniusInsure"

## Design Rules

### Colors
```css
--primary: #C84B31;      /* GeniusPet coral/red */
--dark: #2D3436;         /* Near black */
--gray: #636E72;         /* Body text */
--light: #F5F5F5;        /* Backgrounds */
--cream: #E8D5B7;        /* Accent */
```

### Mobile-First
- Base: 375px width
- Max 5-6 UI elements visible at once
- Bottom navigation bar
- ONE primary CTA per view
- "My Pet Lost" button always visible

### Copy Rules
- Use pet's name, not "your pet"
- "Activate" not "upgrade"
- Show outcomes, not features
- Dynamic member counts: "[47] neighbors"

## Files to Create

Priority order:
1. `vite.config.js` - with base path for GitHub Pages
2. `tailwind.config.js` - with custom colors
3. `src/data/mockData.js` - demo data
4. `src/context/*.jsx` - state management
5. `src/hooks/useSafetyScore.js` - score calculation
6. `src/components/dashboard/*.jsx` - main components
7. `src/components/tour/GuidedTour.jsx` - onboarding
8. `src/pages/Dashboard.jsx` - main page
9. `.github/workflows/deploy.yml` - GitHub Pages deployment

## Testing Checklist

- [ ] Safety Score calculates correctly for all field combinations
- [ ] Tour shows only on first visit (localStorage)
- [ ] All 5 user states render correctly
- [ ] Pet switcher works for multi-pet
- [ ] Mobile layout at 375px
- [ ] "My Pet Lost" button always visible
- [ ] Upgrade CTA uses outcome-focused copy
- [ ] GitHub Pages deploys successfully

## Common Issues

### GitHub Pages 404 on routes
Add `404.html` that redirects to `index.html`, or use hash routing.

### Vite base path
Must set `base: '/geniuspet-dashboard/'` in vite.config.js

### Tour keeps showing
Check localStorage key: `geniuspet_tour_completed`

## Reference Files

See `CLAUDE_CODE_PROMPT.md` for complete:
- Product context and business model
- Guided tour copy
- Wireframe structures
- Conversion copy framework
- Full file structure
