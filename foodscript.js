let score = 0;
let totalQuestions = 3;
let answeredCount = 0;
// const scoreDisplay = document.getElementById('scoreDisplay');
const completionMessage = document.getElementById('completionMessage');
const imperfectMessage = document.getElementById('imperfectMessage');
const victorySound = document.getElementById('victorySound');

// scoreDisplay.textContent = `Score: 0/${totalQuestions}`;

function handleAnswer(selectedOption, answerType) {
    const response = selectedOption.textContent;

    fetch("https://script.google.com/macros/s/AKfycbyj_aN_w5dhI7G33IsPW0QNfvWwpzuvU1UPuczGiF5J3ipT9-fJyiqw0wJ-wMJUnuyhew/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: "text" })  // Send the response value
    })
    .then(res => res.text())
    .then(data => {
        console.log("Response from server:", data);  // Log the response from the server
        alert("Response saved: " + data);
    })
    .catch(err => {
        console.error("Error:", err); // Catch any errors and log them
    });

    const questionBox = selectedOption.parentElement;
    if (questionBox.classList.contains('answered')) return;
    
    // questionBox.classList.add('answered');
    answeredCount++;
    
    // const options = questionBox.querySelectorAll('.option');
    // options.forEach(option => {
    //     option.classList.add('disabled');
    //     option.style.pointerEvents = 'none'; // Prevent further clicks
    // });

    if (answerType === 'correct') {
        score++;
        // scoreDisplay.textContent = `Score: ${score}/${totalQuestions}`;
    }

    selectedOption.classList.add(answerType);

    // Show correct answer if wrong was selected
    if (answerType === 'incorrect') {
        const correctOption = questionBox.querySelector('[data-correct="true"]');
        setTimeout(() => {
            correctOption.classList.add('correct');
            correctOption.style.animation = 'pulse 0.5s ease'; // Add visual feedback
        }, 500);
    }

    // Celebration check and scroll to top
    if (answeredCount === totalQuestions) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        if(score === totalQuestions) {
            showCelebration();
        } else {
            showImperfectScoreMessage();
        }
    }
}

function showCelebration() {
    // completionMessage.style.display = 'block';
    // imperfectMessage.style.display = 'none';
    victorySound.play();
    
    // Confetti animation
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff6699', '#ff3366']
        });
        
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff6699', '#ff3366']
        });

        if (Date.now() < end) requestAnimationFrame(frame);
    }());

    // Continuous confetti
    confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        decay: 0.9
    });
}