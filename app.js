/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 11,
  max = 19,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.getElementById("guess-input"),
  guessBtn = document.getElementById("guess-btn"),
  message = document.querySelector(".message");

// Assiign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again? Event Listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // validate input
  if (guess < min || guess > max || isNaN(guess)) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if the guess is right
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong guess
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game Over - Lost
      gameOver(
        false,
        `Game Over, YOU LOST! And the correct number is ${winningNum}`
      );
    } else {
      // Game continues = answer wrong

      // Change border color
      guessInput.style.borderColor = "red";

      // Clear input
      guessInput.value = "";

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable the input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Text color
  message.style.color = color;
  // Set Message
  setMessage(msg);

  // Play Again?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get Winning Number
function getWinningNum(minN, maxN) {
  return Math.floor(Math.random() * (maxN - minN + 1) + minN);
}
