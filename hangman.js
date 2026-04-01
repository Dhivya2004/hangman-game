const words = ['HELLO', 'JAVASCRIPT', 'PROGRAMMING', 'COMPUTER', 'HANGMAN', 'DEVELOPER'];
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let lives = 5; // CHANGED: 5 lives now!
let gameOver = false;

function initGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    lives = 5; // CHANGED: Reset to 5 lives
    gameOver = false;
    document.getElementById('guess-input').value = '';
    updateDisplay();
}

function updateDisplay() {
    const wordDisplay = document.getElementById('word-display');
    let display = '';

    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
            display += word[i] + ' ';
        } else {
            display += '_ ';
        }
    }
    wordDisplay.textContent = display.trim();

    document.getElementById('guessed-letters').textContent =
        `Guessed: ${guessedLetters.length ? guessedLetters.join(' ') : 'None'}`;

    document.getElementById('lives').innerHTML = // CHANGED: Fixed for 5 lives
        '❤️'.repeat(lives) + ' ' + '💀'.repeat(5 - lives) + ` (${lives}/5 lives)`; // CHANGED: /5

    document.getElementById('hangman').textContent = getHangmanEmoji();
}

function getHangmanEmoji() {
    const emojis = ['🏃', '🙇', '😵‍💫', '🙈', '💀']; // CHANGED: Added 2 more stages
    return emojis[5 - lives]; // CHANGED: 5 stages for 5 lives
}

function guessLetter() {
    if (gameOver) return;

    const input = document.getElementById('guess-input');
    const guess = input.value.toUpperCase().trim();

    input.value = '';
    input.focus();

    if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
        showMessage('❌ Enter ONE letter (A-Z)!', 'red');
        return;
    }

    if (guessedLetters.includes(guess)) {
        showMessage('✅ Already guessed!', 'orange');
        return;
    }

    guessedLetters.push(guess);

    if (word.includes(guess)) {
        showMessage('✅ Correct!', 'green');
    } else {
        lives--;
        showMessage('❌ Wrong!', 'red');
    }

    updateDisplay();
    checkGameOver();
}

function checkGameOver() {
    const solved = !document.getElementById('word-display').textContent.includes('_');

    if (lives === 0) { // CHANGED: Now triggers at 0 (after 5 wrongs)
        gameOver = true;
        showMessage(`💀 GAME OVER! Word was: ${word}`, 'red');
        document.querySelector('button').classList.add('lose');
    } else if (solved) {
        gameOver = true;
        showMessage(`🎉 YOU WIN! Word: ${word}`, 'green');
        document.querySelector('button').classList.add('win');
    }
}

function showMessage(text, color) {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.style.color = color;
    setTimeout(() => {
        msg.textContent = '';
    }, 2000);
}

function newGame() {
    initGame();
    document.querySelector('button').classList.remove('win', 'lose');
}

// Enter key support
document.getElementById('guess-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') guessLetter();
});

// Auto-focus input
document.getElementById('guess-input').focus();

// Start game
initGame();