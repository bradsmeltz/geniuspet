/**
 * GeniusPet Dashboard - State Management
 * Manages app state with localStorage persistence
 */

const AppState = {
  // Current state (mutable copy of mock data)
  user: null,
  pets: null,
  activePetId: null,
  tourCompleted: false,
  currentPage: 'dashboard',

  // Initialize state from localStorage or mock data
  init() {
    // Try to load from localStorage
    const savedState = localStorage.getItem('geniuspet_state');

    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        this.user = parsed.user || { ...MockData.user };
        this.pets = parsed.pets || JSON.parse(JSON.stringify(MockData.pets));
        this.activePetId = parsed.activePetId || this.pets[0]?.id;
        this.tourCompleted = parsed.tourCompleted || false;

        // Merge in any new pets from mock data that aren't in saved state
        const savedPetIds = this.pets.map(p => p.id);
        MockData.pets.forEach(mockPet => {
          if (!savedPetIds.includes(mockPet.id)) {
            this.pets.push(JSON.parse(JSON.stringify(mockPet)));
          }
        });

        // Ensure user has all expected fields
        if (this.user.hasTeleVet === undefined) this.user.hasTeleVet = false;
        if (this.user.hasInsurance === undefined) this.user.hasInsurance = false;
        if (this.user.hasRx === undefined) this.user.hasRx = false;

        this.save();
      } catch (e) {
        console.error('Failed to parse saved state:', e);
        this.resetToDefaults();
      }
    } else {
      this.resetToDefaults();
    }
  },

  // Reset to default mock data
  resetToDefaults() {
    this.user = { ...MockData.user };
    this.pets = JSON.parse(JSON.stringify(MockData.pets));
    this.activePetId = this.pets[0]?.id;
    this.tourCompleted = false;
    // Apply scenario for default pet
    const scenario = MockData.petScenarios[this.activePetId];
    if (scenario) {
      this.user = { ...this.user, ...scenario };
    }
    this.save();
  },

  // Save current state to localStorage
  save() {
    const stateToSave = {
      user: this.user,
      pets: this.pets,
      activePetId: this.activePetId,
      tourCompleted: this.tourCompleted
    };
    localStorage.setItem('geniuspet_state', JSON.stringify(stateToSave));
  },

  // Get active pet
  getActivePet() {
    return this.pets.find(p => p.id === this.activePetId) || this.pets[0];
  },

  // Set active pet (also applies demo scenario for user-level state)
  setActivePet(petId) {
    if (this.pets.find(p => p.id === petId)) {
      this.activePetId = petId;

      // Apply demo scenario: each pet showcases a different product tier
      const scenario = MockData.petScenarios[petId];
      if (scenario) {
        this.user = { ...this.user, ...scenario };
      }

      this.save();
      // Trigger re-render
      if (typeof renderCurrentPage === 'function') {
        renderCurrentPage();
      }
    }
  },

  // Update user
  updateUser(updates) {
    this.user = { ...this.user, ...updates };
    this.save();
  },

  // Update pet
  updatePet(petId, updates) {
    const petIndex = this.pets.findIndex(p => p.id === petId);
    if (petIndex !== -1) {
      this.pets[petIndex] = { ...this.pets[petIndex], ...updates };
      this.save();
    }
  },

  // Calculate safety score for a pet (100 pts across 5 tiers)
  calculateSafetyScore(pet) {
    const weights = MockData.scoreWeights;
    let score = 0;

    // TIER 1 - Profile Basics (max 40, free)
    if (pet.hasPhoto) score += weights.hasPhoto;
    if (pet.basicComplete) score += weights.basicComplete;
    if (pet.healthInfoComplete) score += weights.healthInfoComplete;
    if (pet.emergencyContacts && pet.emergencyContacts.length > 0) score += weights.emergencyContacts;
    if (this.user.phoneVerified) score += weights.phoneVerified;
    if (pet.behaviorComplete) score += weights.behaviorComplete;

    // TIER 2 - Advanced Protection (max 25, requires advanced plan)
    if (this.user.plan === 'advanced') {
      if (pet.smsAlertsEnabled) score += weights.smsAlertsEnabled;
      if (pet.lostPetNetworkActive) score += weights.lostPetNetworkActive;
      if (pet.gpsEnabled) score += weights.gpsEnabled;
    }

    // TIER 3 - TeleVet (max 15)
    if (this.user.hasTeleVet) score += weights.televetEnrolled;

    // TIER 4 - Insurance (max 15)
    if (this.user.hasInsurance) score += weights.insuranceEnrolled;

    // TIER 5 - Pet RX (max 5)
    if (this.user.hasRx) score += weights.rxEnrolled;

    return Math.min(score, 100);
  },

  // Get score breakdown by tier (for roadmap UI)
  getScoreBreakdown(pet) {
    const weights = MockData.scoreWeights;
    const isAdvanced = this.user.plan === 'advanced';

    const profile = {
      earned: 0, max: 40,
      items: [
        { key: 'hasPhoto', label: 'Pet Photo', points: weights.hasPhoto, done: !!pet.hasPhoto, action: 'addPhoto', icon: 'camera' },
        { key: 'basicComplete', label: 'Basic Info', points: weights.basicComplete, done: !!pet.basicComplete, action: 'completeBasic', icon: 'edit' },
        { key: 'healthInfoComplete', label: 'Health Info', points: weights.healthInfoComplete, done: !!pet.healthInfoComplete, action: 'addHealth', icon: 'heart-pulse' },
        { key: 'emergencyContacts', label: 'Emergency Contacts', points: weights.emergencyContacts, done: !!(pet.emergencyContacts && pet.emergencyContacts.length > 0), action: 'addContacts', icon: 'users' },
        { key: 'phoneVerified', label: 'Verify Phone', points: weights.phoneVerified, done: !!this.user.phoneVerified, action: 'verifyPhone', icon: 'phone' },
        { key: 'behaviorComplete', label: 'Behavior Info', points: weights.behaviorComplete, done: !!pet.behaviorComplete, action: 'addBehavior', icon: 'smile' }
      ]
    };
    profile.earned = profile.items.filter(i => i.done).reduce((sum, i) => sum + i.points, 0);

    const advanced = {
      earned: 0, max: 25, locked: !isAdvanced,
      items: [
        { key: 'smsAlertsEnabled', label: 'SMS Alerts', points: weights.smsAlertsEnabled, done: isAdvanced && !!pet.smsAlertsEnabled, action: 'enableSms', icon: 'message-circle' },
        { key: 'lostPetNetworkActive', label: 'Lost Pet Network', points: weights.lostPetNetworkActive, done: isAdvanced && !!pet.lostPetNetworkActive, action: 'enableNetwork', icon: 'users' },
        { key: 'gpsEnabled', label: 'GPS Sharing', points: weights.gpsEnabled, done: isAdvanced && !!pet.gpsEnabled, action: 'enableGps', icon: 'map-pin' }
      ]
    };
    advanced.earned = advanced.items.filter(i => i.done).reduce((sum, i) => sum + i.points, 0);

    const televet = {
      earned: this.user.hasTeleVet ? weights.televetEnrolled : 0,
      max: 15,
      locked: !this.user.hasTeleVet,
      enrolled: !!this.user.hasTeleVet
    };

    const insurance = {
      earned: this.user.hasInsurance ? weights.insuranceEnrolled : 0,
      max: 15,
      locked: !this.user.hasInsurance,
      enrolled: !!this.user.hasInsurance
    };

    const rx = {
      earned: this.user.hasRx ? weights.rxEnrolled : 0,
      max: 5,
      locked: true,
      enrolled: !!this.user.hasRx,
      comingSoon: true
    };

    return { profile, advanced, televet, insurance, rx };
  },

  // Get protection tier based on score
  getProtectionTier(score) {
    if (score >= 95) return { name: 'Diamond', color: 'primary', bgClass: 'bg-primary/20', textClass: 'text-primary', icon: 'crown', next: null };
    if (score >= 80) return { name: 'Platinum', color: 'tag-blue', bgClass: 'bg-tag-blue/20', textClass: 'text-white', icon: 'award', next: 'Diamond' };
    if (score >= 65) return { name: 'Gold', color: 'insurance-gold', bgClass: 'bg-insurance-gold/20', textClass: 'text-white', icon: 'shield-check', next: 'Platinum' };
    if (score >= 40) return { name: 'Silver', color: 'gray', bgClass: 'bg-white/20', textClass: 'text-white', icon: 'shield-check', next: 'Gold' };
    if (score >= 20) return { name: 'Bronze', color: 'insurance-gold', bgClass: 'bg-insurance-gold/20', textClass: 'text-white', icon: 'shield', next: 'Silver' };
    return { name: 'Starter', color: 'gray', bgClass: 'bg-white/20', textClass: 'text-white', icon: 'shield', next: 'Bronze' };
  },

  // Get max possible score for current products
  getMaxScore() {
    let max = 40; // Profile always available
    if (this.user.plan === 'advanced') max += 25;
    if (this.user.hasTeleVet) max += 15;
    if (this.user.hasInsurance) max += 15;
    if (this.user.hasRx) max += 5;
    return max;
  },

  // Get all available next actions across tiers
  getNextActions(pet, limit = 0) {
    const weights = MockData.scoreWeights;
    const actions = [];
    const isAdvanced = this.user.plan === 'advanced';

    // TIER 1 - Profile actions
    if (!pet.hasPhoto) actions.push({ label: `Add ${pet.name}'s Photo`, action: 'addPhoto', points: weights.hasPhoto, description: 'Help finders recognize your pet', tier: 'profile', icon: 'camera' });
    if (!pet.basicComplete) actions.push({ label: 'Complete Basic Info', action: 'completeBasic', points: weights.basicComplete, description: 'Name, breed, age, and weight', tier: 'profile', icon: 'edit' });
    if (!this.user.phoneVerified) actions.push({ label: 'Verify Phone Number', action: 'verifyPhone', points: weights.phoneVerified, description: 'Get notified faster when scanned', tier: 'profile', icon: 'phone' });
    if (!pet.emergencyContacts || pet.emergencyContacts.length === 0) actions.push({ label: 'Add Emergency Contacts', action: 'addContacts', points: weights.emergencyContacts, description: 'Backup contacts if unreachable', tier: 'profile', icon: 'users' });
    if (!pet.healthInfoComplete) actions.push({ label: 'Add Health Information', action: 'addHealth', points: weights.healthInfoComplete, description: 'Allergies, medications, medical needs', tier: 'profile', icon: 'heart-pulse' });
    if (!pet.behaviorComplete) actions.push({ label: 'Add Behavior Info', action: 'addBehavior', points: weights.behaviorComplete, description: 'Kid-friendly, good with other pets', tier: 'profile', icon: 'smile' });

    // TIER 2 - Advanced Protection
    if (!isAdvanced) {
      actions.push({ label: 'Activate Advanced Protection', action: 'upgrade', points: 25, description: `Unlock SMS, GPS & Lost Pet Network`, tier: 'advanced', icon: 'shield', isProduct: true, price: '$89/yr' });
    } else {
      if (!pet.smsAlertsEnabled) actions.push({ label: 'Enable SMS Alerts', action: 'enableSms', points: weights.smsAlertsEnabled, description: 'Instant text when tag is scanned', tier: 'advanced', icon: 'message-circle' });
      if (!pet.lostPetNetworkActive) actions.push({ label: 'Activate Lost Pet Network', action: 'enableNetwork', points: weights.lostPetNetworkActive, description: 'Alert nearby GeniusPet members', tier: 'advanced', icon: 'users' });
      if (!pet.gpsEnabled) actions.push({ label: 'Enable GPS Sharing', action: 'enableGps', points: weights.gpsEnabled, description: 'See where your pet was found', tier: 'advanced', icon: 'map-pin' });
    }

    // TIER 3 - TeleVet
    if (!this.user.hasTeleVet) {
      actions.push({ label: 'Add TeleVet', action: 'enrollTeleVet', points: weights.televetEnrolled, description: '24/7 access to licensed vets', tier: 'televet', icon: 'stethoscope', isProduct: true, price: '$19.99/mo' });
    }

    // TIER 4 - Insurance
    if (!this.user.hasInsurance) {
      actions.push({ label: 'Add Pet Insurance', action: 'enrollInsurance', points: weights.insuranceEnrolled, description: 'Protect against accidents & illness', tier: 'insurance', icon: 'heart-handshake', isProduct: true, price: '$29.99/mo' });
    }

    // TIER 5 - Pet RX
    if (!this.user.hasRx) {
      actions.push({ label: 'Pet RX', action: 'enrollRx', points: weights.rxEnrolled, description: 'Easy prescription refills', tier: 'rx', icon: 'pill', isProduct: true, comingSoon: true });
    }

    return limit ? actions.slice(0, limit) : actions;
  },

  // Backward compat — single next action
  getNextAction(pet) {
    const actions = this.getNextActions(pet, 1);
    if (actions.length === 0) {
      return { label: `${pet.name} is Fully Protected!`, action: 'complete', points: 0, description: 'All safety features activated' };
    }
    return actions[0];
  },

  // Get user journey state (1-5)
  getUserJourneyState() {
    const pet = this.getActivePet();
    if (!pet) return 1;
    const score = this.calculateSafetyScore(pet);
    if (score < 40 && this.user.plan !== 'advanced') return 2;
    if (score <= 40 && this.user.plan !== 'advanced') return 3;
    if (this.user.plan === 'advanced' && !this.user.hasTeleVet) return 4;
    if (this.user.hasTeleVet && !this.user.hasInsurance) return 5;
    return 5;
  },

  // Mark tour as completed
  completeTour() {
    this.tourCompleted = true;
    localStorage.setItem('geniuspet_tour_completed', 'true');
    this.save();
  },

  // Check if tour should show
  shouldShowTour() {
    return !this.tourCompleted && !localStorage.getItem('geniuspet_tour_completed');
  },

  // Reset tour (for demo)
  resetTour() {
    this.tourCompleted = false;
    localStorage.removeItem('geniuspet_tour_completed');
    this.save();
  },

  // Check if feature is available for current user plan
  isFeatureAvailable(featureName) {
    const tiers = MockData.featureTiers;
    const requiredTier = tiers[featureName];
    if (!requiredTier) return true; // Unknown features are available

    const tierOrder = { free: 0, mid: 1, advanced: 2 };
    const userTierLevel = tierOrder[this.user.plan] || 0;
    const requiredTierLevel = tierOrder[requiredTier] || 0;

    return userTierLevel >= requiredTierLevel;
  },

  // Get feature state for display (enabled, disabled, or locked)
  getFeatureState(featureName, isEnabled) {
    if (!this.isFeatureAvailable(featureName)) {
      return 'locked';
    }
    return isEnabled ? 'enabled' : 'disabled';
  }
};
