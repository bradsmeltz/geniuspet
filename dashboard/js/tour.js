/**
 * GeniusPet Dashboard - Guided Tour
 * 4-step onboarding flow for first-time users
 */

const GuidedTour = {
  currentStep: 0,

  // Tour steps content
  steps: [
    {
      headline: "Welcome to GeniusPet!",
      getBody: (userName, petName) => `
        You just did something important for ${petName}. If they ever get lost,
        anyone who finds them can scan their GeniusTag and connect with you instantly.
      `,
      cta: "See How It Works"
    },
    {
      headline: "Here's what happens if {petName} is found",
      getBody: (userName, petName) => `
        <div class="space-y-3 text-left">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-bold text-primary">1</span>
            </div>
            <p>Someone scans ${petName}'s tag</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-bold text-primary">2</span>
            </div>
            <p>You get notified instantly</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-sm font-bold text-primary">3</span>
            </div>
            <p>They see ${petName}'s profile and can contact you safely</p>
          </div>
        </div>
      `,
      cta: "Got It"
    },
    {
      headline: "You're not alone",
      getBody: (userName, petName) => `
        There are <strong class="text-primary">${MockData.community.membersNearby} GeniusPet members</strong>
        within 5 miles of you. If any of their pets go missing, you can help.
        And if ${petName} ever needs it, they'll do the same.
      `,
      cta: "That's Amazing"
    },
    {
      headline: "This is your Pet Safety Control Center",
      getBody: (userName, petName) => `
        Here you can see ${petName}'s protection status, update their profile,
        and—if you ever need it—activate lost pet mode with one tap.
      `,
      cta: "Let's Get Started"
    }
  ],

  // Start the tour
  start() {
    if (!AppState.shouldShowTour()) {
      return;
    }

    this.currentStep = 0;
    this.show();
  },

  // Show the tour modal
  show() {
    const modal = document.getElementById('tour-modal');
    const content = document.getElementById('tour-content');

    if (!modal || !content) return;

    const step = this.steps[this.currentStep];
    const pet = AppState.getActivePet();
    const userName = AppState.user.firstName || AppState.user.name;
    const petName = pet?.name || 'your pet';

    // Replace {petName} in headline
    const headline = step.headline.replace('{petName}', petName);

    content.innerHTML = `
      <!-- Progress Dots -->
      <div class="flex justify-center gap-2 mb-6">
        ${this.steps.map((_, i) => `
          <div class="tour-dot w-2 h-2 rounded-full ${i === this.currentStep ? 'active bg-primary' : 'bg-gray-200'}"></div>
        `).join('')}
      </div>

      <!-- Icon -->
      <div class="w-16 h-16 bg-cream-light rounded-full flex items-center justify-center mx-auto mb-4">
        ${this.currentStep === 0 ? '<i data-lucide="heart" class="w-8 h-8 text-primary"></i>' :
          this.currentStep === 1 ? '<i data-lucide="scan" class="w-8 h-8 text-primary"></i>' :
          this.currentStep === 2 ? '<i data-lucide="users" class="w-8 h-8 text-primary"></i>' :
          '<i data-lucide="shield-check" class="w-8 h-8 text-primary"></i>'}
      </div>

      <!-- Content -->
      <h2 class="text-xl font-bold text-dark mb-3 text-center">${headline}</h2>
      <div class="text-gray text-center mb-6">
        ${step.getBody(userName, petName)}
      </div>

      <!-- CTA Button -->
      <button
        onclick="GuidedTour.next()"
        class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-2xl transition-colors btn-press"
      >
        ${step.cta} <span class="ml-1">→</span>
      </button>

      <!-- Skip Link -->
      ${this.currentStep < this.steps.length - 1 ? `
        <button
          onclick="GuidedTour.skip()"
          class="w-full text-gray hover:text-dark text-sm py-3 transition-colors"
        >
          Skip tour
        </button>
      ` : ''}
    `;

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  // Go to next step
  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.show();
    } else {
      this.complete();
    }
  },

  // Skip the tour
  skip() {
    this.complete();
  },

  // Complete/close the tour
  complete() {
    const modal = document.getElementById('tour-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    AppState.completeTour();
    Components.showToast('Welcome to GeniusPet!');
  }
};

// Close tour on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('tour-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        // Don't allow closing by clicking backdrop - user must complete or skip
      }
    });
  }
});
