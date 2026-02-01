/**
 * GeniusPet Landing Page - Pet Safety Score Results
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyBar();
    initScrollAnimations();
    initCTAButtons();
    animateScoreCircle();
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

    // Set initial state
    stickyBar.style.transform = 'translateY(100%)';
    stickyBar.style.opacity = '0';
    stickyBar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

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

            // Scroll to product section or handle checkout
            const productSection = document.querySelector('.product-section');
            if (productSection) {
                productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Animate the score circle on page load
 */
function animateScoreCircle() {
    const scoreNumber = document.querySelector('.score-number');
    if (!scoreNumber) return;

    const targetScore = 42;
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
 * Add CSS for ripple effect
 */
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

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
