# GeniusPet Dashboard - Claude Code Build Prompt

## Visual References (IMPORTANT)

This project includes visual reference images. Before building, review:

### 1. `reference-current-dashboard.png`
**What it shows:** The current dashboard design that is TOO OVERWHELMING
**What to learn from it:**
- This has 15+ UI elements competing for attention
- 8+ upsell touchpoints creating decision fatigue
- Left sidebar navigation that doesn't work on mobile
- Multiple duplicate upgrade CTAs
- Stats boxes that don't drive action
- Feature lists instead of outcome-focused copy

**DO NOT replicate this design.** Use it as a reference for what to AVOID.

### 2. `reference-pet-profile.png`
**What it shows:** The Digital Care ID / Pet Profile that finders see when scanning
**What to learn from it:**
- The visual style and color palette to match
- The warm, friendly tone
- Card-based layout with expandable sections
- The "Contact my parents" CTA styling
- How pet information is organized

**DO match this design language** for consistency across the product.

### Key Design Takeaways:
- Use the coral/red (#C84B31) as the primary action color
- Warm cream backgrounds for cards
- Rounded corners, friendly aesthetic
- Clear visual hierarchy
- Mobile-first card layouts

---

## Project Overview

Build a mobile-first, conversion-optimized customer dashboard for GeniusPet, a direct-to-consumer pet technology company that sells the GeniusTag smart pet ID tag. This dashboard will be deployed to GitHub Pages as a functional prototype/demo.

**Repository Name:** `geniuspet-dashboard`
**Deploy Target:** GitHub Pages (https://[username].github.io/geniuspet-dashboard)
**Tech Stack:** React + Tailwind CSS (Vite build)

---

## Product Context

### What is GeniusPet?

GeniusPet sells a smart pet ID tag with a QR code. When someone finds a lost pet and scans the tag:
1. The pet owner receives an instant notification (email for free users, SMS + phone + GPS for paid)
2. The finder sees the pet's Digital Care ID profile
3. The finder can contact the owner safely without seeing personal contact info

### The Business Model

**Free Tier (comes with tag purchase):**
- Digital Care ID with health, safety, and contact fields
- Email scan alerts only

**Mid-Tier Plan:**
- Everything in Free
- Unlocks Pet Routines, Environment, Comfort, and Preferences sections

**Advanced Protection Plan ($89/year, $4.95/mo quarterly, or $297 lifetime):**
- Everything in Free and Mid-Tier
- Instant SMS scan alerts
- Phone call alerts
- Finder-provided GPS location sharing
- Lost Pet Flyer generation (downloadable for social sharing)
- Local Lost Flyer Distribution (sent to 10 nearest shelters/rescues)
- National Lost Pet Alert Network (alerts GeniusPet members within 20-mile radius)
- Free replacement tags

**Additional Products:**
- GeniusVet: 24/7 veterinary video call support
- GeniusInsure: Pet insurance

### Revenue Priority Order
1. Advanced Protection Plan (primary conversion goal)
2. GeniusVet (secondary, after Advanced conversion)
3. GeniusInsure (tertiary)

---

## The Core Problem We're Solving

The current dashboard is overwhelming:
- 15+ UI elements competing for attention
- 8+ upsell touchpoints creating decision fatigue
- Near-zero conversion rates
- Not mobile-first

### The Solution: Three Core Principles

1. **Dashboard as Pet Safety Control Center** - Not a settings page. A place where owners feel in control.

2. **Safety Score as Gamified Conversion Funnel** - Transform a percentage into a progress mechanism that naturally guides users toward upgrade.

3. **One CTA Per Screen State** - Based on journey stage, present ONE clear next action.

---

## Brand Mission

**"Every pet deserves a community watching out for them."**

This captures the network effect: when one pet goes missing, dozens of neighbors are mobilized instantly. Users aren't just customers—they're part of a community.

---

## User Journey States

The dashboard has 5 states. Each state has ONE primary CTA.

### State 1: Tag Purchased, No Pet Registered
- **User Mindset:** "I just bought this. What do I do now?"
- **Primary CTA:** "Register Your Pet"
- **Dashboard:** Minimal. Welcome message + single action card.

### State 2: Pet Registered, Profile Incomplete
- **User Mindset:** "Is my pet protected? Did I do it right?"
- **Primary CTA:** "Complete [Pet Name]'s Profile" (specific next field)
- **Dashboard:** Pet card visible, Safety Score prominent, single next action.
- **Safety Score:** 25-65% depending on completion

### State 3: Profile Complete, No Upgrade
- **User Mindset:** "This is working. Could it do more?"
- **Primary CTA:** "Activate Full Protection — $89/year"
- **Dashboard:** Safety Score at ceiling (65%), clear upgrade path to 100%.

### State 4: Advanced Protection Active
- **User Mindset:** "My pet is fully protected. What else?"
- **Primary CTA:** "Add 24/7 Vet Access"
- **Dashboard:** Safety Score at 100%, introduce GeniusVet.

### State 5: Has GeniusVet
- **User Mindset:** "I'm invested. What about financial protection?"
- **Primary CTA:** "Protect Against the Unexpected"
- **Dashboard:** Introduce GeniusInsure, referral program.

---

## Safety Score System

The Safety Score is the psychological engine of the dashboard.

### Score Calculation

**FREE ACTIONS (Max 65%):**
- Pet photo uploaded: +10%
- Basic profile complete (name, breed, age, sex, weight): +15%
- Health info added (allergies, medications): +10%
- Emergency contacts added: +15%
- Phone number verified: +10%
- Behavioral info (kid-friendly, other pets): +5%

**PAID ACTIONS - Advanced Protection (Remaining 35%):**
- SMS alerts enabled: +10%
- Lost Pet Network activated: +15%
- GPS location sharing enabled: +10%

### Presentation Rules
- Always show as progress, not judgment
- Good: "You're 45% of the way to full protection for Louis"
- Bad: "Your protection is only 45%"
- Always show specific next action: "Add emergency contacts (+15%)"

---

## Guided Tour Flow (First Login Only)

4 steps, no selling, pure orientation.

### Step 1: Welcome & Validation
- **Headline:** "Welcome to GeniusPet, [Name]!"
- **Body:** "You just did something important for [Pet Name]. If they ever get lost, anyone who finds them can scan their GeniusTag and connect with you instantly."
- **CTA:** "See How It Works →"

### Step 2: How the Tag Works
- **Headline:** "Here's what happens if [Pet Name] is found"
- **Body:** "Someone scans the tag → You get notified instantly → They see [Pet Name]'s profile and can contact you safely."
- **CTA:** "Got It →"

### Step 3: The Community
- **Headline:** "You're not alone"
- **Body:** "There are [X] GeniusPet members within 5 miles of you. If any of their pets go missing, you can help. And if [Pet Name] ever needs it, they'll do the same."
- **CTA:** "That's Amazing →"

### Step 4: Your Dashboard
- **Headline:** "This is your Pet Safety Control Center"
- **Body:** "Here you can see [Pet Name]'s protection status, update their profile, and—if you ever need it—activate lost pet mode with one tap."
- **CTA:** "Let's Get Started"

---

## Mobile-First Wireframe Structure

### Above the Fold (State 2/3)
```
┌─────────────────────────────────┐
│  [Pet Photo]  [Pet Name]        │
│  Protected ✓                    │
│                                 │
│  ┌─────────────────────────┐    │
│  │   Safety Score: 45%     │    │
│  │   ████████░░░░░░░░░░░   │    │
│  │                         │    │
│  │   Next: Add emergency   │    │
│  │   contacts (+15%)       │    │
│  │                         │    │
│  │   [Add Contacts →]      │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  🚨 MY PET IS LOST      │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

### Below the Fold (Upgrade Section)
```
┌─────────────────────────────────┐
│  What happens if [Pet] is lost? │
│                                 │
│  Currently:                     │
│  ✓ Tag shows your contact info  │
│  ✓ You get an email alert       │
│                                 │
│  With Advanced Protection:      │
│  ✓ Instant SMS + phone call     │
│  ✓ GPS location of scan         │
│  ✓ Alert [47] neighbors         │
│  ✓ Auto-notify 10 shelters      │
│                                 │
│  [Upgrade - $89/year]           │
└─────────────────────────────────┘
```

### Mobile Navigation (Bottom Bar)
- Home (Dashboard)
- Profile (Pet's Digital Care ID)
- Activity (Scan history, alerts)
- Settings

---

## Digital Care ID (Pet Profile)

This is what the finder sees when they scan the tag. Fields include:

**Basic (Required):**
- Name, Age, Breed, Sex, Weight

**Additional Info:**
- Kid-friendly (yes/no)
- Okay with Other Pets (yes/no)
- Spayed/Neutered
- Rabies vaccine status

**Health Sections (Expandable):**
- Allergies
- Medical Issues
- Prescription Medication
- Food preferences

**Advanced (Paid plans):**
- Pet Routines (exercise, bathroom habits, behavioral notes)
- Pet Environment (home setting, children, other pets)
- Pet Comfort (fears, soothing methods, sleep preferences)
- Pet Preferences (treats, toys, affection preferences)

---

## Conversion Copy Guidelines

### Upgrade CTA Copy

**Headlines:**
- "When [Pet Name] goes missing, we mobilize your community in seconds."
- "[47] neighbors ready to help find [Pet Name]"
- "The difference between hours of panic and minutes to reunion"

**Benefit Reframes (outcomes, not features):**
- "SMS alerts" → "Know the moment someone finds [Pet Name]"
- "GPS location" → "See exactly where they were found on a map"
- "Lost Pet Network" → "Alert [47] pet owners near you instantly"
- "Shelter distribution" → "Flyers at 10 nearby shelters within minutes"

**CTA Buttons:**
- Primary: "Activate Full Protection — $89/year"
- Alternative: "Protect [Pet Name] Now"
- Avoid: "Upgrade" (sounds like a cost)

### Words That Work
- Instead of "pet" → Use their pet's name
- Instead of "upgrade" → "activate" or "unlock"
- Instead of "subscription" → "protection" or "plan"
- Instead of "features" → Describe what happens
- Instead of "network" → "community" or "neighbors"

---

## Multi-Pet Handling

Use a pet-centric view with a switcher:
- Desktop: Pet tabs at top
- Mobile: Swipeable cards or dropdown

Each pet has its own Safety Score and upgrade status.

**Family Plan (Recommended):**
- First pet: $89/year
- Each additional: $49/year (45% discount)
- Or: Family plan up to 4 pets: $149/year

---

## Design Specifications

### Color Palette
- Primary (GeniusPet red/coral): #C84B31
- Dark (near black): #2D3436
- Body text gray: #636E72
- Light background: #F5F5F5
- Warm cream accent: #E8D5B7

### Typography
- Use a distinctive, warm font pairing (not Inter/Roboto)
- Suggestions: DM Sans, Nunito, or similar friendly sans-serif

### Design Principles
- Mobile-first (375px base)
- Maximum 5-6 UI elements visible at once
- Generous whitespace
- Single primary CTA per view
- "My Pet Lost" button always visible, high contrast

---

## Demo Data

Create mock data for the prototype:

```javascript
const mockUser = {
  name: "Arthur Smith",
  email: "arthur@example.com",
  memberSince: "2024-01-15",
  plan: "free", // "free" | "mid" | "advanced"
  phoneVerified: true
};

const mockPets = [
  {
    id: 1,
    name: "Louis",
    photo: "/images/louis.jpg", // Use placeholder
    breed: "Nova Scotia Duck Tolling Retriever",
    age: "1 year",
    sex: "Male",
    weight: "33 lbs",
    // Profile completion
    hasPhoto: true,
    basicComplete: true,
    healthInfoComplete: false,
    emergencyContacts: [],
    behaviorComplete: true,
    // Advanced features (if upgraded)
    smsAlertsEnabled: false,
    lostPetNetworkActive: false,
    gpsEnabled: false,
    // Stats
    totalScans: 5,
    tagRegistered: "2024-01-20"
  },
  {
    id: 2,
    name: "Rover",
    photo: "/images/rover.jpg",
    breed: "Golden Retriever",
    age: "3 years",
    sex: "Male",
    weight: "70 lbs",
    hasPhoto: true,
    basicComplete: true,
    healthInfoComplete: true,
    emergencyContacts: ["Mom", "Dad"],
    behaviorComplete: false,
    smsAlertsEnabled: false,
    lostPetNetworkActive: false,
    gpsEnabled: false,
    totalScans: 12,
    tagRegistered: "2023-06-10"
  }
];

const mockCommunity = {
  membersNearby: 47, // Within 5 miles
  sheltersNearby: 10,
  networkRadius: "20 miles"
};
```

---

## File Structure

```
geniuspet-dashboard/
├── public/
│   ├── images/
│   │   ├── louis-placeholder.jpg
│   │   ├── rover-placeholder.jpg
│   │   └── geniuspet-logo.svg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── Modal.jsx
│   │   ├── dashboard/
│   │   │   ├── PetCard.jsx
│   │   │   ├── SafetyScore.jsx
│   │   │   ├── NextAction.jsx
│   │   │   ├── UpgradeSection.jsx
│   │   │   └── LostPetButton.jsx
│   │   ├── tour/
│   │   │   ├── GuidedTour.jsx
│   │   │   └── TourStep.jsx
│   │   ├── profile/
│   │   │   ├── DigitalCareID.jsx
│   │   │   └── ProfileSection.jsx
│   │   └── navigation/
│   │       ├── BottomNav.jsx
│   │       └── Header.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Activity.jsx
│   │   └── Settings.jsx
│   ├── context/
│   │   ├── UserContext.jsx
│   │   └── PetContext.jsx
│   ├── hooks/
│   │   ├── useSafetyScore.js
│   │   └── useUserState.js
│   ├── data/
│   │   └── mockData.js
│   ├── utils/
│   │   └── calculations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Build Instructions

### Phase 1: Project Setup
1. Initialize Vite + React project
2. Install dependencies: Tailwind CSS, React Router, Lucide React icons
3. Configure Tailwind with custom colors
4. Set up GitHub repository
5. Configure GitHub Pages deployment (via GitHub Actions)

### Phase 2: Core Components
1. Build common UI components (Button, Card, ProgressBar, Modal)
2. Create navigation (BottomNav, Header)
3. Build PetCard and SafetyScore components
4. Implement state management with Context

### Phase 3: Dashboard Views
1. Build main Dashboard page with state-based rendering
2. Implement Safety Score calculation logic
3. Create upgrade section with conversion copy
4. Build "My Pet Lost" button and modal

### Phase 4: Guided Tour
1. Create tour modal system
2. Build 4-step tour flow
3. Store tour completion in localStorage

### Phase 5: Additional Pages
1. Profile page (Digital Care ID view)
2. Activity page (scan history mockup)
3. Settings page

### Phase 6: Polish & Deploy
1. Add animations and transitions
2. Responsive testing
3. Deploy to GitHub Pages
4. Test all user states

---

## State Management

Use React Context to manage:

```javascript
// UserContext
{
  user: { name, email, plan, phoneVerified },
  setUser,
  isUpgraded: boolean,
  tourCompleted: boolean,
  setTourCompleted
}

// PetContext
{
  pets: Pet[],
  activePet: Pet,
  setActivePet,
  updatePet,
  getSafetyScore: (pet) => number,
  getNextAction: (pet) => { label, action, points }
}
```

---

## GitHub Pages Deployment

Use GitHub Actions for automatic deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/geniuspet-dashboard/'
})
```

---

## Success Criteria

The prototype should demonstrate:

1. ✅ Mobile-first responsive design
2. ✅ All 5 user journey states (toggle via settings for demo)
3. ✅ Working Safety Score calculation
4. ✅ Guided tour on "first visit"
5. ✅ Single CTA per state
6. ✅ "My Pet Lost" button always visible
7. ✅ Pet switcher for multi-pet view
8. ✅ Conversion-focused copy (not feature lists)
9. ✅ Clean, uncluttered UI (max 5-6 elements)
10. ✅ Deployed and accessible via GitHub Pages URL

---

## Demo Controls (For Testing)

Add a hidden settings panel (accessible via /demo or settings gear) that allows:
- Toggle user plan (free/mid/advanced)
- Toggle profile completion fields
- Reset tour
- Switch between pets
- Simulate different member counts

This lets stakeholders see all states without rebuilding.

---

## Notes for Claude Code

- Prioritize mobile view (375px width)
- Use Tailwind utilities, avoid custom CSS where possible
- Use Lucide React for icons
- Keep components small and focused
- Add helpful comments for complex logic
- Test Safety Score calculation thoroughly
- Ensure tour only shows once (localStorage)
- Make all CTAs feel clickable and responsive

When in doubt, reference the conversion copy guidelines. The goal is NOT to show features—it's to show outcomes and make users feel their pet is protected.

---

## Quick Start Command

```bash
# Initialize and build
npm create vite@latest geniuspet-dashboard -- --template react
cd geniuspet-dashboard
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom lucide-react
npx tailwindcss init -p

# Then follow the build phases above
```

Ready to build! 🐕
