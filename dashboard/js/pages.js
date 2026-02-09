/**
 * GeniusPet Dashboard - Page Renderers
 * Each page is a function that returns HTML
 */

const Pages = {

  // Dashboard Page - Gamified Protection Roadmap
  dashboard() {
    const pets = AppState.pets;
    const pet = AppState.getActivePet();

    if (!pet) {
      return Components.welcomeOnboarding(AppState.user?.firstName || AppState.user?.name);
    }

    const score = AppState.calculateSafetyScore(pet);
    const tier = AppState.getProtectionTier(score);
    const breakdown = AppState.getScoreBreakdown(pet);
    const nextActions = AppState.getNextActions(pet);

    return `
      <!-- Pet Hero Card with Safety Score & Tier -->
      ${Components.petHeroCard(pet, score, tier)}

      <!-- Pet Family Carousel -->
      ${Components.petFamilyCarousel(pets, pet.id)}

      <!-- Protection Roadmap -->
      ${Components.protectionRoadmap(pet, breakdown, nextActions)}

      <!-- Trust Badge -->
      ${Components.trustBadge()}
    `;
  },

  // Helper: Render alerts section content
  renderAlertsContent(pet, userPlan) {
    const isAdvanced = userPlan === 'advanced';

    return `
      ${Components.featureToggle(
        'email-alerts',
        'Email Alerts',
        'Receive email when tag is scanned',
        'enabled',
        null,
        null
      )}
      ${Components.featureToggle(
        'sms-alerts',
        'SMS Alerts',
        'Instant text message notifications',
        isAdvanced ? (pet.smsAlertsEnabled ? 'enabled' : 'disabled') : 'locked',
        '+10%',
        isAdvanced ? "handleFeatureToggle('smsAlertsEnabled')" : null
      )}
      ${Components.featureToggle(
        'phone-alerts',
        'Phone Call Alerts',
        'Automated call when pet is found',
        isAdvanced ? (pet.phoneCallAlertsEnabled ? 'enabled' : 'disabled') : 'locked',
        null,
        isAdvanced ? "handleFeatureToggle('phoneCallAlertsEnabled')" : null
      )}
      ${Components.featureToggle(
        'gps-location',
        'GPS Location Sharing',
        'See exactly where pet was found',
        isAdvanced ? (pet.gpsEnabled ? 'enabled' : 'disabled') : 'locked',
        '+10%',
        isAdvanced ? "handleFeatureToggle('gpsEnabled')" : null
      )}
    `;
  },

  // Helper: Modern Alerts Content (using new toggle style)
  renderModernAlertsContent(pet, userPlan) {
    const isAdvanced = userPlan === 'advanced';

    return `
      ${Components.modernFeatureToggle(
        'email-alerts',
        'Email Alerts',
        'Get notified when tag is scanned',
        'enabled',
        null,
        null
      )}
      ${Components.modernFeatureToggle(
        'sms-alerts',
        'SMS Alerts',
        'Instant text notifications',
        isAdvanced ? (pet.smsAlertsEnabled ? 'enabled' : 'disabled') : 'locked',
        '+10%',
        isAdvanced ? "handleFeatureToggle('smsAlertsEnabled')" : null
      )}
      ${Components.modernFeatureToggle(
        'phone-alerts',
        'Phone Call Alerts',
        'Automated call when found',
        isAdvanced ? (pet.phoneCallAlertsEnabled ? 'enabled' : 'disabled') : 'locked',
        null,
        isAdvanced ? "handleFeatureToggle('phoneCallAlertsEnabled')" : null
      )}
      ${Components.modernFeatureToggle(
        'gps-location',
        'GPS Location',
        'See where pet was found',
        isAdvanced ? (pet.gpsEnabled ? 'enabled' : 'disabled') : 'locked',
        '+10%',
        isAdvanced ? "handleFeatureToggle('gpsEnabled')" : null
      )}
    `;
  },

  // Helper: Modern Profile Content
  renderModernProfileContent(pet, userPlan) {
    const isMidOrHigher = userPlan === 'mid' || userPlan === 'advanced';

    return `
      ${Components.modernFeatureToggle(
        'health-medical',
        'Health & Medical',
        'Allergies, medications, conditions',
        pet.healthInfoComplete ? 'enabled' : 'disabled',
        '+10%',
        "handleProfileSection('healthInfoComplete')"
      )}
      ${Components.modernFeatureToggle(
        'behavior-social',
        'Behavior & Social',
        'Temperament, pet compatibility',
        pet.behaviorComplete ? 'enabled' : 'disabled',
        '+5%',
        "handleProfileSection('behaviorComplete')"
      )}
      ${Components.modernFeatureToggle(
        'pet-preferences',
        'Pet Preferences',
        'Food, treats, favorite toys',
        isMidOrHigher ? 'disabled' : 'locked',
        null,
        isMidOrHigher ? "handleProfileSection('preferences')" : null
      )}
      ${Components.modernFeatureToggle(
        'daily-routines',
        'Daily Routines',
        'Feeding & walking schedule',
        isMidOrHigher ? 'disabled' : 'locked',
        null,
        isMidOrHigher ? "handleProfileSection('routines')" : null
      )}
      ${Components.modernFeatureToggle(
        'environment',
        'Environment & Comfort',
        'Home setup, comfort items',
        isMidOrHigher ? 'disabled' : 'locked',
        null,
        isMidOrHigher ? "handleProfileSection('environment')" : null
      )}
    `;
  },

  // Helper: Render profile sections content
  renderProfileContent(pet, userPlan) {
    const isMidOrHigher = userPlan === 'mid' || userPlan === 'advanced';

    return `
      ${Components.featureToggle(
        'health-medical',
        'Health & Medical',
        'Allergies, medications, medical issues',
        pet.healthInfoComplete ? 'enabled' : 'disabled',
        '+10%',
        "handleProfileSection('healthInfoComplete')"
      )}
      ${Components.featureToggle(
        'behavior-social',
        'Behavior & Social',
        'Kid-friendly, other pets, temperament',
        pet.behaviorComplete ? 'enabled' : 'disabled',
        '+5%',
        "handleProfileSection('behaviorComplete')"
      )}
      ${Components.featureToggle(
        'pet-preferences',
        'Pet Preferences',
        'Food, treats, favorite toys',
        isMidOrHigher ? 'disabled' : 'locked',
        null,
        isMidOrHigher ? "handleProfileSection('preferences')" : null
      )}
      ${Components.featureToggle(
        'daily-routines',
        'Daily Routines',
        'Feeding, walking, sleep schedule',
        isMidOrHigher ? 'disabled' : 'locked',
        null,
        isMidOrHigher ? "handleProfileSection('routines')" : null
      )}
      ${Components.featureToggle(
        'environment',
        'Environment & Comfort',
        'Home setup, temperature, comfort items',
        isMidOrHigher ? 'disabled' : 'locked',
        null,
        isMidOrHigher ? "handleProfileSection('environment')" : null
      )}
    `;
  },

  // Helper: Count active alerts
  countActiveAlerts(pet, userPlan) {
    let count = 1; // Email always active
    if (userPlan === 'advanced') {
      if (pet.smsAlertsEnabled) count++;
      if (pet.phoneCallAlertsEnabled) count++;
      if (pet.gpsEnabled) count++;
    }
    return count;
  },

  // Helper: Count complete profile sections
  countCompleteProfileSections(pet, userPlan) {
    let count = 0;
    if (pet.healthInfoComplete) count++;
    if (pet.behaviorComplete) count++;
    // Mid/Advanced sections would add more when complete
    return count;
  },

  // Profile Page (Digital Care ID)
  profile() {
    const pet = AppState.getActivePet();
    if (!pet) {
      return Components.emptyState(
        'id-card',
        'No Pet Profile',
        'Register a pet to create their Digital Care ID.'
      );
    }

    return `
      <!-- Profile Header -->
      <div class="bg-cream-light rounded-3xl p-6 text-center mb-6 fade-in">
        <img
          src="${pet.photo}"
          alt="${pet.name}"
          class="w-24 h-24 rounded-full pet-photo mx-auto mb-4"
          onerror="this.src='https://via.placeholder.com/96?text=${pet.name[0]}'"
        >
        <h2 class="text-2xl font-bold text-dark mb-1">Hey, my name is ${pet.name}!</h2>
        <p class="text-gray text-sm">My parents are worried. Please contact them now.</p>

        <button
          onclick="handleAction('contactParents')"
          class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-2xl mt-4 transition-colors btn-press"
        >
          Contact my parents
        </button>
      </div>

      <!-- About Me Section -->
      <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up">
        <div class="flex items-center gap-2 mb-4">
          <i data-lucide="paw-print" class="w-5 h-5 text-primary"></i>
          <h3 class="font-semibold text-dark">ABOUT ME</h3>
        </div>
        ${Components.infoRow('Breed', pet.breed)}
        ${Components.infoRow('Sex', pet.sex)}
        ${Components.infoRow('Age', pet.age)}
        ${Components.infoRow('Weight', pet.weight)}
      </div>

      <!-- Additional Info -->
      <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up" style="animation-delay: 0.1s">
        <div class="flex items-center gap-2 mb-4">
          <i data-lucide="clipboard-list" class="w-5 h-5 text-primary"></i>
          <h3 class="font-semibold text-dark">ADDITIONAL INFO ABOUT ME</h3>
        </div>
        ${Components.infoRow('Kid-friendly', pet.kidFriendly ? 'Yes' : 'No', pet.kidFriendly)}
        ${Components.infoRow('Okay with Other Pets', pet.okayWithPets ? 'Yes' : 'No', pet.okayWithPets)}
        ${Components.infoRow('Spayed/Neutered', pet.spayedNeutered ? 'Yes' : 'No', pet.spayedNeutered)}
        ${Components.infoRow('Rabies vaccine', pet.rabiesVaccine ? 'Yes' : 'No', pet.rabiesVaccine)}
      </div>

      <!-- Expandable Sections -->
      ${Components.profileSection('Allergies', 'alert-circle', pet.allergies || '<span class="text-gray italic">No allergies listed</span>')}
      ${Components.profileSection('Medical Issues', 'plus-circle', pet.medicalIssues || '<span class="text-gray italic">No medical issues listed</span>')}
      ${Components.profileSection('Prescription Medication', 'pill', pet.medications || '<span class="text-gray italic">No medications listed</span>')}
      ${Components.profileSection('Food', 'utensils', pet.foodPreferences || '<span class="text-gray italic">No food preferences listed</span>')}

      <!-- Tag Info -->
      <div class="mt-6 p-4 bg-gray-50 rounded-2xl text-center slide-up" style="animation-delay: 0.2s">
        <p class="text-xs text-gray">Tag ID: ${pet.tagId}</p>
        <p class="text-xs text-gray">Registered: ${new Date(pet.tagRegistered).toLocaleDateString()}</p>
      </div>
    `;
  },

  // Activity Page
  activity() {
    const pet = AppState.getActivePet();
    const activities = MockData.scanHistory.filter(a => a.petId === pet?.id);

    if (!pet || activities.length === 0) {
      return Components.emptyState(
        'activity',
        'No Activity Yet',
        `${pet ? pet.name + "'s" : "Your pet's"} scan history and alerts will appear here.`
      );
    }

    return `
      <h2 class="text-xl font-bold text-dark mb-4 fade-in">Activity for ${pet.name}</h2>

      <div class="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100 slide-up">
        ${activities.map(a => Components.activityItem(a, pet.name)).join('')}
      </div>

      <div class="mt-6 p-4 bg-cream-light/50 rounded-2xl text-center slide-up" style="animation-delay: 0.1s">
        <p class="text-sm text-gray">
          ${pet.name}'s tag has been scanned <span class="font-medium text-dark">${pet.totalScans} times</span> since registration.
        </p>
      </div>
    `;
  },

  // Settings Page
  settings() {
    const user = AppState.user;
    const pet = AppState.getActivePet();

    return `
      <h2 class="text-xl font-bold text-dark mb-6 fade-in">Settings</h2>

      <!-- Account Section -->
      <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up">
        <h3 class="font-semibold text-dark mb-4 flex items-center gap-2">
          <i data-lucide="user" class="w-5 h-5 text-primary"></i>
          Account
        </h3>
        ${Components.infoRow('Name', user.name)}
        ${Components.infoRow('Email', user.email)}
        ${Components.infoRow('Phone', user.phone, user.phoneVerified)}
        ${Components.infoRow('Member Since', new Date(user.memberSince).toLocaleDateString())}
      </div>

      <!-- Plan Section -->
      <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up" style="animation-delay: 0.1s">
        <h3 class="font-semibold text-dark mb-4 flex items-center gap-2">
          <i data-lucide="crown" class="w-5 h-5 text-primary"></i>
          Your Plan
        </h3>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-dark capitalize">${user.plan === 'advanced' ? 'Advanced Protection' : user.plan === 'mid' ? 'Mid-Tier' : 'Free'}</p>
            <p class="text-sm text-gray">${user.plan === 'advanced' ? 'Full protection active' : 'Basic email alerts only'}</p>
          </div>
          ${user.plan !== 'advanced' ? `
            <button
              onclick="handleAction('upgrade')"
              class="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-xl transition-colors btn-press"
            >
              Upgrade
            </button>
          ` : `
            <span class="badge badge-success">Active</span>
          `}
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up" style="animation-delay: 0.2s">
        <h3 class="font-semibold text-dark mb-2 flex items-center gap-2">
          <i data-lucide="bell" class="w-5 h-5 text-primary"></i>
          Notifications
        </h3>
        ${Components.toggleSwitch('email-alerts', 'Email Alerts', 'Receive email when tag is scanned', true)}
        ${Components.toggleSwitch('sms-alerts', 'SMS Alerts', user.plan === 'advanced' ? 'Receive text messages' : 'Requires Advanced Protection', user.plan === 'advanced' && pet?.smsAlertsEnabled, user.plan !== 'advanced' ? null : "toggleSmsAlerts()")}
        ${Components.toggleSwitch('push-alerts', 'Push Notifications', 'Mobile app notifications', true)}
      </div>

      <!-- Demo Controls Link -->
      <div class="mt-8 text-center slide-up" style="animation-delay: 0.3s">
        <a
          href="#/demo"
          class="text-sm text-gray hover:text-primary transition-colors"
        >
          Demo Controls (for testing)
        </a>
      </div>

      <!-- Sign Out -->
      <div class="mt-4 slide-up" style="animation-delay: 0.4s">
        <button
          onclick="handleSignOut()"
          class="w-full bg-gray-100 hover:bg-gray-200 text-dark font-medium py-3 rounded-xl transition-colors"
        >
          Sign Out
        </button>
      </div>
    `;
  },

  // Demo Controls Page
  demo() {
    const user = AppState.user;
    const pet = AppState.getActivePet();

    return `
      <div class="mb-6 fade-in">
        <h2 class="text-xl font-bold text-dark mb-2">Demo Controls</h2>
        <p class="text-sm text-gray">Use these controls to test different states and scenarios.</p>
      </div>

      <!-- User Plan -->
      <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up">
        <h3 class="font-semibold text-dark mb-4">User Plan</h3>
        <div class="grid grid-cols-3 gap-2">
          <button
            onclick="setDemoPlan('free')"
            class="py-2 px-3 rounded-xl text-sm font-medium transition-colors ${user.plan === 'free' ? 'bg-primary text-white' : 'bg-gray-100 text-dark hover:bg-gray-200'}"
          >
            Free
          </button>
          <button
            onclick="setDemoPlan('mid')"
            class="py-2 px-3 rounded-xl text-sm font-medium transition-colors ${user.plan === 'mid' ? 'bg-primary text-white' : 'bg-gray-100 text-dark hover:bg-gray-200'}"
          >
            Mid-Tier
          </button>
          <button
            onclick="setDemoPlan('advanced')"
            class="py-2 px-3 rounded-xl text-sm font-medium transition-colors ${user.plan === 'advanced' ? 'bg-primary text-white' : 'bg-gray-100 text-dark hover:bg-gray-200'}"
          >
            Advanced
          </button>
        </div>
      </div>

      <!-- Profile Completion -->
      ${pet ? `
        <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up" style="animation-delay: 0.1s">
          <h3 class="font-semibold text-dark mb-4">Profile: ${pet.name}</h3>

          <p class="text-xs text-gray mb-3">Profile (max 40 pts):</p>
          ${Components.toggleSwitch('demo-photo', 'Has Photo (+5)', '', pet.hasPhoto, "toggleDemoField('hasPhoto')")}
          ${Components.toggleSwitch('demo-basic', 'Basic Info (+10)', '', pet.basicComplete, "toggleDemoField('basicComplete')")}
          ${Components.toggleSwitch('demo-health', 'Health Info (+8)', '', pet.healthInfoComplete, "toggleDemoField('healthInfoComplete')")}
          ${Components.toggleSwitch('demo-contacts', 'Emergency Contacts (+10)', '', pet.emergencyContacts?.length > 0, "toggleDemoField('emergencyContacts')")}
          ${Components.toggleSwitch('demo-phone', 'Phone Verified (+5)', '', user.phoneVerified, "toggleDemoField('phoneVerified')")}
          ${Components.toggleSwitch('demo-behavior', 'Behavior Info (+2)', '', pet.behaviorComplete, "toggleDemoField('behaviorComplete')")}

          <div class="border-t border-gray-100 mt-4 pt-4">
            <p class="text-xs text-gray mb-3">Advanced Protection (max 25 pts, requires Advanced plan):</p>
            ${Components.toggleSwitch('demo-sms', 'SMS Alerts (+7)', '', pet.smsAlertsEnabled, "toggleDemoField('smsAlertsEnabled')")}
            ${Components.toggleSwitch('demo-network', 'Lost Pet Network (+10)', '', pet.lostPetNetworkActive, "toggleDemoField('lostPetNetworkActive')")}
            ${Components.toggleSwitch('demo-gps', 'GPS Sharing (+8)', '', pet.gpsEnabled, "toggleDemoField('gpsEnabled')")}
          </div>

          <div class="border-t border-gray-100 mt-4 pt-4">
            <p class="text-xs text-gray mb-3">Product Enrollment:</p>
            ${Components.toggleSwitch('demo-televet', 'TeleVet Enrolled (+15)', '', user.hasTeleVet, "toggleDemoUserField('hasTeleVet')")}
            ${Components.toggleSwitch('demo-insurance', 'Pet Insurance Enrolled (+15)', '', user.hasInsurance, "toggleDemoUserField('hasInsurance')")}
            ${Components.toggleSwitch('demo-rx', 'Pet RX Enrolled (+5)', '', user.hasRx, "toggleDemoUserField('hasRx')")}
          </div>

          <div class="mt-4 p-3 bg-cream-light rounded-xl">
            <p class="text-sm font-medium text-dark">
              Current Safety Score: <span class="text-primary">${AppState.calculateSafetyScore(pet)}%</span>
              <span class="text-xs text-gray ml-2">(${AppState.getProtectionTier(AppState.calculateSafetyScore(pet)).name})</span>
            </p>
          </div>
        </div>
      ` : ''}

      <!-- Tour Control -->
      <div class="bg-white border border-gray-100 rounded-2xl p-4 mb-4 slide-up" style="animation-delay: 0.2s">
        <h3 class="font-semibold text-dark mb-4">Guided Tour</h3>
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray">Tour completed: ${AppState.tourCompleted ? 'Yes' : 'No'}</p>
          <button
            onclick="resetTour()"
            class="bg-gray-100 hover:bg-gray-200 text-dark font-medium px-4 py-2 rounded-xl transition-colors text-sm"
          >
            Reset Tour
          </button>
        </div>
      </div>

      <!-- Reset All -->
      <div class="mt-6 slide-up" style="animation-delay: 0.3s">
        <button
          onclick="resetAllData()"
          class="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 rounded-xl transition-colors"
        >
          Reset All Data to Defaults
        </button>
      </div>

      <!-- Back to Dashboard -->
      <div class="mt-4 slide-up" style="animation-delay: 0.4s">
        <a
          href="#/"
          class="block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl transition-colors text-center"
        >
          Back to Dashboard
        </a>
      </div>
    `;
  }
};

// Welcome page - always shows empty-state onboarding (for previewing)
Pages.welcome = function() {
  return Components.welcomeOnboarding(AppState.user?.firstName || AppState.user?.name);
};

// Demo control functions
function setDemoPlan(plan) {
  AppState.updateUser({ plan });
  renderCurrentPage();
  Components.showToast(`Plan changed to ${plan}`);
}

function toggleDemoField(field) {
  const pet = AppState.getActivePet();
  if (!pet) return;

  if (field === 'phoneVerified') {
    AppState.updateUser({ phoneVerified: !AppState.user.phoneVerified });
  } else if (field === 'emergencyContacts') {
    const hasContacts = pet.emergencyContacts && pet.emergencyContacts.length > 0;
    AppState.updatePet(pet.id, {
      emergencyContacts: hasContacts ? [] : ['Emergency Contact 1']
    });
  } else {
    AppState.updatePet(pet.id, { [field]: !pet[field] });
  }

  renderCurrentPage();
}

function toggleDemoUserField(field) {
  AppState.updateUser({ [field]: !AppState.user[field] });
  renderCurrentPage();
  Components.showToast(`${field} toggled`);
}

function resetTour() {
  AppState.resetTour();
  Components.showToast('Tour reset - refresh to see it');
}

function resetAllData() {
  if (confirm('Reset all data to defaults?')) {
    localStorage.clear();
    AppState.resetToDefaults();
    window.location.hash = '#/';
    renderCurrentPage();
    Components.showToast('All data reset');
  }
}

function handleSignOut() {
  Components.showToast('Sign out (demo only)');
}

function toggleSmsAlerts() {
  const pet = AppState.getActivePet();
  if (pet) {
    AppState.updatePet(pet.id, { smsAlertsEnabled: !pet.smsAlertsEnabled });
    renderCurrentPage();
  }
}
