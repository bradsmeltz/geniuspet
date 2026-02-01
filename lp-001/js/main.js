// Quiz State
const quizState = {
    currentScreen: 'welcome',
    answers: {},
    score: 0
};

// Screen flow
const screenOrder = ['welcome', 'q1', 'q2', 'q3', 'q4', 'q5', 'loading', 'results'];

// Start the quiz
function startQuiz() {
    showScreen('q1');
}

// Show a specific screen
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.quiz-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the target screen
    const targetScreen = document.getElementById('screen-' + screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        quizState.currentScreen = screenId;

        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Handle option selection
function selectOption(questionNum, value) {
    // Store the answer
    quizState.answers['q' + questionNum] = value;

    // Add selected state to clicked option
    const currentScreen = document.getElementById('screen-q' + questionNum);
    const options = currentScreen.querySelectorAll('.option-card');
    options.forEach(opt => opt.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // Move to next screen after a short delay
    setTimeout(() => {
        if (questionNum < 5) {
            showScreen('q' + (questionNum + 1));
        } else {
            // Last question - show loading screen
            showScreen('loading');
            runLoadingAnimation();
        }
    }, 300);
}

// Run the loading animation
function runLoadingAnimation() {
    const checkItems = ['check-1', 'check-2', 'check-3', 'check-4'];
    const scoreCircle = document.getElementById('score-circle');
    const scoreValue = document.getElementById('score-value');

    let currentCheck = 0;
    let currentScore = 0;
    const targetScore = calculateScore();

    // Animate the score circle
    const circumference = 2 * Math.PI * 45;
    scoreCircle.style.strokeDasharray = circumference;
    scoreCircle.style.strokeDashoffset = circumference;

    // Animate score value
    const scoreInterval = setInterval(() => {
        if (currentScore < targetScore) {
            currentScore++;
            scoreValue.textContent = currentScore + '%';

            // Update circle
            const offset = circumference - (currentScore / 100) * circumference;
            scoreCircle.style.strokeDashoffset = offset;
        } else {
            clearInterval(scoreInterval);
        }
    }, 30);

    // Animate checklist items
    const checkInterval = setInterval(() => {
        if (currentCheck < checkItems.length) {
            const checkItem = document.getElementById(checkItems[currentCheck]);
            const icon = checkItem.querySelector('.check-icon');
            icon.textContent = '✓';
            icon.classList.remove('pending');
            icon.classList.add('complete');
            currentCheck++;
        } else {
            clearInterval(checkInterval);

            // Show results after all checks complete
            setTimeout(() => {
                prepareResults();
                showScreen('results');
            }, 500);
        }
    }, 800);
}

// Calculate the safety score based on answers
function calculateScore() {
    let score = 100;
    const answers = quizState.answers;

    // Deduct points based on answers
    // Q2: Identification
    if (answers.q2 === 'none') score -= 30;
    else if (answers.q2 === 'microchip') score -= 20;
    else if (answers.q2 === 'engraved') score -= 15;
    else if (answers.q2 === 'both') score -= 10;

    // Q3: Medical conditions
    if (answers.q3 === 'multiple') score -= 20;
    else if (answers.q3 === 'few') score -= 10;
    else if (answers.q3 === 'unsure') score -= 15;

    // Q4: Fear factor (doesn't reduce score, but personalizes)

    // Q5: Interest level (doesn't reduce score)

    // Ensure minimum score
    quizState.score = Math.max(score, 25);
    return quizState.score;
}

// Prepare the results screen
function prepareResults() {
    const finalScore = document.getElementById('final-score');
    const riskLevel = document.getElementById('risk-level');
    const gapsList = document.getElementById('gaps-list');

    finalScore.textContent = quizState.score;

    // Set risk level
    if (quizState.score >= 80) {
        riskLevel.textContent = 'Low Risk';
        riskLevel.className = 'results-risk low';
    } else if (quizState.score >= 60) {
        riskLevel.textContent = 'Moderate Risk';
        riskLevel.className = 'results-risk moderate';
    } else {
        riskLevel.textContent = 'High Risk';
        riskLevel.className = 'results-risk high';
    }

    // Build gaps list based on answers
    const gaps = [];
    const answers = quizState.answers;

    if (answers.q2 === 'microchip' || answers.q2 === 'none') {
        gaps.push('No instant contact method for finders');
    }
    if (answers.q2 !== 'both') {
        gaps.push('Relies on scanner-dependent technology');
    }
    if (answers.q3 === 'multiple' || answers.q3 === 'few' || answers.q3 === 'unsure') {
        gaps.push('Medical info not accessible in emergencies');
    }
    if (answers.q4 === 'contact') {
        gaps.push('Contact information may be outdated or inaccessible');
    }
    if (answers.q4 === 'shelter') {
        gaps.push('No way to alert owner before shelter intake');
    }

    // Default gaps if none detected
    if (gaps.length === 0) {
        gaps.push('Could benefit from instant smartphone scanning');
        gaps.push('No real-time location sharing capability');
    }

    // Update gaps list
    gapsList.innerHTML = gaps.map(gap => '<li>' + gap + '</li>').join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    showScreen('welcome');
});
