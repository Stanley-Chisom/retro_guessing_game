let highScore = 0;
let updatedScore = 0;

function generateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function showMessage(message) {
  document.querySelector('.message').textContent = message;
}

function showScore(score) {
  document.querySelector('.score').textContent = score;
}

function updateHighScore(score, highScore) {
  const updatedHighScore = Math.max(score, highScore);
  document.querySelector('.highscore').textContent = updatedHighScore;
  return updatedHighScore;
}

function handleCorrectGuess(secretNumber, score, highScore) {
  showMessage('You Rock 🤘🏾');
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';

  // Compare the current score with the high score and update the highScore variable
  if (score > highScore) {
    highScore = score;
  }

  // Update the high score on the UI
  updateHighScore(score, highScore);

  return highScore;
}

function handleIncorrectGuess(secretNumber, guess, score) {
  showMessage(guess > secretNumber ? 'Too High' : 'Too Low');
  score--;

  if (score > 0) {
    showScore(score);
  } else {
    showScore(0);
    showMessage('You Lost');
  }

  return score;
}

function checkGuess(secretNumber, score, highScore) {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    showMessage('No Number! ❌');
  } else if (guess === secretNumber) {
    updatedScore = handleCorrectGuess(secretNumber, score, highScore);
  } else {
    updatedScore = handleIncorrectGuess(secretNumber, guess, score);
  }

  return updatedScore;
}

function resetGame() {
  const initialScore = 20;
  const secretNumber = generateSecretNumber();

  showScore(initialScore);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  return { secretNumber, score: initialScore };
}

function init() {
  let { secretNumber, score } = resetGame(); // Removed highScore from here

  document.querySelector('.check').addEventListener('click', () => {
    score = checkGuess(secretNumber, score, highScore); // Pass highScore as an argument
  });

  document.querySelector('.again').addEventListener('click', () => {
    ({ secretNumber, score } = resetGame()); // Removed highScore from here
  });
}

init();
