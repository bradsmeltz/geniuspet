/**
 * GeniusPet Landing Page - Pet Safety Score Results (Tailwind CSS Version)
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Store safety score for downstream upsell pages
    sessionStorage.setItem('safetyScore', JSON.stringify({
        products: { geniusTag: false, advancedProtection: false, teleVet: false, insurance: false }
    }));

    // Initialize all components
    initPersonalization();
    initStickyBar();
    initScrollAnimations();
    initCTAButtons();
    animateScoreCircle();
    initScoreTransformationAnimation();
    initSubScoreAnimations();
});

/**
 * Sticky bottom bar functionality
 */
function initStickyBar() {
    const stickyBar = document.querySelector('.sticky-bottom');
    const heroSection = document.querySelector('.hero-section');

    if (!stickyBar || !heroSection) return;

    function toggleStickyBar() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if (heroBottom < 0) {
            stickyBar.style.transform = 'translateY(0)';
            stickyBar.style.opacity = '1';
        } else {
            stickyBar.style.transform = 'translateY(100%)';
            stickyBar.style.opacity = '0';
        }
    }

    window.addEventListener('scroll', toggleStickyBar);
    toggleStickyBar();
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.risk-card, .solution-item, .included-item, .testimonial-card, .guarantee-card'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

/**
 * CTA button click handlers
 */
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => ripple.remove(), 600);

            // Track CTA click (placeholder for analytics)
            trackCTAClick(this.textContent.trim());

            // Navigate to checkout page
            window.location.href = 'checkout.html';
        });
    });
}

/**
 * Animate the score circle on page load
 */
function animateScoreCircle() {
    const scoreNumber = document.querySelector('.score-number');
    if (!scoreNumber) return;

    const targetScore = 27;
    let currentScore = 0;
    const duration = 1500;
    const startTime = performance.now();

    function updateScore(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        currentScore = Math.round(targetScore * easeOutCubic);

        scoreNumber.textContent = currentScore;

        if (progress < 1) {
            requestAnimationFrame(updateScore);
        }
    }

    requestAnimationFrame(updateScore);
}

/**
 * Track CTA button clicks (placeholder for analytics integration)
 */
function trackCTAClick(buttonText) {
    // Google Analytics 4 event (if available)
    if (typeof gtag === 'function') {
        gtag('event', 'cta_click', {
            'button_text': buttonText,
            'page_location': window.location.href
        });
    }

    // Facebook Pixel (if available)
    if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout');
    }

    console.log('CTA clicked:', buttonText);
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/**
 * Score Transformation Animation - Triggered on scroll
 */
function initScoreTransformationAnimation() {
    const scoreImprovement = document.querySelector('.score-improvement');
    if (!scoreImprovement) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class to trigger all CSS animations
                entry.target.classList.add('animate');

                // Animate the "after" score number counting up
                const afterScore = entry.target.querySelector('.score-after-num');
                if (afterScore) {
                    animateNumber(afterScore, 0, 58, 1500, 1200);
                }

                // Animate the "before" score number
                const beforeScore = entry.target.querySelector('.score-before-num');
                if (beforeScore) {
                    animateNumber(beforeScore, 0, 27, 800, 0);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(scoreImprovement);
}

/**
 * Animate a number from start to end
 */
function animateNumber(element, start, end, duration, delay) {
    setTimeout(() => {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(start + (end - start) * easeOutCubic);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }, delay);
}

/**
 * Sub-score breakdown animation - Triggered on scroll
 */
function initSubScoreAnimations() {
    const subScoreCards = document.querySelectorAll('.sub-score-card');
    if (!subScoreCards.length) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -30px 0px'
    };

    let cardIndex = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = cardIndex * 200;
                cardIndex++;

                setTimeout(() => {
                    entry.target.classList.add('visible');

                    // Animate the progress bar fill
                    const bar = entry.target.querySelector('.sub-score-bar');
                    if (bar) {
                        const targetWidth = bar.getAttribute('data-target');
                        setTimeout(() => {
                            bar.style.width = targetWidth + '%';
                        }, 200);
                    }

                    // Animate the sub-score number
                    const scoreNum = entry.target.querySelector('.sub-score-num');
                    if (scoreNum) {
                        const target = parseInt(scoreNum.textContent);
                        animateNumber(scoreNum, 0, target, 1000, 300);
                    }
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    subScoreCards.forEach(card => observer.observe(card));
}

/**
 * Personalization — reads quiz answers from sessionStorage
 * and updates the results page with personalized content
 */
function initPersonalization() {
    var raw = sessionStorage.getItem('quizAnswers');
    if (!raw) return;

    var answers;
    try { answers = JSON.parse(raw); } catch (e) { return; }

    // --- Personalized summary line ---
    var summaryEl = document.getElementById('personalized-summary');
    var detailsEl = document.getElementById('summary-details');
    if (summaryEl && detailsEl) {
        var parts = [];

        var petTypeMap = { 'dog': 'Dog', 'cat': 'Cat', 'both': 'Dog & Cat', 'other': 'Other pet' };
        if (answers.petType) parts.push(petTypeMap[answers.petType] || answers.petType);

        var idMap = { 'microchip-only': 'Microchip only', 'engraved-tag': 'Engraved tag', 'microchip-plus-tag': 'Microchip + tag', 'no-id': 'No ID' };
        if (answers.identification) parts.push(idMap[answers.identification] || answers.identification);

        var medMap = { 'multiple': 'Multiple conditions', 'one-or-two': '1-2 conditions', 'not-sure': 'Unsure about conditions', 'none': 'No conditions' };
        if (answers.medicalConditions) parts.push(medMap[answers.medicalConditions] || answers.medicalConditions);

        if (parts.length > 0) {
            detailsEl.textContent = parts.join(' · ');
            summaryEl.style.display = 'block';
        }
    }

    // --- Fear-based micro-time anchor ---
    var fearAnchor = document.getElementById('fear-anchor');
    if (fearAnchor && answers.biggestFear) {
        var fearMap = {
            'medication': 'A stranger with your pet won\'t know about medications, allergies, or conditions. The first few minutes matter most.',
            'nobody-can-reach-me': 'A stranger who finds your pet has no way to reach you. The first few minutes matter most.',
            'shelter': 'Without direct contact, your pet enters the shelter system — alone. The first few minutes matter most.',
            'never-see-again': '1 in 3 pets go missing in their lifetime. Without instant contact, many are never found.'
        };
        if (fearMap[answers.biggestFear]) {
            fearAnchor.textContent = fearMap[answers.biggestFear];
        }
    }

    // --- Personalize "vs alternatives" section by ID type ---
    var altSection = document.getElementById('vs-alternatives');
    var altContent = document.getElementById('alt-content');
    if (altSection && altContent && answers.identification) {
        if (answers.identification === 'no-id') {
            // Skip entirely — they don't need convincing their current setup is lacking
            altSection.style.display = 'none';
        } else if (answers.identification === 'microchip-only') {
            altContent.innerHTML =
                '<p class="m-0">Microchips are a great first step — but they only work at a vet or shelter with a special scanner. If a neighbor, jogger, or delivery driver finds your pet, that chip is invisible to them.</p>' +
                '<p class="m-0">On a Saturday night, no vet is open. No shelter has a scanner available. Your pet is stuck with a stranger who has no way to help.</p>' +
                '<p class="m-0"><strong class="text-gray-900">GeniusTag works with any phone, anywhere, instantly</strong> — no scanner, no app, no waiting.</p>';
        } else if (answers.identification === 'engraved-tag') {
            altContent.innerHTML =
                '<p class="m-0">Engraved tags are visible — that\'s good. But they only show a name and phone number. No medical info, no backup contact, no GPS alert when the QR code is scanned.</p>' +
                '<p class="m-0">If the engraving wears down, the tag falls off, or the finder can\'t read it — there\'s no backup plan.</p>' +
                '<p class="m-0"><strong class="text-gray-900">GeniusTag shares your full profile instantly</strong> — medical needs, emergency contacts, and a GPS ping the moment the QR code on the back is scanned.</p>';
        } else if (answers.identification === 'microchip-plus-tag') {
            altContent.innerHTML =
                '<p class="m-0">Having both a microchip and tag is smart — you\'re ahead of most pet parents. But there are still gaps a finder can\'t solve with what you have.</p>' +
                '<p class="m-0">The chip needs a scanner. The tag shows limited info. Neither sends you an alert or shares medical needs with the person holding your pet right now.</p>' +
                '<p class="m-0"><strong class="text-gray-900">GeniusTag fills every gap</strong> — instant alerts, full medical profile, GPS location, and no special equipment needed.</p>';
        }
    }
}
