/**
 * GeniusPet Registration Flow — Navigation & Session Helpers
 *
 * Manages pet profile data in sessionStorage, URL param fallbacks,
 * score state persistence, page personalization, and navigation.
 *
 * sessionStorage keys:
 *   petProfile  — { name, email, phone, petType, breed, age, ageNumeric }
 *   safetyScore — { products: { geniusTag, advancedProtection, teleVet, insurance } }
 *   registrationFlow — { source, startedAt }
 */


/* ==========================================================================
   Pet Profile — Read / Write
   ========================================================================== */

function getPetData() {
  var petData = { name: 'your pet' };

  var sessionData = sessionStorage.getItem('petProfile');
  if (sessionData) {
    try {
      var parsed = JSON.parse(sessionData);
      Object.assign(petData, parsed);
    } catch (e) { /* corrupted — fall through */ }
  }

  // URL param fallback for name and email
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('name') && petData.name === 'your pet') {
    petData.name = urlParams.get('name');
  }
  if (urlParams.get('email') && !petData.email) {
    petData.email = urlParams.get('email');
  }

  return petData;
}

function savePetData(updates) {
  var current = getPetData();
  Object.assign(current, updates);
  sessionStorage.setItem('petProfile', JSON.stringify(current));
}


/* ==========================================================================
   URL Params — Build from Session
   ========================================================================== */

function buildParams() {
  var petData = getPetData();
  var params = new URLSearchParams();

  if (petData.name && petData.name !== 'your pet') {
    params.set('name', petData.name);
  }
  if (petData.email) {
    params.set('email', petData.email);
  }

  return params.toString();
}


/* ==========================================================================
   Page Navigation
   ========================================================================== */

function navigateTo(page) {
  var params = buildParams();
  window.location.href = page + (params ? '?' + params : '');
}


/* ==========================================================================
   Score State — Read / Write
   ========================================================================== */

function getScoreState() {
  var defaults = {
    products: {
      // BASE — GeniusTag (always true in registration flow)
      geniusTag: true,
      // TIER 1 — Care Profile (set during registration steps)
      basicComplete: true,      // name, breed, age filled during registration
      hasPhoto: false,           // not uploaded during registration
      emergencyContacts: false,  // not added during registration
      phoneVerified: false,      // not verified during registration
      healthInfoComplete: false, // requires Advanced Protection plan
      // TIER 2-4 — Products (set when user accepts upsells)
      advancedProtection: false,
      teleVet: false,
      insurance: false
    }
  };

  var stored = sessionStorage.getItem('safetyScore');
  if (stored) {
    try {
      var parsed = JSON.parse(stored);
      // Merge stored values with defaults to ensure new keys exist
      if (parsed.products) {
        var merged = Object.assign({}, defaults.products, parsed.products);
        parsed.products = merged;
      }
      return parsed;
    } catch (e) { /* corrupted — return defaults */ }
  }

  return defaults;
}

function updateScoreState(productKey, value) {
  var state = getScoreState();
  state.products[productKey] = value;
  sessionStorage.setItem('safetyScore', JSON.stringify(state));
}


/* ==========================================================================
   Convenience Accessors
   ========================================================================== */

function getPetName() {
  var petData = getPetData();
  return (petData.name && petData.name !== 'your pet') ? petData.name : null;
}

function getEmail() {
  var petData = getPetData();
  return petData.email || null;
}


/* ==========================================================================
   Registration Flow Metadata
   ========================================================================== */

function initRegistrationFlow(source) {
  var existing = sessionStorage.getItem('registrationFlow');
  if (existing) return;

  sessionStorage.setItem('registrationFlow', JSON.stringify({
    source: source || 'support-pets',
    startedAt: new Date().toISOString()
  }));
}


/* ==========================================================================
   Card Observation (Stagger Animation)
   ========================================================================== */

function observeCards(selector) {
  var cards = document.querySelectorAll(selector);
  if (!cards.length) return;

  if (!('IntersectionObserver' in window)) {
    cards.forEach(function(card) { card.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(function(card) { observer.observe(card); });
}


/* ==========================================================================
   Page Personalization
   ========================================================================== */

function personalizePage() {
  var petData = getPetData();

  document.querySelectorAll('.pet-name').forEach(function(el) {
    el.textContent = petData.name;
  });

  document.querySelectorAll('.pet-name-lower').forEach(function(el) {
    el.textContent = petData.name;
  });

  document.querySelectorAll('[data-pet-name]').forEach(function(el) {
    var fallback = el.getAttribute('data-pet-name-fallback') || 'your pet';
    el.textContent = (petData.name && petData.name !== 'your pet') ? petData.name : fallback;
  });
}


/* ==========================================================================
   Page Initialization
   ========================================================================== */

function initPage() {
  personalizePage();
}


/* ==========================================================================
   Confetti Launcher
   ========================================================================== */

function launchConfetti() {
  var colors = ['#D74242', '#3995C6', '#297A6D', '#d49d35', '#2e8a7b', '#D19D61'];
  var shapes = ['circle', 'square'];
  var container = document.body;

  for (var i = 0; i < 60; i++) {
    var el = document.createElement('div');
    el.classList.add('confetti-piece');
    var size = Math.random() * 8 + 6;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '2px';
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
    el.style.animationDelay = (Math.random() * 0.8) + 's';
    container.appendChild(el);
    el.addEventListener('animationend', function () { this.remove(); });
  }
}


/* ==========================================================================
   Countdown Timer
   ========================================================================== */

function initCountdown(displayId, seconds) {
  var stored = sessionStorage.getItem('countdownEnd');
  var endTime;

  if (stored) {
    endTime = parseInt(stored, 10);
  } else {
    endTime = Date.now() + (seconds * 1000);
    sessionStorage.setItem('countdownEnd', endTime.toString());
  }

  var display = document.getElementById(displayId);
  if (!display) return;

  function tick() {
    var remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    var mins = Math.floor(remaining / 60);
    var secs = remaining % 60;
    display.textContent = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

    if (remaining > 0) {
      setTimeout(tick, 1000);
    }
  }

  tick();
}


/* ==========================================================================
   Sticky CTA — Keyboard Awareness (Mobile)
   ==========================================================================
   On iOS / Android, the virtual keyboard covers position:fixed elements
   at the bottom. We use the visualViewport API to detect when the keyboard
   is open and reposition the sticky bar above it.
   ========================================================================== */

function initStickyKeyboardFix() {
  var stickyBar = document.querySelector('.sticky-cta-bar');
  if (!stickyBar || !window.visualViewport) return;

  // Track the initial full viewport height (before any keyboard)
  var fullHeight = window.innerHeight;

  function adjustForKeyboard() {
    var currentHeight = window.visualViewport.height;
    var keyboardOffset = Math.round(fullHeight - currentHeight);

    if (keyboardOffset > 150) {
      // Keyboard is open — move sticky bar above it
      stickyBar.style.bottom = keyboardOffset + 'px';
      stickyBar.style.paddingBottom = '12px';
    } else {
      // Keyboard is closed — restore defaults
      stickyBar.style.bottom = '';
      stickyBar.style.paddingBottom = '';
    }
  }

  window.visualViewport.addEventListener('resize', adjustForKeyboard);
}


/* ==========================================================================
   Auto-init on DOMContentLoaded
   ========================================================================== */

function onReady() {
  initPage();
  initStickyKeyboardFix();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}
