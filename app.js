// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for a guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  console.log(guess)
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  // Check if won
  // Game over won
  if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!!!`)
  } else {
    // Wrong Number
    guessesLeft -= 1;
    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
     
    } else {
      // Game continues, answer is wrong
      // Change border color
      guessInput.style.borderColor = 'red';
      // Tell user it's wrong number
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red')
      // Clear input
      guessInput.value = '';
    }
  }
})

// Game Over function
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Message
  setMessage(msg, color);
  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// setMessage function
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}