# GeniusPet Dashboard - Claude Code Workflow

## How to Use These Files

### Step 1: Set Up Your Project Folder

Create a new folder for this project on your computer:
```bash
mkdir geniuspet-dashboard
cd geniuspet-dashboard
```

### Step 2: Copy Files Into the Folder

Copy these files into your project folder:
- `CLAUDE.md` → Goes in the root of the project folder
- `CLAUDE_CODE_PROMPT.md` → Goes in the root of the project folder
- `reference-current-dashboard.png` → The overwhelming dashboard (what to AVOID)
- `reference-pet-profile.png` → The pet profile design (design language to MATCH)

**Important:** Rename your image files to these exact names so Claude Code can find them.

### Step 3: Open Claude Code

Open Claude Code and navigate to your project folder:
```bash
claude
# or
claude code
```

### Step 4: Initialize the Project

Once Claude Code is open, give it this initial prompt:

---

**PROMPT TO PASTE:**

```
I'm building the GeniusPet Dashboard. Please read the CLAUDE.md and CLAUDE_CODE_PROMPT.md files in this directory for full context.

Also review the two reference images:
- reference-current-dashboard.png (the CURRENT design that's too overwhelming - avoid this)
- reference-pet-profile.png (the pet profile design - match this visual language)

Let's start by:
1. Initializing a new Vite + React project
2. Installing dependencies (Tailwind, React Router, Lucide)
3. Setting up the Tailwind config with our custom colors
4. Creating the basic file structure
5. Setting up GitHub Pages deployment workflow

Please proceed step by step, showing me what you're doing at each stage.
```

---

### Step 5: Build Phase by Phase

After setup, use these prompts to build each section:

**Build Core Components:**
```
Now let's build the core UI components:
1. Common components (Button, Card, ProgressBar, Modal)
2. Navigation (BottomNav, Header)
3. Context providers (UserContext, PetContext)

Reference the CLAUDE_CODE_PROMPT.md for specifications.
```

**Build Dashboard:**
```
Now let's build the main Dashboard page:
1. SafetyScore component with calculation logic
2. NextAction component that shows single CTA based on state
3. PetCard component
4. UpgradeSection with conversion copy
5. LostPetButton (always visible)

The dashboard should render differently based on user journey state (1-5).
```

**Build Guided Tour:**
```
Now let's build the Guided Tour:
1. Modal-based 4-step tour
2. Only shows on first visit (localStorage)
3. Use the exact copy from CLAUDE_CODE_PROMPT.md
4. Progress indicators
5. Skip option
```

**Build Additional Pages:**
```
Now let's build the remaining pages:
1. Profile page (Digital Care ID view)
2. Activity page (scan history mockup)
3. Settings page
4. Demo controls page (/demo) for testing different states
```

**Polish & Deploy:**
```
Let's finalize:
1. Add smooth transitions and micro-animations
2. Test all 5 user states
3. Verify mobile responsiveness at 375px
4. Deploy to GitHub Pages
5. Test the deployed URL
```

---

## Demo Controls

After building, the demo controls page (/demo) should let you:

- Toggle user plan: Free → Mid → Advanced
- Toggle profile fields (to test Safety Score)
- Reset the guided tour
- Switch active pet
- Change mock "members nearby" count

This lets you demonstrate all states without code changes.

---

## Troubleshooting

### "Claude Code doesn't see my files"
Make sure CLAUDE.md is in the root of your project folder. Claude Code reads this file automatically.

### "GitHub Pages shows 404"
1. Check that `base` is set in vite.config.js
2. Make sure the repository name matches the base path
3. Enable GitHub Pages in repo settings (Settings → Pages → Source: GitHub Actions)

### "Tour keeps showing"
Clear localStorage: `localStorage.removeItem('geniuspet_tour_completed')`

### "Safety Score seems wrong"
Check `useSafetyScore.js` calculation. Each field should add its specific percentage.

---

## Success Checklist

Before considering the project complete:

- [ ] Mobile-first design works at 375px
- [ ] All 5 user states render correctly
- [ ] Safety Score calculates accurately
- [ ] Guided tour shows only once
- [ ] Single CTA visible per state
- [ ] "My Pet Lost" always visible
- [ ] Pet switcher works
- [ ] Conversion copy uses outcomes, not features
- [ ] Deployed to GitHub Pages
- [ ] Demo controls allow state switching

---

## Next Steps After Build

Once the prototype is deployed:

1. **Share the GitHub Pages URL** with your team/designer
2. **Gather feedback** on the simplified flow
3. **A/B test copy variations** (headlines, CTAs)
4. **Integrate with real backend** when ready
5. **Add analytics** to track conversion funnel

---

## Files Included

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Quick reference for Claude Code (auto-read) |
| `CLAUDE_CODE_PROMPT.md` | Complete project specification |
| `reference-current-dashboard.png` | Current design to AVOID (too overwhelming) |
| `reference-pet-profile.png` | Design language to MATCH |
| `GeniusPet_Dashboard_Strategy.docx` | Full strategy document for stakeholders |

Good luck with the build! 🐕
