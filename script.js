class NumberGuessingGame {
  constructor() {
    this.secretNumber = this.generateSecretNumber();
    this.score = 20;
    this.highScore = 0;
  }

  generateSecretNumber() {
    return Math.trunc(Math.random() * 20) + 1;
  }

  showMessage(message) {
    document.querySelector('.message').textContent = message;
  }

  showScore() {
    document.querySelector('.score').textContent = this.score;
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      document.querySelector('.highscore').textContent = this.highScore;
    }
  }

  handleCorrectGuess() {
    this.showMessage('You Rock 🤘🏾');
    document.querySelector('.number').textContent = this.secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    this.updateHighScore();
  }

  handleIncorrectGuess(guess) {
    this.showMessage(guess > this.secretNumber ? 'Too High' : 'Too Low');
    this.score--;

    if (this.score > 0) {
      this.showScore();
    } else {
      this.showScore(0);
      this.showMessage('You Lost');
    }
  }

  checkGuess() {
    const guess = Number(document.querySelector('.guess').value);

    if (!guess) {
      this.showMessage('No Number! ❌');
    } else if (guess === this.secretNumber) {
      this.handleCorrectGuess();
    } else {
      this.handleIncorrectGuess(guess);
    }
  }

  resetGame() {
    this.score = 20;
    this.secretNumber = this.generateSecretNumber();
    this.showScore();
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';

    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
  }

  init() {
    document
      .querySelector('.check')
      .addEventListener('click', this.checkGuess.bind(this));
    document
      .querySelector('.again')
      .addEventListener('click', this.resetGame.bind(this));
  }
}

const game = new NumberGuessingGame();
game.init();
