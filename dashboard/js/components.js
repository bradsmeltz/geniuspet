/**
 * GeniusPet Dashboard - Reusable Components
 * HTML component generators
 */

const Components = {

  // Safety Score Ring Component
  safetyScoreRing(score, maxScore = 100, petName = 'your pet') {
    const percentage = (score / 100) * 100;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const isMaxedFree = score === 65 && maxScore === 65;

    return `
      <div class="bg-cream-light rounded-3xl p-6 slide-up">
        <div class="flex items-center gap-6">
          <!-- Score Ring -->
          <div class="relative w-28 h-28 flex-shrink-0">
            <svg class="w-full h-full score-ring" viewBox="0 0 100 100">
              <circle class="score-ring-bg" cx="50" cy="50" r="45" stroke-width="8" />
              <circle
                class="score-ring-progress"
                cx="50" cy="50" r="45"
                stroke-width="8"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${strokeDashoffset}"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold text-dark">${score}%</span>
              <span class="text-xs text-gray">Protected</span>
            </div>
          </div>

          <!-- Score Info -->
          <div class="flex-1">
            <h3 class="font-semibold text-dark mb-1">Safety Score</h3>
            ${isMaxedFree ? `
              <p class="text-sm text-gray mb-2">
                ${petName}'s free protection is maxed out
              </p>
              <p class="text-xs text-primary font-medium">
                Unlock 100% with Advanced Protection
              </p>
            ` : `
              <p class="text-sm text-gray">
                ${score < 50 ? `Let's improve ${petName}'s protection` :
                  score < 100 ? `${petName} is getting safer!` :
                  `${petName} is fully protected!`}
              </p>
            `}
          </div>
        </div>
      </div>
    `;
  },

  // Next Action Card
  nextActionCard(action, petName) {
    if (action.action === 'complete') {
      return `
        <div class="bg-green-50 border border-green-200 rounded-2xl p-5 slide-up" style="animation-delay: 0.1s">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i data-lucide="check-circle" class="w-6 h-6 text-green-600"></i>
            </div>
            <div>
              <h3 class="font-semibold text-green-800">${action.label}</h3>
              <p class="text-sm text-green-600">${action.description}</p>
            </div>
          </div>
        </div>
      `;
    }

    const isUpgrade = action.action === 'upgrade';

    return `
      <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm card-hover slide-up" style="animation-delay: 0.1s">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-semibold text-dark">${action.label}</h3>
              <span class="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                +${action.points}%
              </span>
            </div>
            <p class="text-sm text-gray">${action.description}</p>
          </div>
          <button
            onclick="handleAction('${action.action}')"
            class="${isUpgrade ? 'bg-primary hover:bg-primary-dark pulse-cta' : 'bg-dark hover:bg-gray-800'} text-white font-medium px-4 py-2 rounded-xl transition-colors btn-press"
          >
            ${isUpgrade ? 'Activate' : 'Add'}
          </button>
        </div>
      </div>
    `;
  },

  // Pet Card (mini version for header/switcher)
  petCardMini(pet, isActive = false) {
    const score = AppState.calculateSafetyScore(pet);
    return `
      <button
        onclick="AppState.setActivePet(${pet.id})"
        class="flex items-center gap-3 p-3 rounded-xl w-full text-left transition-colors ${isActive ? 'bg-cream-light' : 'hover:bg-gray-50'}"
      >
        <img
          src="${pet.photo}"
          alt="${pet.name}"
          class="w-10 h-10 rounded-full object-cover"
          onerror="this.src='https://via.placeholder.com/40?text=${pet.name[0]}'"
        >
        <div class="flex-1 min-w-0">
          <p class="font-medium text-dark truncate">${pet.name}</p>
          <p class="text-xs text-gray">${score}% protected</p>
        </div>
        ${isActive ? '<i data-lucide="check" class="w-5 h-5 text-primary"></i>' : ''}
      </button>
    `;
  },

  // Pet Card (full version for dashboard)
  petCardFull(pet) {
    const score = AppState.calculateSafetyScore(pet);

    return `
      <div class="flex items-center gap-4 mb-6 fade-in">
        <div class="relative">
          <img
            src="${pet.photo}"
            alt="${pet.name}"
            class="w-20 h-20 rounded-full pet-photo"
            onerror="this.src='https://via.placeholder.com/80?text=${pet.name[0]}'"
          >
          ${score === 100 ? `
            <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <i data-lucide="shield-check" class="w-4 h-4 text-white"></i>
            </div>
          ` : ''}
        </div>
        <div>
          <h2 class="text-xl font-bold text-dark">${pet.name}</h2>
          <p class="text-sm text-gray">${pet.breed}</p>
          <div class="flex items-center gap-2 mt-1">
            ${score >= 65 ? `
              <span class="badge badge-success">
                <i data-lucide="shield" class="w-3 h-3 mr-1"></i>
                Protected
              </span>
            ` : `
              <span class="badge badge-warning">
                <i data-lucide="alert-circle" class="w-3 h-3 mr-1"></i>
                Needs Attention
              </span>
            `}
          </div>
        </div>
      </div>
    `;
  },

  // Upgrade Section
  upgradeSection(petName, membersNearby = 47) {
    return `
      <div class="bg-gradient-to-br from-cream-light to-white border border-cream rounded-3xl p-6 mt-6 slide-up" style="animation-delay: 0.2s">
        <h3 class="text-lg font-bold text-dark mb-2">
          What happens if ${petName} goes missing?
        </h3>

        <div class="space-y-4 mb-5">
          <!-- Current Plan -->
          <div>
            <p class="text-sm font-medium text-gray mb-2">Currently:</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-dark">
                <i data-lucide="check" class="w-4 h-4 text-green-500"></i>
                Tag shows your contact info
              </li>
              <li class="flex items-center gap-2 text-sm text-dark">
                <i data-lucide="check" class="w-4 h-4 text-green-500"></i>
                You get an email alert
              </li>
            </ul>
          </div>

          <!-- Advanced Plan -->
          <div>
            <p class="text-sm font-medium text-primary mb-2">With Advanced Protection:</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-dark">
                <i data-lucide="message-circle" class="w-4 h-4 text-primary"></i>
                Know the moment someone finds ${petName}
              </li>
              <li class="flex items-center gap-2 text-sm text-dark">
                <i data-lucide="map-pin" class="w-4 h-4 text-primary"></i>
                See exactly where they were found
              </li>
              <li class="flex items-center gap-2 text-sm text-dark">
                <i data-lucide="users" class="w-4 h-4 text-primary"></i>
                Alert <strong>${membersNearby} neighbors</strong> instantly
              </li>
              <li class="flex items-center gap-2 text-sm text-dark">
                <i data-lucide="building-2" class="w-4 h-4 text-primary"></i>
                Flyers at 10 nearby shelters in minutes
              </li>
            </ul>
          </div>
        </div>

        <button
          onclick="handleAction('upgrade')"
          class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-2xl transition-colors btn-press pulse-cta"
        >
          Activate Full Protection
        </button>
      </div>
    `;
  },

  // Activity Item
  activityItem(activity, petName) {
    const icons = {
      scan: 'scan',
      registration: 'tag',
      alert: 'bell'
    };

    return `
      <div class="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
        <div class="w-10 h-10 bg-cream-light rounded-full flex items-center justify-center flex-shrink-0">
          <i data-lucide="${icons[activity.type] || 'activity'}" class="w-5 h-5 text-primary"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-dark">${activity.description}</p>
          <p class="text-sm text-gray">
            ${activity.date} at ${activity.time}
            ${activity.location ? ` • ${activity.location}` : ''}
          </p>
        </div>
      </div>
    `;
  },

  // Profile Section (expandable)
  profileSection(title, icon, content, isExpanded = false) {
    const sectionId = title.toLowerCase().replace(/\s+/g, '-');
    return `
      <div class="border border-gray-100 rounded-2xl overflow-hidden mb-3">
        <button
          onclick="toggleSection('${sectionId}')"
          class="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <i data-lucide="${icon}" class="w-5 h-5 text-primary"></i>
            <span class="font-medium text-dark">${title}</span>
          </div>
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray section-chevron" id="chevron-${sectionId}"></i>
        </button>
        <div id="section-${sectionId}" class="expandable-content ${isExpanded ? 'expanded' : ''}" style="${isExpanded ? 'max-height: 500px;' : ''}">
          <div class="p-4 pt-0 bg-gray-50">
            ${content}
          </div>
        </div>
      </div>
    `;
  },

  // Info Row (for profile)
  infoRow(label, value, hasCheckmark = false) {
    return `
      <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
        <span class="text-gray">${label}</span>
        <div class="flex items-center gap-2">
          <span class="font-medium text-dark">${value}</span>
          ${hasCheckmark ? '<i data-lucide="check-circle" class="w-4 h-4 text-green-500"></i>' : ''}
        </div>
      </div>
    `;
  },

  // Empty State (generic fallback)
  emptyState(icon, title, description, actionLabel = null, actionHandler = null) {
    return `
      <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div class="w-16 h-16 bg-cream-light rounded-full flex items-center justify-center mb-4">
          <i data-lucide="${icon}" class="w-8 h-8 text-primary"></i>
        </div>
        <h3 class="font-semibold text-dark mb-2">${title}</h3>
        <p class="text-sm text-gray mb-4">${description}</p>
        ${actionLabel ? `
          <button
            onclick="${actionHandler}"
            class="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2 rounded-xl transition-colors btn-press"
          >
            ${actionLabel}
          </button>
        ` : ''}
      </div>
    `;
  },

  // Welcome Onboarding — shown when user has no pets registered
  welcomeOnboarding(userName) {
    const firstName = userName || 'there';

    return `
      <!-- Welcome Hero -->
      <div class="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-tag-blue to-tag-blue-dark p-6 pb-7 mb-6 slide-up shadow-lg hero-glow text-center">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full"></div>
        <div class="absolute top-4 left-4 w-16 h-16 bg-white/5 rounded-full"></div>

        <div class="relative">
          <!-- Paw icon cluster -->
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <i data-lucide="heart" class="w-8 h-8 text-white"></i>
            </div>
          </div>

          <h1 class="text-2xl font-bold text-white mb-2">
            Hey ${firstName}, welcome!
          </h1>
          <p class="text-white/80 text-sm mb-6 max-w-[280px] mx-auto leading-relaxed">
            Your GeniusTag is on the way. Let's set up your pet's profile so it's ready to protect them the moment it arrives.
          </p>

          <button
            onclick="handleAction('registerPet')"
            class="w-full bg-white text-tag-blue font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors btn-press shadow-lg text-lg"
          >
            <i data-lucide="paw-print" class="w-5 h-5"></i>
            Register Your Pet
          </button>

          <p class="text-white/50 text-xs mt-3">Takes less than 2 minutes</p>
        </div>
      </div>

      <!-- How It Works -->
      <div class="mb-6 slide-up" style="animation-delay: 0.1s">
        <h3 class="font-bold text-dark text-base mb-4 text-center">How It Works</h3>
        <div class="flex gap-3">
          <div class="flex-1 text-center">
            <div class="w-12 h-12 bg-tint-blue rounded-2xl flex items-center justify-center mx-auto mb-2">
              <i data-lucide="clipboard-list" class="w-6 h-6 text-tag-blue"></i>
            </div>
            <p class="text-xs font-bold text-dark mb-0.5">1. Register</p>
            <p class="text-[11px] text-gray leading-tight">Add your pet's name, breed & details</p>
          </div>
          <div class="flex items-start pt-6">
            <i data-lucide="chevron-right" class="w-4 h-4 text-cream"></i>
          </div>
          <div class="flex-1 text-center">
            <div class="w-12 h-12 bg-tint-teal rounded-2xl flex items-center justify-center mx-auto mb-2">
              <i data-lucide="scan" class="w-6 h-6 text-vet-teal"></i>
            </div>
            <p class="text-xs font-bold text-dark mb-0.5">2. Activate</p>
            <p class="text-[11px] text-gray leading-tight">Your tag links to your pet's profile</p>
          </div>
          <div class="flex items-start pt-6">
            <i data-lucide="chevron-right" class="w-4 h-4 text-cream"></i>
          </div>
          <div class="flex-1 text-center">
            <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <i data-lucide="shield-check" class="w-6 h-6 text-primary"></i>
            </div>
            <p class="text-xs font-bold text-dark mb-0.5">3. Protected</p>
            <p class="text-[11px] text-gray leading-tight">Anyone can scan & contact you instantly</p>
          </div>
        </div>
      </div>

      <!-- Why Register? — Benefit Statements -->
      <div class="mb-6 slide-up" style="animation-delay: 0.2s">
        <h3 class="font-bold text-dark text-base mb-4 text-center">Why Register?</h3>

        <div class="space-y-3">
          <!-- Benefit 1: Instant Protection -->
          <div class="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100">
            <div class="w-10 h-10 bg-tint-blue rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="shield-check" class="w-5 h-5 text-tag-blue"></i>
            </div>
            <div>
              <h4 class="font-bold text-dark text-sm mb-0.5">Instant Protection</h4>
              <p class="text-gray text-xs leading-relaxed">Anyone who finds your pet can contact you immediately — no app needed</p>
            </div>
          </div>

          <!-- Benefit 2: Community Safety Net -->
          <div class="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100">
            <div class="w-10 h-10 bg-tint-teal rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="users" class="w-5 h-5 text-vet-teal"></i>
            </div>
            <div>
              <h4 class="font-bold text-dark text-sm mb-0.5">Community Safety Net</h4>
              <p class="text-gray text-xs leading-relaxed">Nearby pet parents get notified if your pet goes missing</p>
            </div>
          </div>

          <!-- Benefit 3: Health Profile -->
          <div class="flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100">
            <div class="w-10 h-10 bg-tint-gold rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <i data-lucide="clipboard-plus" class="w-5 h-5 text-insurance-gold"></i>
            </div>
            <div>
              <h4 class="font-bold text-dark text-sm mb-0.5">Health Profile on File</h4>
              <p class="text-gray text-xs leading-relaxed">Vets and shelters see your pet's medical info in an emergency</p>
            </div>
          </div>
        </div>
      </div>

      <!-- What You'll Unlock — Subtle Preview -->
      <div class="mb-6 slide-up" style="animation-delay: 0.25s">
        <div class="bg-cream-light rounded-2xl p-5 border border-cream">
          <p class="text-dark text-sm font-medium mb-3 text-center">After registering, you'll unlock your pet's <span class="text-primary font-bold">Safety Score</span> — a personalized protection plan.</p>
          <div class="space-y-2.5">
            <div class="flex items-center gap-2.5">
              <i data-lucide="check" class="w-4 h-4 text-vet-teal flex-shrink-0"></i>
              <p class="text-gray text-xs">Smart alerts & notifications</p>
            </div>
            <div class="flex items-center gap-2.5">
              <i data-lucide="check" class="w-4 h-4 text-vet-teal flex-shrink-0"></i>
              <p class="text-gray text-xs">24/7 vet telehealth access</p>
            </div>
            <div class="flex items-center gap-2.5">
              <i data-lucide="check" class="w-4 h-4 text-vet-teal flex-shrink-0"></i>
              <p class="text-gray text-xs">Affordable pet insurance</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA repeat -->
      <div class="mb-4 slide-up" style="animation-delay: 0.3s">
        <button
          onclick="handleAction('registerPet')"
          class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors btn-press pulse-cta text-lg"
        >
          <i data-lucide="paw-print" class="w-5 h-5"></i>
          Register Your Pet
        </button>
      </div>

      <!-- Trust Badge -->
      ${this.trustBadge()}
    `;
  },

  // Toggle Switch
  toggleSwitch(id, label, description, isChecked = false, onChange = null) {
    return `
      <div class="flex items-start justify-between py-4 border-b border-gray-100 last:border-0">
        <div class="flex-1 pr-4">
          <p class="font-medium text-dark">${label}</p>
          ${description ? `<p class="text-sm text-gray mt-0.5">${description}</p>` : ''}
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="${id}"
            class="sr-only peer"
            ${isChecked ? 'checked' : ''}
            ${onChange ? `onchange="${onChange}"` : ''}
          >
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
    `;
  },

  // Button
  button(label, variant = 'primary', onClick = null, icon = null, fullWidth = false) {
    const variants = {
      primary: 'bg-primary hover:bg-primary-dark text-white',
      secondary: 'bg-dark hover:bg-gray-800 text-white',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-primary hover:bg-primary/10'
    };

    return `
      <button
        ${onClick ? `onclick="${onClick}"` : ''}
        class="${variants[variant]} font-medium px-6 py-3 rounded-xl transition-colors btn-press ${fullWidth ? 'w-full' : ''} flex items-center justify-center gap-2"
      >
        ${icon ? `<i data-lucide="${icon}" class="w-5 h-5"></i>` : ''}
        ${label}
      </button>
    `;
  },

  // Feature Toggle with locked state support (Mission Control)
  featureToggle(id, label, description, state, bonusText = null, onToggle = null) {
    const isLocked = state === 'locked';
    const isEnabled = state === 'enabled';

    const stateClasses = {
      enabled: 'bg-[#E8F5E9] border-[#C8E6C9]',
      disabled: 'bg-white border-cream',
      locked: 'bg-[#FAFAFA] border-gray-200'
    };

    const iconHtml = isLocked
      ? '<i data-lucide="lock" class="w-5 h-5 text-gray-400"></i>'
      : isEnabled
        ? '<i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>'
        : '<i data-lucide="circle" class="w-5 h-5 text-gray-300"></i>';

    return `
      <div class="feature-toggle flex items-center justify-between p-4 rounded-xl border ${stateClasses[state]} transition-all ${isLocked ? 'opacity-75' : ''}">
        <div class="flex items-center gap-3 flex-1">
          <div class="flex-shrink-0">
            ${iconHtml}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="font-medium ${isLocked ? 'text-gray-500' : 'text-dark'}">${label}</p>
              ${bonusText ? `<span class="text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">${bonusText}</span>` : ''}
            </div>
            <p class="text-sm text-gray mt-0.5">${description}</p>
          </div>
        </div>
        <div class="flex-shrink-0 ml-3">
          ${isLocked ? `
            <button
              onclick="handleAction('upgrade')"
              class="text-xs font-semibold text-primary hover:text-primary-dark transition-colors px-3 py-1.5 bg-primary/10 rounded-lg hover:bg-primary/20"
            >
              Unlock
            </button>
          ` : `
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                ${isEnabled ? 'checked' : ''}
                ${onToggle ? `onchange="${onToggle}"` : ''}
              >
              <div class="w-11 h-6 bg-cream peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          `}
        </div>
      </div>
    `;
  },

  // Control Section (expandable) for Mission Control
  controlSection(id, title, icon, content, isExpanded = false, badge = null, accentColor = 'primary') {
    // Map section types to tinted backgrounds
    const tints = {
      alerts: 'bg-tint-blue',
      'profile-sections': 'bg-tint-cream'
    };
    const iconTints = {
      alerts: 'bg-[#E3F0F7]',
      'profile-sections': 'bg-[#F5EFE3]'
    };
    const iconColors = {
      alerts: 'text-tag-blue',
      'profile-sections': 'text-vet-teal'
    };

    const bgTint = tints[id] || 'bg-white';
    const iconBg = iconTints[id] || 'bg-cream-light';
    const iconColor = iconColors[id] || 'text-primary';

    return `
      <div class="control-section ${bgTint} border border-cream/50 rounded-2xl overflow-hidden mb-4 slide-up">
        <button
          onclick="toggleControlSection('${id}')"
          class="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center">
              <i data-lucide="${icon}" class="w-5 h-5 ${iconColor}"></i>
            </div>
            <span class="font-semibold text-dark">${title}</span>
          </div>
          <div class="flex items-center gap-2">
            ${badge ? `<span class="text-xs font-medium text-gray bg-white/80 px-2 py-1 rounded-full">${badge}</span>` : ''}
            <i data-lucide="chevron-down" class="w-5 h-5 text-gray control-chevron transition-transform" id="chevron-ctrl-${id}"></i>
          </div>
        </button>
        <div id="section-ctrl-${id}" class="control-section-content ${isExpanded ? 'expanded' : ''}" style="${isExpanded ? 'max-height: 1000px;' : 'max-height: 0;'}">
          <div class="px-4 pb-4 space-y-2">
            ${content}
          </div>
        </div>
      </div>
    `;
  },

  // Quick Action Button for Mission Control
  quickActionButton(label, icon, variant, onClick) {
    const variants = {
      primary: 'bg-primary hover:bg-primary-dark text-white',
      secondary: 'bg-dark hover:bg-gray-800 text-white',
      outline: 'border-2 border-gray-200 hover:border-primary text-dark hover:text-primary bg-white'
    };

    return `
      <button
        onclick="${onClick}"
        class="${variants[variant]} font-medium py-3 px-4 rounded-xl transition-all btn-press flex items-center justify-center gap-2 flex-1"
      >
        <i data-lucide="${icon}" class="w-5 h-5"></i>
        <span class="text-sm">${label}</span>
      </button>
    `;
  },

  // Compact Pet Header with inline progress bar
  petHeaderCompact(pet, score) {
    return `
      <div class="flex items-center gap-4 mb-5 fade-in">
        <div class="relative flex-shrink-0">
          <img
            src="${pet.photo}"
            alt="${pet.name}"
            class="w-16 h-16 rounded-full pet-photo"
            onerror="this.src='https://via.placeholder.com/64?text=${pet.name[0]}'"
          >
          ${score === 100 ? `
            <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <i data-lucide="shield-check" class="w-3 h-3 text-white"></i>
            </div>
          ` : ''}
        </div>
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-bold text-dark truncate">${pet.name}</h2>
          <p class="text-sm text-gray truncate">${pet.breed}</p>
          <div class="mt-2 flex items-center gap-2">
            <div class="flex-1 h-2 bg-cream rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full transition-all duration-500" style="width: ${score}%"></div>
            </div>
            <span class="text-xs font-semibold text-primary">${score}%</span>
          </div>
        </div>
      </div>
    `;
  },

  // Premium Pet Hero Card - large, warm, emotional (GeniusTag Blue)
  petHeroCard(pet, score, tier) {
    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const tierDotColor = score >= 95 ? 'bg-green-400' : score >= 40 ? 'bg-amber-400' : 'bg-red-400';

    return `
      <div class="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-tag-blue to-tag-blue-dark p-5 mb-4 slide-up shadow-lg hero-glow">
        <!-- Decorative circles -->
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full"></div>

        <div class="relative flex items-center gap-4">
          <!-- Pet Photo with Score Ring -->
          <div class="relative flex-shrink-0">
            <svg class="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.2)" stroke-width="8" fill="none" />
              <circle cx="60" cy="60" r="54" stroke="white" stroke-width="8" fill="none"
                stroke-linecap="round"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${strokeDashoffset}"
                class="transition-all duration-1000"
              />
            </svg>
            <img
              src="${pet.photo}"
              alt="${pet.name}"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
              onerror="this.src='https://via.placeholder.com/80?text=${pet.name[0]}'"
            >
          </div>

          <!-- Pet Info -->
          <div class="flex-1 text-white">
            <p class="text-white/70 text-sm font-medium mb-1">Safety Score</p>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-4xl font-bold">${score}</span>
              <span class="text-2xl">%</span>
            </div>
            <h2 class="text-xl font-bold mb-1">${pet.name}</h2>
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${tier ? tier.bgClass : 'bg-white/20'} backdrop-blur-sm">
              ${tier ? `<i data-lucide="${tier.icon}" class="w-3 h-3"></i>` : ''}
              <span class="${tierDotColor} w-1.5 h-1.5 rounded-full"></span>
              ${tier ? tier.name + ' Protection' : 'Starter'}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="relative mt-4 flex items-center gap-2">
          <button
            onclick="window.location.hash='#/profile'"
            class="flex-1 bg-white/20 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <i data-lucide="id-card" class="w-4 h-4"></i>
            View ID
          </button>
          <button
            onclick="showLostPetModal()"
            class="flex-1 bg-white/20 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm"
          >
            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
            Report Lost
          </button>
        </div>
      </div>
    `;
  },

  // Pet Family Carousel — horizontal snap-scroll pet cards
  petFamilyCarousel(allPets, activePetId) {
    if (!allPets || allPets.length <= 1) return '';

    const cards = allPets.map(pet => {
      const isActive = pet.id === activePetId;
      // Temporarily apply pet's scenario to compute its correct score
      let petScore;
      if (isActive) {
        petScore = AppState.calculateSafetyScore(pet);
      } else {
        const savedUser = { ...AppState.user };
        const scenario = MockData.petScenarios[pet.id];
        if (scenario) Object.assign(AppState.user, scenario);
        petScore = AppState.calculateSafetyScore(pet);
        AppState.user = savedUser;
      }
      const petTier = AppState.getProtectionTier(petScore);
      const circumference = 2 * Math.PI * 18;
      const offset = circumference - (petScore / 100) * circumference;

      return `
        <button
          onclick="AppState.setActivePet(${pet.id});"
          class="pet-carousel-card flex-shrink-0 ${isActive ? 'pet-carousel-card--active' : ''}"
        >
          <div class="relative">
            <!-- Mini score ring -->
            <svg class="w-14 h-14 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" stroke="${isActive ? 'rgba(48,125,166,0.2)' : 'rgba(0,0,0,0.06)'}" stroke-width="3" fill="none" />
              <circle cx="22" cy="22" r="18" stroke="${isActive ? '#307DA6' : '#9ca3af'}" stroke-width="3" fill="none"
                stroke-linecap="round"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
              />
            </svg>
            <img
              src="${pet.photo}"
              alt="${pet.name}"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full object-cover ${isActive ? 'border-2 border-tag-blue' : 'border-2 border-white'} shadow-sm"
              onerror="this.src='https://via.placeholder.com/40?text=${pet.name[0]}'"
            >
          </div>
          <span class="pet-carousel-name ${isActive ? 'text-dark font-bold' : 'text-gray font-medium'}">${pet.name}</span>
          <span class="pet-carousel-score ${isActive ? 'text-tag-blue' : 'text-gray'}">${petScore}%</span>
        </button>
      `;
    }).join('');

    return `
      <div class="pet-carousel-wrapper mb-5 slide-up" style="animation-delay: 0.05s">
        <div class="pet-carousel hide-scrollbar">
          ${cards}
          <button
            onclick="handleAction('registerPet')"
            class="pet-carousel-card pet-carousel-card--add flex-shrink-0"
          >
            <div class="w-14 h-14 rounded-full border-2 border-dashed border-cream flex items-center justify-center">
              <i data-lucide="plus" class="w-5 h-5 text-gray"></i>
            </div>
            <span class="pet-carousel-name text-gray font-medium">Add Pet</span>
            <span class="pet-carousel-score text-transparent">—</span>
          </button>
        </div>
      </div>
    `;
  },

  // Pet Selector Tabs - modern pill style
  petSelectorTabs(pets, activePetId) {
    const tabs = pets.map(pet => {
      const isActive = pet.id === activePetId;
      return `
        <button
          onclick="AppState.setActivePet(${pet.id});"
          class="flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isActive
            ? 'bg-white shadow-md'
            : 'bg-transparent hover:bg-white/50'}"
        >
          <img
            src="${pet.photo}"
            alt="${pet.name}"
            class="w-7 h-7 rounded-full object-cover ${isActive ? 'ring-2 ring-primary' : ''}"
            onerror="this.src='https://via.placeholder.com/28?text=${pet.name[0]}'"
          >
          <span class="font-medium text-sm ${isActive ? 'text-dark' : 'text-gray'}">${pet.name}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="flex items-center gap-1 p-1 bg-cream/50 rounded-full mb-5 overflow-x-auto hide-scrollbar">
        ${tabs}
        <button
          onclick="handleAction('registerPet')"
          class="flex items-center gap-1 px-3 py-2 rounded-full text-gray hover:text-primary transition-colors"
        >
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span class="text-sm font-medium">Add</span>
        </button>
      </div>
    `;
  },

  // Premium Feature Card - colorful sections like the homepage
  premiumFeatureCard(id, title, subtitle, icon, color, features, isExpanded = false) {
    const colorStyles = {
      blue: { bg: 'bg-tag-blue', light: 'bg-tint-blue', text: 'text-tag-blue', border: 'border-tag-blue/20' },
      teal: { bg: 'bg-vet-teal', light: 'bg-tint-teal', text: 'text-vet-teal', border: 'border-vet-teal/20' },
      gold: { bg: 'bg-insurance-gold', light: 'bg-tint-gold', text: 'text-insurance-gold', border: 'border-insurance-gold/20' },
      purple: { bg: 'bg-rx-purple', light: 'bg-tint-purple', text: 'text-rx-purple', border: 'border-rx-purple/20' }
    };
    const style = colorStyles[color] || colorStyles.blue;

    return `
      <div class="rounded-[20px] ${style.light} border ${style.border} overflow-hidden mb-4 slide-up shadow-sm">
        <button
          onclick="toggleControlSection('${id}')"
          class="w-full p-4 flex items-center gap-4 text-left hover:bg-white/30 transition-colors"
        >
          <div class="w-12 h-12 ${style.bg} rounded-2xl flex items-center justify-center shadow-sm">
            <i data-lucide="${icon}" class="w-6 h-6 text-white"></i>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-dark text-base">${title}</h3>
            <p class="text-sm text-gray">${subtitle}</p>
          </div>
          <i data-lucide="chevron-down" class="w-5 h-5 text-gray control-chevron transition-transform" id="chevron-ctrl-${id}"></i>
        </button>
        <div id="section-ctrl-${id}" class="control-section-content ${isExpanded ? 'expanded' : ''}" style="${isExpanded ? 'max-height: 1000px;' : 'max-height: 0;'}">
          <div class="px-4 pb-4 space-y-2">
            ${features}
          </div>
        </div>
      </div>
    `;
  },

  // Modern Feature Toggle - cleaner, more premium
  modernFeatureToggle(id, label, description, state, bonusText = null, onToggle = null) {
    const isLocked = state === 'locked';
    const isEnabled = state === 'enabled';

    return `
      <div class="flex items-center justify-between p-3 rounded-xl bg-white/80 backdrop-blur-sm ${isLocked ? 'opacity-60' : ''}">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center ${isEnabled ? 'bg-green-100' : isLocked ? 'bg-gray-100' : 'bg-gray-50'}">
            ${isLocked
              ? '<i data-lucide="lock" class="w-4 h-4 text-gray-400"></i>'
              : isEnabled
                ? '<i data-lucide="check" class="w-4 h-4 text-green-600"></i>'
                : '<i data-lucide="circle" class="w-4 h-4 text-gray-300"></i>'
            }
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="font-medium text-sm ${isLocked ? 'text-gray-500' : 'text-dark'} truncate">${label}</p>
              ${bonusText ? `<span class="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">${bonusText}</span>` : ''}
            </div>
            <p class="text-xs text-gray truncate">${description}</p>
          </div>
        </div>
        <div class="flex-shrink-0 ml-2">
          ${isLocked ? `
            <button onclick="handleAction('upgrade')" class="text-xs font-semibold text-primary">
              Unlock
            </button>
          ` : `
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" ${isEnabled ? 'checked' : ''} ${onToggle ? `onchange="${onToggle}"` : ''}>
              <div class="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:shadow-sm after:transition-all"></div>
            </label>
          `}
        </div>
      </div>
    `;
  },

  // Trust Badge / Social Proof
  trustBadge() {
    return `
      <div class="flex items-center justify-center gap-3 py-4 mb-4">
        <div class="flex -space-x-2">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-8 h-8 rounded-full border-2 border-white" alt="">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-8 h-8 rounded-full border-2 border-white" alt="">
          <img src="https://randomuser.me/api/portraits/women/68.jpg" class="w-8 h-8 rounded-full border-2 border-white" alt="">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" class="w-8 h-8 rounded-full border-2 border-white" alt="">
        </div>
        <div class="flex flex-col">
          <div class="flex text-amber-400">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
          </div>
          <p class="text-xs text-gray">76,000+ happy pet parents</p>
        </div>
      </div>
    `;
  },

  // Quick Stats Row - modern cards
  quickStatsRow(pet) {
    return `
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-cream/50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-tint-blue rounded-xl flex items-center justify-center">
              <i data-lucide="scan" class="w-5 h-5 text-tag-blue"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-dark">${pet.totalScans}</p>
              <p class="text-xs text-gray">Tag Scans</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-cream/50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-tint-teal rounded-xl flex items-center justify-center">
              <i data-lucide="users" class="w-5 h-5 text-vet-teal"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-dark">${MockData.community.membersNearby}</p>
              <p class="text-xs text-gray">Neighbors</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Premium CTA Card (Insurance Gold)
  premiumCtaCard(petName) {
    return `
      <div class="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-insurance-gold to-insurance-gold-dark p-5 text-white shadow-lg slide-up">
        <div class="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full"></div>
        <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full"></div>

        <div class="relative">
          <h3 class="text-xl font-bold mb-2">
            Keep ${petName} <em>safe.</em>
          </h3>
          <p class="text-white/80 text-sm mb-4">
            Unlock instant SMS alerts, GPS location, and alert ${MockData.community.membersNearby} neighbors if ${petName} ever goes missing.
          </p>
          <button
            onclick="handleAction('upgrade')"
            class="w-full bg-white text-insurance-gold font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-sm"
          >
            Activate Protection
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
          <p class="text-center text-white/60 text-xs mt-3">Cancel anytime</p>
        </div>
      </div>
    `;
  },

  // Product Card - for TeleVet, Insurance, RX
  productCard(product) {
    // product = { name, description, icon, color, cta, status, url }
    const colorStyles = {
      teal: {
        bg: 'bg-gradient-to-br from-vet-teal to-vet-teal-dark',
        light: 'bg-tint-teal',
        text: 'text-vet-teal'
      },
      gold: {
        bg: 'bg-gradient-to-br from-insurance-gold to-insurance-gold-dark',
        light: 'bg-tint-gold',
        text: 'text-insurance-gold'
      },
      purple: {
        bg: 'bg-gradient-to-br from-rx-purple to-rx-purple-dark',
        light: 'bg-tint-purple',
        text: 'text-rx-purple'
      },
      blue: {
        bg: 'bg-gradient-to-br from-tag-blue to-tag-blue-dark',
        light: 'bg-tint-blue',
        text: 'text-tag-blue'
      }
    };
    const style = colorStyles[product.color] || colorStyles.teal;
    const isComingSoon = product.status === 'coming_soon';

    return `
      <div class="relative overflow-hidden rounded-2xl ${style.bg} p-4 text-white mb-3 slide-up shadow-md ${isComingSoon ? 'opacity-80' : ''}">
        <div class="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>

        <div class="relative flex items-center gap-4">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <i data-lucide="${product.icon}" class="w-6 h-6 text-white"></i>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-base">${product.name}</h4>
            <p class="text-white/70 text-sm truncate">${product.description}</p>
          </div>
          ${isComingSoon ? `
            <span class="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Coming Soon
            </span>
          ` : `
            <button
              onclick="handleProductAction('${product.name.toLowerCase().replace(/\s/g, '-')}')"
              class="bg-white ${style.text} text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-1"
            >
              ${product.cta}
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          `}
        </div>
      </div>
    `;
  },

  // ===== PROTECTION ROADMAP =====

  // Main Protection Roadmap - unified score journey
  protectionRoadmap(pet, breakdown, nextActions) {
    const score = AppState.calculateSafetyScore(pet);
    const maxScore = AppState.getMaxScore();
    const tier = AppState.getProtectionTier(score);
    const isAdvanced = AppState.user.plan === 'advanced';

    return `
      <div class="mb-6 slide-up">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-dark text-lg">Improve ${pet.name}'s Protection</h3>
          <span class="text-sm font-semibold text-${tier.color}">${tier.name}</span>
        </div>

        <!-- Overall progress bar -->
        <div class="mb-5">
          <div class="flex justify-between text-xs text-gray mb-1.5">
            <span>${score} of 100 pts</span>
            <span>${100 - score} pts available</span>
          </div>
          <div class="h-2.5 bg-cream rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-primary to-tag-blue rounded-full transition-all duration-700" style="width: ${score}%"></div>
          </div>
        </div>

        <!-- Tier Sections -->
        <div class="space-y-3">
          ${this.roadmapTierSection('profile', breakdown.profile, pet, isAdvanced)}
          ${this.roadmapTierSection('advanced', breakdown.advanced, pet, isAdvanced)}
          ${this.roadmapProductTier('televet', breakdown.televet)}
          ${this.roadmapProductTier('insurance', breakdown.insurance)}
          ${this.roadmapProductTier('rx', breakdown.rx)}
        </div>
      </div>
    `;
  },

  // Roadmap tier section (for profile and advanced tiers with sub-items)
  roadmapTierSection(tierKey, tierData, pet, isAdvanced) {
    const tierDef = MockData.scoreTiers[tierKey];
    const isComplete = tierData.earned === tierData.max;
    const isLocked = tierData.locked;
    const pct = tierData.max > 0 ? Math.round((tierData.earned / tierData.max) * 100) : 0;

    const colorMap = {
      blue: { bg: 'bg-tag-blue', text: 'text-tag-blue', fill: 'bg-tag-blue', tint: 'bg-tint-blue' },
      teal: { bg: 'bg-vet-teal', text: 'text-vet-teal', fill: 'bg-vet-teal', tint: 'bg-tint-teal' },
      gold: { bg: 'bg-insurance-gold', text: 'text-insurance-gold', fill: 'bg-insurance-gold', tint: 'bg-tint-gold' },
      purple: { bg: 'bg-rx-purple', text: 'text-rx-purple', fill: 'bg-rx-purple', tint: 'bg-tint-purple' }
    };
    const colors = colorMap[tierDef.color] || colorMap.blue;

    // If locked (advanced tier and user is free) — show always-visible locked toggles
    if (isLocked && tierKey === 'advanced') {
      const lockedFeatures = [
        { icon: 'message-circle', label: 'SMS & Call Alerts', desc: 'Know instantly when someone finds ' + pet.name, points: 7 },
        { icon: 'users', label: 'Lost Pet Network', desc: 'Alert nearby pet parents in your area', points: 10 },
        { icon: 'map-pin', label: 'GPS Location', desc: 'See exactly where ' + pet.name + ' was found', points: 8 }
      ];

      return `
        <div class="rounded-2xl border border-tag-blue/20 bg-tint-blue/30 overflow-hidden">
          <!-- Header — always visible -->
          <div class="p-4 pb-2 flex items-center gap-3">
            <div class="w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <i data-lucide="${tierDef.icon}" class="w-5 h-5 text-white"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-dark text-sm">${tierDef.label}</h4>
                <span class="text-xs font-semibold text-tag-blue bg-tag-blue/10 px-2 py-0.5 rounded-full">+${tierData.max} pts</span>
              </div>
              <p class="text-xs text-gray mt-0.5">Keep ${pet.name} safer with real-time alerts</p>
            </div>
          </div>

          <!-- Locked toggles — always visible, tapping triggers upgrade -->
          <div class="px-4 pb-2 space-y-1.5">
            ${lockedFeatures.map(f => `
              <button onclick="handleAction('upgrade')" class="locked-toggle w-full flex items-center gap-3 p-3 rounded-xl bg-white/70 hover:bg-white transition-all group text-left">
                <div class="w-9 h-9 rounded-lg bg-tag-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-tag-blue/20 transition-colors">
                  <i data-lucide="${f.icon}" class="w-4.5 h-4.5 text-tag-blue"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-dark">${f.label}</p>
                  <p class="text-xs text-gray truncate">${f.desc}</p>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span class="text-xs font-bold text-tag-blue">+${f.points}</span>
                  <div class="locked-toggle-switch">
                    <div class="locked-toggle-knob">
                      <i data-lucide="lock" class="w-2.5 h-2.5 text-gray"></i>
                    </div>
                  </div>
                </div>
              </button>
            `).join('')}
          </div>

          <!-- Unlock CTA -->
          <div class="px-4 pb-4 pt-2">
            <button onclick="handleAction('upgrade')" class="w-full bg-tag-blue text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-tag-blue-dark transition-colors btn-press">
              <i data-lucide="shield" class="w-4 h-4"></i>
              Unlock All Features
            </button>
          </div>
        </div>
      `;
    }

    // Advanced tier — unlocked: show real functional toggles
    if (tierKey === 'advanced' && !isLocked) {
      const isExpanded = !isComplete;
      return `
        <div class="rounded-2xl ${isComplete ? 'bg-green-50/50 border border-green-200/50' : 'border border-tag-blue/20 bg-tint-blue/30'} overflow-hidden">
          <button onclick="toggleRoadmapTier('${tierKey}')" class="roadmap-tier-header w-full p-4 flex items-center gap-3 text-left">
            <div class="w-10 h-10 ${isComplete ? 'bg-green-500' : colors.bg} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <i data-lucide="${isComplete ? 'check' : tierDef.icon}" class="w-5 h-5 text-white"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-dark text-sm">${tierDef.label}</h4>
                <span class="text-xs font-medium text-gray">${tierData.earned}/${tierData.max} pts</span>
              </div>
              <div class="tier-progress-bar mt-2">
                <div class="tier-progress-bar__fill ${isComplete ? 'bg-green-500' : colors.fill}" style="width: ${pct}%"></div>
              </div>
            </div>
            <i data-lucide="chevron-down" class="w-4 h-4 text-gray control-chevron transition-transform ${isExpanded ? 'rotate-180' : ''}" id="chevron-roadmap-${tierKey}"></i>
          </button>
          <div id="section-roadmap-${tierKey}" class="control-section-content ${isExpanded ? 'expanded' : ''}" style="${isExpanded ? 'max-height: 1000px;' : 'max-height: 0;'}">
            <div class="px-4 pb-3 space-y-1.5">
              ${tierData.items.map(item => `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-white/70">
                  <div class="w-9 h-9 rounded-lg ${item.done ? 'bg-green-100' : 'bg-tag-blue/10'} flex items-center justify-center flex-shrink-0">
                    <i data-lucide="${item.icon || 'circle'}" class="w-4.5 h-4.5 ${item.done ? 'text-green-600' : 'text-tag-blue'}"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm text-dark">${item.label}</p>
                    <p class="text-xs text-gray">${item.done ? 'Active' : '+' + item.points + ' pts'}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" class="sr-only peer" ${item.done ? 'checked' : ''} onchange="handleFeatureToggle('${item.key}')">
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-tag-blue peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:shadow-sm after:transition-all"></div>
                  </label>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // Regular tier section (profile) with checklist items
    const isExpanded = !isComplete && !isLocked;
    return `
      <div class="rounded-2xl ${isComplete ? 'bg-green-50/50 border border-green-200/50' : 'border border-cream'} overflow-hidden">
        <button onclick="toggleRoadmapTier('${tierKey}')" class="roadmap-tier-header w-full p-4 flex items-center gap-3 text-left">
          <div class="w-10 h-10 ${isComplete ? 'bg-green-500' : colors.bg} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <i data-lucide="${isComplete ? 'check' : tierDef.icon}" class="w-5 h-5 text-white"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-dark text-sm">${tierDef.label}</h4>
              <span class="text-xs font-medium text-gray">${tierData.earned}/${tierData.max} pts</span>
            </div>
            <div class="tier-progress-bar mt-2">
              <div class="tier-progress-bar__fill ${isComplete ? 'bg-green-500' : colors.fill}" style="width: ${pct}%"></div>
            </div>
          </div>
          <i data-lucide="chevron-down" class="w-4 h-4 text-gray control-chevron transition-transform ${isExpanded ? 'rotate-180' : ''}" id="chevron-roadmap-${tierKey}"></i>
        </button>
        <div id="section-roadmap-${tierKey}" class="control-section-content ${isExpanded ? 'expanded' : ''}" style="${isExpanded ? 'max-height: 1000px;' : 'max-height: 0;'}">
          <div class="px-4 pb-3 space-y-1">
            ${tierData.items.map(item => `
              <div class="roadmap-item flex items-center gap-3 py-2 px-2 rounded-lg">
                <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-green-100' : 'bg-gray-100'}">
                  ${item.done
                    ? '<i data-lucide="check" class="w-3.5 h-3.5 text-green-600"></i>'
                    : `<i data-lucide="${item.icon || 'circle'}" class="w-3.5 h-3.5 text-gray"></i>`
                  }
                </div>
                <span class="flex-1 text-sm ${item.done ? 'text-gray line-through' : 'text-dark'}">${item.label}</span>
                ${item.done
                  ? '<span class="text-xs text-green-600 font-medium">Done</span>'
                  : `<button onclick="handleAction('${item.action}')" class="text-xs font-semibold ${colors.text} bg-${tierDef.color === 'blue' ? 'tag-blue' : tierDef.color}/10 px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity">+${item.points}</button>`
                }
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // Roadmap product tier (for TeleVet, Insurance, RX — single enrollment items)
  roadmapProductTier(tierKey, tierData) {
    const tierDef = MockData.scoreTiers[tierKey];
    const isEnrolled = tierData.enrolled;
    const isComingSoon = tierData.comingSoon && !isEnrolled;

    const colorMap = {
      teal: { bg: 'bg-vet-teal', text: 'text-vet-teal', gradient: 'from-vet-teal to-vet-teal-dark' },
      gold: { bg: 'bg-insurance-gold', text: 'text-insurance-gold', gradient: 'from-insurance-gold to-insurance-gold-dark' },
      purple: { bg: 'bg-rx-purple', text: 'text-rx-purple', gradient: 'from-rx-purple to-rx-purple-dark' }
    };
    const colors = colorMap[tierDef.color] || colorMap.teal;

    const descMap = { televet: '24/7 access to licensed vets', insurance: 'Protect against accidents & illness', rx: 'Easy prescription refills & discounts' };
    const ctaMap = { televet: 'enrollTeleVet', insurance: 'enrollInsurance', rx: 'enrollRx' };

    if (isEnrolled) {
      return `
        <div class="rounded-2xl bg-green-50/50 border border-green-200/50 p-4 flex items-center gap-3">
          <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 enrolled-badge">
            <i data-lucide="check" class="w-5 h-5 text-white"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-dark text-sm">${tierDef.label}</h4>
            <p class="text-xs text-green-600 font-medium">Enrolled — ${tierData.max} pts earned</p>
          </div>
          <span class="text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">+${tierData.max}</span>
        </div>
      `;
    }

    if (isComingSoon) {
      return `
        <div class="rounded-2xl border border-cream p-4 flex items-center gap-3 opacity-60">
          <div class="w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <i data-lucide="${tierDef.icon}" class="w-5 h-5 text-white"></i>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-dark text-sm">${tierDef.label}</h4>
              <span class="text-xs font-semibold text-gray bg-gray-100 px-2 py-0.5 rounded-full">Coming Soon</span>
            </div>
            <p class="text-xs text-gray mt-0.5">${descMap[tierKey]} — +${tierData.max} pts</p>
          </div>
        </div>
      `;
    }

    // Not enrolled — show product CTA
    return `
      <div class="rounded-2xl border border-cream overflow-hidden">
        <div class="p-4 flex items-center gap-3">
          <div class="w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <i data-lucide="${tierDef.icon}" class="w-5 h-5 text-white"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-dark text-sm">${tierDef.label}</h4>
              <span class="text-xs font-semibold ${colors.text} bg-${tierDef.color === 'teal' ? 'vet-teal' : tierDef.color === 'gold' ? 'insurance-gold' : 'rx-purple'}/10 px-2 py-0.5 rounded-full">+${tierData.max} pts</span>
            </div>
            <p class="text-xs text-gray mt-0.5">${descMap[tierKey]}</p>
          </div>
          <button
            onclick="handleAction('${ctaMap[tierKey]}')"
            class="${colors.bg} text-white text-xs font-semibold px-3 py-2 rounded-xl hover:opacity-90 transition-opacity btn-press flex items-center gap-1"
          >
            Add
            <i data-lucide="plus" class="w-3 h-3"></i>
          </button>
        </div>
      </div>
    `;
  },

  // Celebration toast for tier upgrades
  showCelebrationToast(tierName, score) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast celebration-toast';
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">🎉</span>
        <div>
          <p class="font-bold">${tierName} Protection!</p>
          <p class="text-white/70 text-xs">${score}% — Keep going!</p>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // Toast notification
  showToast(message, duration = 3000) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Remove after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// Toggle roadmap tier sections
function toggleRoadmapTier(tierKey) {
  const content = document.getElementById(`section-roadmap-${tierKey}`);
  const chevron = document.getElementById(`chevron-roadmap-${tierKey}`);

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

// Helper function to toggle expandable sections
function toggleSection(sectionId) {
  const content = document.getElementById(`section-${sectionId}`);
  const chevron = document.getElementById(`chevron-${sectionId}`);

  if (content) {
    content.classList.toggle('expanded');
    if (content.classList.contains('expanded')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      chevron?.classList.add('rotate-180');
    } else {
      content.style.maxHeight = '0';
      chevron?.classList.remove('rotate-180');
    }
  }
}
