/**
 * GeniusPet Registration Flow — Scoring Functions
 *
 * Uses the same Safety Net scoring system as the GeniusPet dashboard.
 * Total: 100 points across 5 tiers:
 *
 *   GeniusTag (base):     65 pts  (every registered user)
 *   Care Profile:          5 pts  (hasPhoto 1, basicComplete 1, emergencyContacts 1,
 *                                   phoneVerified 1, healthInfoComplete 1*)
 *   Advanced Protection:  12 pts  (smsAlerts 4, lostPetNetwork 5, gps 3)
 *   TeleVet:               9 pts  (enrollment)
 *   Pet Insurance:         9 pts  (enrollment)
 *
 *   * healthInfoComplete requires Advanced Protection plan
 *
 * Registration flow progression (with basicComplete = true):
 *   score-reveal:  66  |  +AP: 78  |  +TeleVet: 87  |  +Insurance: 96
 *
 * Remaining 4 pts earned in dashboard (photo, emergency contacts,
 * phone verification, health info).
 *
 * Status labels:
 *   <50  High Risk  |  50-64  At Risk  |  65-77  Improving
 *   78-87  Good     |  88+  Fully Protected
 */


/* ==========================================================================
   Core Scoring (matches dashboard/js/state.js → calculateSafetyScore)
   ========================================================================== */

/**
 * Compute the Safety Net score from product + profile state.
 * Uses identical weights to the dashboard (data.js → scoreWeights).
 *
 * @param {Object} state - Product & profile flags
 *   @param {boolean} state.geniusTag          - GeniusTag registered (always true in reg flow)
 *   @param {boolean} state.basicComplete       - Name, breed, age filled
 *   @param {boolean} [state.hasPhoto]          - Pet photo uploaded
 *   @param {boolean} [state.emergencyContacts] - Emergency contact added
 *   @param {boolean} [state.phoneVerified]     - Phone number verified
 *   @param {boolean} [state.healthInfoComplete]- Health info filled (requires AP)
 *   @param {boolean} state.advancedProtection  - Advanced Protection purchased
 *   @param {boolean} state.teleVet             - TeleVet enrolled
 *   @param {boolean} state.insurance           - Pet Insurance enrolled
 * @returns {number} - Total safety score (0-100)
 */
function computeScore(state) {
  var score = 0;

  // BASE — GeniusTag (65 pts)
  if (state.geniusTag) score += 65;

  // TIER 1 — Care Profile (max 5 pts, free)
  if (state.hasPhoto) score += 1;
  if (state.basicComplete) score += 1;
  if (state.emergencyContacts) score += 1;
  if (state.phoneVerified) score += 1;
  // healthInfoComplete (1 pt) — requires Advanced Protection plan
  if (state.advancedProtection && state.healthInfoComplete) score += 1;

  // TIER 2 — Advanced Protection features (max 12 pts)
  // During registration, purchasing AP activates all features automatically.
  // In the dashboard, these are toggled individually (smsAlerts 4 + lostPetNetwork 5 + gps 3).
  if (state.advancedProtection) score += 12;

  // TIER 3 — TeleVet (9 pts)
  if (state.teleVet) score += 9;

  // TIER 4 — Pet Insurance (9 pts)
  if (state.insurance) score += 9;

  return Math.min(score, 100);
}


/**
 * Get the status label and Tailwind classes for a given total score.
 * @param {number} score - Total safety score (0-100)
 * @returns {Object} - { label, cls }
 */
function getStatusLabel(score) {
  if (score >= 88) return { label: 'Fully Protected', cls: 'bg-green-100 text-green-700' };
  if (score >= 78) return { label: 'Good',            cls: 'bg-blue-100 text-blue-700'   };
  if (score >= 65) return { label: 'Improving',       cls: 'bg-amber-100 text-amber-700' };
  if (score >= 50) return { label: 'At Risk',         cls: 'bg-gold-tint text-gold-dark' };
  return { label: 'High Risk', cls: 'bg-red-100 text-red-700' };
}


/**
 * Get the CSS class suffix for the score ring color.
 * @param {number} score - Total safety score (0-100)
 * @returns {string} - CSS class name for .score-ring variant
 */
function getScoreRingClass(score) {
  if (score >= 88) return 'protected';
  if (score >= 78) return 'good';
  if (score >= 65) return 'improving';
  if (score >= 50) return 'at-risk';
  return 'high-risk';
}


/**
 * Get insurance quote prices adjusted for breed/age risk.
 * @param {string} breed - Pet breed (reserved for future risk tiers)
 * @param {number} age - Pet age in years
 * @returns {Object} - { essential, complete } formatted as price strings
 */
function getQuotePrices(breed, age) {
  var baseEssential = 24.99, baseComplete = 39.99;

  if (age >= 8) {
    baseEssential += 10;
    baseComplete += 15;
  } else if (age >= 5) {
    baseEssential += 5;
    baseComplete += 8;
  }

  return {
    essential: baseEssential.toFixed(2),
    complete: baseComplete.toFixed(2)
  };
}


/* ==========================================================================
   Score Ring Animation
   ========================================================================== */

/**
 * Animate an SVG score ring from 0 to targetScore.
 * Expects an SVG circle with class .ring-progress inside the target element,
 * using stroke-dasharray of 339.292 (circumference of r=54 circle).
 *
 * @param {string} elementId - ID of the .score-ring container
 * @param {number} targetScore - Score value 0-100
 */
function animateScoreRing(elementId, targetScore) {
  var container = document.getElementById(elementId);
  if (!container) return;

  var circle = container.querySelector('.ring-progress');
  if (!circle) return;

  var circumference = 339.292; // 2 * PI * 54
  var targetOffset = circumference * (1 - targetScore / 100);

  // Update the ring color class to match the score status
  container.className = container.className.replace(
    /\b(high-risk|at-risk|improving|good|protected)\b/g, ''
  ).trim();
  container.classList.add(getScoreRingClass(targetScore));

  // Trigger the CSS transition on next frame
  requestAnimationFrame(function() {
    circle.style.strokeDashoffset = targetOffset;
  });
}


/* ==========================================================================
   Score Number Animation
   ========================================================================== */

/**
 * Animate a number element counting up from 0 to targetScore.
 * Uses requestAnimationFrame with ease-out cubic easing.
 *
 * @param {string} elementId - ID of the element to update textContent
 * @param {number} targetScore - Number to count up to
 * @param {number} [duration=1500] - Animation duration in milliseconds
 */
function animateScoreNumber(elementId, targetScore, duration, startFrom) {
  var el = document.getElementById(elementId);
  if (!el) return;

  duration = duration || 1500;
  startFrom = startFrom || 0;
  var range = targetScore - startFrom;
  var startTime = performance.now();

  function update(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic for smooth deceleration
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(startFrom + range * eased);

    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


/* ==========================================================================
   Score Bar Animation
   ========================================================================== */

/**
 * Animate the width of a progress bar fill element.
 *
 * @param {string} elementId - ID of the .score-preview-fill element
 * @param {number} targetPercent - Target width as a percentage (0-100)
 */
function animateScoreBar(elementId, targetPercent) {
  var el = document.getElementById(elementId);
  if (!el) return;

  // Ensure the transition is set up, then trigger the width change
  requestAnimationFrame(function() {
    el.style.width = targetPercent + '%';
  });
}


/* ==========================================================================
   Score Breakdown (matches dashboard/js/state.js → getScoreBreakdown)
   ========================================================================== */

/**
 * Render the Safety Net score breakdown into a container.
 * Shows 5 tiers with earned/max points, matching the dashboard modal.
 *
 * @param {string} containerId - ID of the container div
 * @param {Object} products - Product/profile state from getScoreState().products
 */
function renderScoreBreakdown(containerId, products) {
  var container = document.getElementById(containerId);
  if (!container) return;

  // Calculate earned points per tier
  var geniusTagEarned = products.geniusTag ? 65 : 0;

  var profileEarned = 0;
  if (products.hasPhoto) profileEarned += 1;
  if (products.basicComplete) profileEarned += 1;
  if (products.emergencyContacts) profileEarned += 1;
  if (products.phoneVerified) profileEarned += 1;
  if (products.advancedProtection && products.healthInfoComplete) profileEarned += 1;

  var advancedEarned = products.advancedProtection ? 12 : 0;
  var televetEarned = products.teleVet ? 9 : 0;
  var insuranceEarned = products.insurance ? 9 : 0;

  var rows = [
    { label: 'ESA Care ID',          desc: 'Digital tag registered & active',           earned: geniusTagEarned, max: 65, done: geniusTagEarned >= 65, locked: false, color: '#307DA6', bg: '#EFF6FA' },
    { label: 'Profile Basics',       desc: 'Photo, contacts & phone verification',      earned: profileEarned,   max: 5,  done: profileEarned >= 5,    locked: false, color: '#307DA6', bg: '#EFF6FA' },
    { label: 'Find My Pet',          desc: 'SMS alerts, GPS & community search',        earned: advancedEarned,  max: 12, done: advancedEarned >= 12,  locked: !products.advancedProtection, color: '#3995C6', bg: '#EFF6FA' },
    { label: '24/7 Vet Access',      desc: 'Video calls with licensed vets anytime',    earned: televetEarned,   max: 9,  done: televetEarned >= 9,    locked: !products.teleVet, color: '#2e8a7b', bg: '#eaf3f2' },
    { label: 'Emergency Coverage',   desc: 'Pet insurance for accidents & illness',     earned: insuranceEarned, max: 9,  done: insuranceEarned >= 9,  locked: !products.insurance, color: '#C08A3E', bg: '#f9f4ed' }
  ];

  var html = '<div class="bg-white rounded-xl border border-beige-medium overflow-hidden">';

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var isLast = i === rows.length - 1;
    var opacity = row.locked ? 'opacity-60' : '';
    var borderClass = isLast ? '' : ' border-b border-beige-medium/50';

    html += '<div class="breakdown-row flex items-center gap-3 px-4 py-3' + borderClass + ' ' + opacity + '">';

    // Icon circle
    if (row.done) {
      html += '<div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: ' + row.bg + ';">';
      html += '  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="' + row.color + '" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
      html += '</div>';
    } else if (row.locked) {
      html += '<div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #f3f3f3;">';
      html += '  <svg class="w-3.5 h-3.5 text-neutral-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>';
      html += '</div>';
    } else {
      html += '<div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: ' + row.bg + ';">';
      html += '  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="' + row.color + '" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>';
      html += '</div>';
    }

    // Label + description + points
    html += '<div class="flex-1 min-w-0">';
    html += '  <div class="flex items-center justify-between">';
    html += '    <span class="text-base font-medium text-neutral-black">' + row.label + '</span>';

    if (row.done) {
      html += '    <span class="text-base font-semibold" style="color: ' + row.color + ';">';
      html += '      <span class="flex items-center gap-1">';
      html += '        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
      html += '        ' + row.earned + ' pts';
      html += '      </span>';
      html += '    </span>';
    } else {
      html += '    <span class="text-base font-semibold text-neutral-light">' + row.earned + '/' + row.max + ' pts</span>';
    }

    html += '  </div>';
    html += '  <p class="text-base text-neutral-medium mt-0.5">' + row.desc + '</p>';
    html += '</div>';

    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
}


/* ==========================================================================
   Unified Score Tracker
   ========================================================================== */

/**
 * Get the bar color hex for a given score.
 * @param {number} score - Total safety score (0-100)
 * @returns {string} - Hex color
 */
function getScoreBarColor(score) {
  if (score >= 88) return '#297A6D'; // green
  if (score >= 78) return '#3995C6'; // blue
  if (score >= 65) return '#2e8a7b'; // teal
  if (score >= 50) return '#d49d35'; // gold
  return '#D74242';                  // red
}


/**
 * Render the unified score tracker into a container element.
 * Matches dashboard hero card layout: avatar + name + score + progress bar
 * on a dark blue card.
 *
 * @param {string} containerId - ID of the container div to render into
 * @param {Object} options
 *   @param {number} options.currentScore - Current total score
 *   @param {number} [options.projectedScore] - Projected score if user accepts (omit for no ghost bar)
 *   @param {Object} [options.petData] - Pet data from getPetData()
 *   @param {number} [options.animateDelay] - Delay before bar animation starts (ms), default 300
 */
function renderScoreTracker(containerId, options) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var current = options.currentScore || 0;
  var projected = options.projectedScore || null;
  var previousScore = options.previousScore || null;
  var petData = options.petData || getPetData();
  var animateDelay = options.animateDelay !== undefined ? options.animateDelay : 300;
  var layerInfo = options.layerInfo || null; // { number, total, name }
  var petName = (petData.name && petData.name !== 'your pet') ? petData.name : 'Your pet';

  // If previousScore provided and valid, we'll animate from previous → current
  var hasScoreTransition = previousScore !== null && previousScore < current;
  var displayScore = hasScoreTransition ? previousScore : current;

  // Build HTML — dashboard-style dark blue card
  var html = '';
  html += '<div class="score-tracker rounded-2xl overflow-hidden" style="background: linear-gradient(135deg, #3488B4 0%, #286A8D 100%);">';

  // Layer banner (if provided)
  if (layerInfo) {
    html += '<div style="background: rgba(255,255,255,0.1); padding: 10px 16px; display: flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap;">';
    html += '  <svg style="width: 14px; height: 14px; color: rgba(255,255,255,0.8); flex-shrink: 0;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>';
    html += '  <span style="font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.9);">Layer ' + layerInfo.number + ' of ' + layerInfo.total + '</span>';
    html += '  <span style="font-size: 16px; color: rgba(255,255,255,0.4);">&middot;</span>';
    html += '  <span style="font-size: 16px; font-weight: 500; color: rgba(255,255,255,0.7);">' + layerInfo.name + '</span>';
    html += '</div>';
  }

  // Card body
  html += '<div style="padding: 20px;">';

  // Top row: Avatar + Score info
  html += '<div style="display: flex; align-items: center; gap: 16px;">';

  // Avatar circle
  html += '  <div style="width: 68px; height: 68px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.9); overflow: hidden; flex-shrink: 0; background: #f0e8df;">';
  html += '    <img src="images/default-dog.png" alt="" style="width: 100%; height: 100%; object-fit: cover;">';
  html += '  </div>';

  // Name + label + score number
  html += '  <div style="flex: 1; min-width: 0;">';
  html += '    <p style="font-size: 20px; font-weight: 700; color: white; margin: 0; line-height: 1.2;">' + petName + '</p>';
  html += '    <p style="font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; margin: 2px 0 4px;">Safety Net</p>';
  html += '    <p style="margin: 0; line-height: 1;"><span id="tracker-score-num" style="font-size: 32px; font-weight: 800; color: white;">' + displayScore + '</span> <span style="font-size: 16px; font-weight: 500; color: rgba(255,255,255,0.5);">/ 100</span></p>';
  html += '  </div>';

  html += '</div>';

  // Progress bar
  html += '<div style="margin-top: 14px;">';
  html += '  <div class="relative" style="width: 100%; height: 12px; background: rgba(255,255,255,0.15); border-radius: 6px; overflow: hidden;">';

  // Ghost bar (behind, if projected)
  if (projected && projected > current) {
    html += '    <div id="tracker-ghost" class="score-tracker-ghost" style="position: absolute; top: 0; left: 0; height: 100%; border-radius: 6px; background: rgba(212,157,53,0.35);"></div>';
  }

  // Current bar (in front)
  html += '    <div id="tracker-bar" class="score-tracker-bar" style="position: absolute; top: 0; left: 0; height: 100%; border-radius: 6px; background: #d49d35; z-index: 1;"></div>';

  html += '  </div>';

  // Bar labels
  html += '  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 6px;">';
  html += '    <span id="tracker-score-label" style="font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.5);">' + displayScore + '</span>';
  if (projected && projected > current) {
    html += '    <span style="font-size: 16px; font-weight: 700; color: #f0d78c;">→ ' + projected + ' by adding this safety layer</span>';
  } else {
    html += '    <span style="font-size: 16px; color: rgba(255,255,255,0.5);">100</span>';
  }
  html += '  </div>';

  html += '</div>';

  html += '</div>'; // close card body
  html += '</div>'; // close card

  container.innerHTML = html;

  // Animate bars after delay
  setTimeout(function() {
    if (hasScoreTransition) {
      // First render bar at previous score position
      var bar = document.getElementById('tracker-bar');
      if (bar) bar.style.width = previousScore + '%';
      var ghost = document.getElementById('tracker-ghost');
      if (ghost && projected) ghost.style.width = projected + '%';

      // Then animate from previous → current after a brief pause
      setTimeout(function() {
        if (bar) bar.style.width = current + '%';
        animateScoreNumber('tracker-score-num', current, 1200, previousScore);
        // Update the bar label too
        var label = document.getElementById('tracker-score-label');
        if (label) {
          var labelStart = performance.now();
          var labelRange = current - previousScore;
          function updateLabel(now) {
            var progress = Math.min((now - labelStart) / 1200, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            label.textContent = Math.round(previousScore + labelRange * eased);
            if (progress < 1) requestAnimationFrame(updateLabel);
          }
          requestAnimationFrame(updateLabel);
        }
      }, 600);
    } else {
      var bar = document.getElementById('tracker-bar');
      if (bar) bar.style.width = current + '%';

      var ghost = document.getElementById('tracker-ghost');
      if (ghost && projected) ghost.style.width = projected + '%';
    }
  }, animateDelay);
}
