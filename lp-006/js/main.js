// ========== COUNTDOWN TIMER ==========
(function () {
    const STORAGE_KEY = 'geniuspet_timer_start';
    const DURATION = 24 * 60 * 60 * 1000; // 24 hours

    let start = localStorage.getItem(STORAGE_KEY);
    if (!start) {
        start = Date.now();
        localStorage.setItem(STORAGE_KEY, start);
    } else {
        start = parseInt(start, 10);
    }

    function updateTimer() {
        const elapsed = Date.now() - start;
        let remaining = DURATION - elapsed;
        if (remaining < 0) {
            // Reset timer
            start = Date.now();
            localStorage.setItem(STORAGE_KEY, start);
            remaining = DURATION;
        }

        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
})();

// ========== CAROUSEL ==========
(function () {
    const track = document.querySelector('.carousel-track');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');

    if (!track || !leftArrow || !rightArrow) return;

    const scrollAmount = () => {
        const card = track.querySelector('.carousel-card');
        return card ? card.offsetWidth + 12 : 200;
    };

    leftArrow.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
})();

// ========== FAQ ACCORDION ==========
(function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            faqItems.forEach(other => other.classList.remove('open'));

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
})();
