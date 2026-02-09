/**
 * GeniusPet Dashboard - Main Application
 * Initializes app and handles global interactions
 */

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize state
  AppState.init();

  // Initialize router
  Router.init();

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Setup pet switcher
  setupPetSwitcher();

  // Setup lost pet button
  setupLostPetButton();

  // Show guided tour if first visit
  setTimeout(() => {
    GuidedTour.start();
  }, 500);
});

// Setup pet switcher dropdown
function setupPetSwitcher() {
  const switcherBtn = document.getElementById('pet-switcher-btn');
  const dropdown = document.getElementById('pet-dropdown');
  const activePetName = document.getElementById('active-pet-name');

  if (!switcherBtn || !dropdown) return;

  // Update active pet name
  function updateActivePetDisplay() {
    const pet = AppState.getActivePet();
    if (activePetName && pet) {
      activePetName.textContent = pet.name;
    }
  }

  // Populate dropdown
  function populateDropdown() {
    dropdown.innerHTML = AppState.pets.map(pet =>
      Components.petCardMini(pet, pet.id === AppState.activePetId)
    ).join('');

    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Toggle dropdown
  switcherBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
    if (!dropdown.classList.contains('hidden')) {
      dropdown.classList.add('dropdown-enter');
      populateDropdown();
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !switcherBtn.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  // Initial display
  updateActivePetDisplay();

  // Update on pet change (override setActivePet to include display update)
  const originalSetActivePet = AppState.setActivePet.bind(AppState);
  AppState.setActivePet = function(petId) {
    originalSetActivePet(petId);
    updateActivePetDisplay();
    dropdown.classList.add('hidden');
  };
}

// Setup lost pet modal handlers
function setupLostPetButton() {
  const lostModal = document.getElementById('lost-modal');
  const lostBackdrop = document.getElementById('lost-backdrop');
  const lostModalClose = document.getElementById('lost-modal-close');
  const activateLostMode = document.getElementById('activate-lost-mode');
  const cancelLostMode = document.getElementById('cancel-lost-mode');

  if (!lostModal) return;

  // Close modal functions
  function closeModal() {
    lostModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  lostBackdrop?.addEventListener('click', closeModal);
  lostModalClose?.addEventListener('click', closeModal);
  cancelLostMode?.addEventListener('click', closeModal);

  // Activate lost mode
  activateLostMode?.addEventListener('click', () => {
    closeModal();
    const pet = AppState.getActivePet();
    Components.showToast(`Lost Pet Mode activated for ${pet?.name || 'your pet'}!`);
    // In a real app, this would trigger the lost pet workflow
  });
}

// Global function to show lost pet modal (called from petHeroCard button)
function showLostPetModal() {
  const lostModal = document.getElementById('lost-modal');
  const lostModalText = document.getElementById('lost-modal-text');
  const pet = AppState.getActivePet();

  if (lostModalText && pet) {
    lostModalText.textContent = `This will alert the GeniusPet community and nearby shelters that ${pet.name} is missing.`;
  }

  if (lostModal) {
    lostModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// Handle product card actions (TeleVet, Insurance, RX)
function handleProductAction(productId) {
  switch (productId) {
    case 'televet':
      Components.showToast('Opening TeleVet... (demo only)');
      // In real app: window.open('https://geniuspet.com/televet', '_blank');
      break;
    case 'pet-insurance':
      Components.showToast('Opening Insurance Plans... (demo only)');
      // In real app: window.open('https://geniuspet.com/insurance', '_blank');
      break;
    case 'pet-rx':
      Components.showToast('Pet RX coming soon!');
      break;
    default:
      Components.showToast(`${productId} (demo only)`);
  }
}

// Handle action buttons (from components)
function handleAction(action) {
  const pet = AppState.getActivePet();
  const petName = pet?.name || 'your pet';
  const scoreBefore = pet ? AppState.calculateSafetyScore(pet) : 0;
  const tierBefore = AppState.getProtectionTier(scoreBefore);

  switch (action) {
    case 'registerPet':
      window.location.href = 'registration.html';
      break;

    case 'addPhoto':
      Components.showToast(`Add photo for ${petName} (demo only)`);
      // Simulate adding photo
      if (pet) {
        AppState.updatePet(pet.id, { hasPhoto: true });
        renderCurrentPage();
      }
      break;

    case 'completeBasic':
      Components.showToast('Complete basic info (demo only)');
      if (pet) {
        AppState.updatePet(pet.id, { basicComplete: true });
        renderCurrentPage();
      }
      break;

    case 'verifyPhone':
      Components.showToast('Phone verification (demo only)');
      AppState.updateUser({ phoneVerified: true });
      renderCurrentPage();
      break;

    case 'addContacts':
      Components.showToast('Add emergency contacts (demo only)');
      if (pet) {
        AppState.updatePet(pet.id, { emergencyContacts: ['Emergency Contact 1'] });
        renderCurrentPage();
      }
      break;

    case 'addHealth':
      Components.showToast('Add health info (demo only)');
      if (pet) {
        AppState.updatePet(pet.id, { healthInfoComplete: true });
        renderCurrentPage();
      }
      break;

    case 'addBehavior':
      Components.showToast('Add behavior info (demo only)');
      if (pet) {
        AppState.updatePet(pet.id, { behaviorComplete: true });
        renderCurrentPage();
      }
      break;

    case 'upgrade':
      // Show upgrade flow
      showUpgradeModal();
      break;

    case 'enableSms':
      Components.showToast('SMS alerts enabled!');
      if (pet) {
        AppState.updatePet(pet.id, { smsAlertsEnabled: true });
        renderCurrentPage();
      }
      break;

    case 'enableNetwork':
      Components.showToast('Lost Pet Network activated!');
      if (pet) {
        AppState.updatePet(pet.id, { lostPetNetworkActive: true });
        renderCurrentPage();
      }
      break;

    case 'enableGps':
      Components.showToast('GPS sharing enabled!');
      if (pet) {
        AppState.updatePet(pet.id, { gpsEnabled: true });
        renderCurrentPage();
      }
      break;

    case 'contactParents':
      Components.showToast('Contact parents (demo - this is what finders see)');
      break;

    case 'enrollTeleVet':
      AppState.updateUser({ hasTeleVet: true });
      Components.showToast('TeleVet enrolled! +15 pts');
      renderCurrentPage();
      break;

    case 'enrollInsurance':
      AppState.updateUser({ hasInsurance: true });
      Components.showToast('Pet Insurance enrolled! +15 pts');
      renderCurrentPage();
      break;

    case 'enrollRx':
      Components.showToast('Pet RX coming soon!');
      break;

    default:
      console.log('Unknown action:', action);
  }

  // Check for tier celebration
  if (pet) {
    const scoreAfter = AppState.calculateSafetyScore(AppState.getActivePet());
    const tierAfter = AppState.getProtectionTier(scoreAfter);
    if (tierAfter.name !== tierBefore.name) {
      setTimeout(() => {
        Components.showCelebrationToast(tierAfter.name, scoreAfter);
      }, 500);
    }
  }
}

// Show upgrade modal
function showUpgradeModal() {
  const pet = AppState.getActivePet();
  const petName = pet?.name || 'your pet';

  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'upgrade-modal';
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-dark/60 backdrop-blur-sm" onclick="closeUpgradeModal()"></div>
    <div class="relative bg-white rounded-3xl w-full max-w-[360px] p-6 shadow-2xl scale-in">
      <button onclick="closeUpgradeModal()" class="absolute top-4 right-4 text-gray hover:text-dark">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>

      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i data-lucide="shield-check" class="w-8 h-8 text-primary"></i>
        </div>
        <h2 class="text-xl font-bold text-dark mb-2">Activate Full Protection</h2>
        <p class="text-gray text-sm">Give ${petName} the best chance of getting home safely.</p>
      </div>

      <div class="space-y-3 mb-6">
        <div class="flex items-center gap-3 text-sm">
          <i data-lucide="check-circle" class="w-5 h-5 text-primary flex-shrink-0"></i>
          <span>Instant SMS + phone call alerts</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <i data-lucide="check-circle" class="w-5 h-5 text-primary flex-shrink-0"></i>
          <span>GPS location when tag is scanned</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <i data-lucide="check-circle" class="w-5 h-5 text-primary flex-shrink-0"></i>
          <span>Alert ${MockData.community.membersNearby} nearby neighbors</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <i data-lucide="check-circle" class="w-5 h-5 text-primary flex-shrink-0"></i>
          <span>Auto-notify 10 local shelters</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <i data-lucide="check-circle" class="w-5 h-5 text-primary flex-shrink-0"></i>
          <span>Free replacement tags</span>
        </div>
      </div>

      <button
        onclick="confirmUpgrade()"
        class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-2xl transition-colors btn-press"
      >
        Activate Now
      </button>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Reinitialize icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Close upgrade modal
function closeUpgradeModal() {
  const modal = document.getElementById('upgrade-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

// Confirm upgrade
function confirmUpgrade() {
  closeUpgradeModal();

  // Update plan
  AppState.updateUser({ plan: 'advanced' });

  // Enable all advanced features for current pet
  const pet = AppState.getActivePet();
  if (pet) {
    AppState.updatePet(pet.id, {
      smsAlertsEnabled: true,
      lostPetNetworkActive: true,
      gpsEnabled: true
    });
  }

  Components.showToast('Advanced Protection activated!');
  renderCurrentPage();
}

// Handle feature toggle from Mission Control dashboard
function handleFeatureToggle(fieldName) {
  const pet = AppState.getActivePet();
  if (!pet) return;

  // Toggle the field
  const newValue = !pet[fieldName];
  AppState.updatePet(pet.id, { [fieldName]: newValue });

  const label = fieldName
    .replace('Enabled', '')
    .replace('Active', '')
    .replace(/([A-Z])/g, ' $1')
    .trim();

  Components.showToast(newValue ? `${label} enabled` : `${label} disabled`);
  renderCurrentPage();
}

// Handle profile section toggle (navigates to profile or toggles completion)
function handleProfileSection(fieldName) {
  const pet = AppState.getActivePet();
  if (!pet) return;

  // For completion flags, toggle them
  if (fieldName.includes('Complete')) {
    const newValue = !pet[fieldName];
    AppState.updatePet(pet.id, { [fieldName]: newValue });
    Components.showToast(newValue ? 'Section completed' : 'Section marked incomplete');
    renderCurrentPage();
  } else {
    // For advanced sections, just show a toast (would navigate to editor in real app)
    Components.showToast('Edit section (demo only)');
  }
}

// Toggle control section expansion (for Mission Control)
function toggleControlSection(sectionId) {
  const content = document.getElementById(`section-ctrl-${sectionId}`);
  const chevron = document.getElementById(`chevron-ctrl-${sectionId}`);

  if (content) {
    const isExpanded = content.classList.contains('expanded');

    if (isExpanded) {
      content.style.maxHeight = '0';
      content.classList.remove('expanded');
      chevron?.classList.remove('rotate-180');
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.classList.add('expanded');
      chevron?.classList.add('rotate-180');
    }
  }
}

// Keyboard shortcuts for demo
document.addEventListener('keydown', (e) => {
  // Press 'D' to go to demo page
  if (e.key === 'd' && !e.metaKey && !e.ctrlKey && document.activeElement.tagName !== 'INPUT') {
    window.location.hash = '#/demo';
  }

  // Press 'T' to trigger tour
  if (e.key === 't' && !e.metaKey && !e.ctrlKey && document.activeElement.tagName !== 'INPUT') {
    AppState.resetTour();
    GuidedTour.start();
  }
});
