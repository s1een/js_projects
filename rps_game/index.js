const aiCards = document.querySelector(".right");
const userCards = document.querySelector(".left");
const resultText = document.querySelector(".result");
const cardValues = ["paper", "rock", "scissors"];
userCards.addEventListener("click", (e) => {
  let userCard = e.target.closest("div").classList[2];
  if (typeof userCard === "undefined") return;
  let userDisplay = e.target.closest("div");
  cardValues.sort(makeRandomArr);
  let aiCard = cardValues[0];
  let aiDisplay = aiCards.querySelector(`.${aiCard}`);
  console.log(`User Card: ${userCard} vs AI Card: ${aiCard}`);
  let result = gameStart(userCard, aiCard);
  makeResult(userDisplay, aiDisplay, result);
});

function makeRandomArr() {
  return Math.random() - 0.5;
}
function makeResult(userDisplay, aiDisplay, result) {
  if (result === "DRAW!") {
    userDisplay.classList.add("loser");
    aiDisplay.classList.add("loser");
  }
  if (result === "User Wins!") {
    userDisplay.classList.add("winner");
    aiDisplay.classList.add("loser");
  }
  if (result === "AI Wins!") {
    userDisplay.classList.add("loser");
    aiDisplay.classList.add("winner");
  }
  resultText.innerHTML = result;
}

function gameStart(user, ai) {
  reset();
  if (user === ai) {
    return "DRAW!";
  }
  if (user === "paper" && ai === "rock") {
    return "User Wins!";
  }
  if (user === "paper" && ai === "scissors") {
    return "AI Wins!";
  }
  if (user === "rock" && ai === "scissors") {
    return "User Wins!";
  }
  if (user === "rock" && ai === "paper") {
    return "AI Wins!";
  }
  if (user === "scissors" && ai === "paper") {
    return "User Wins!";
  }
  if (user === "scissors" && ai === "rock") {
    return "AI Wins!";
  }
}

function reset() {
  let userReset = userCards.querySelectorAll(".card");
  let aiReset = aiCards.querySelectorAll(".card");
  userReset.forEach((e) => {
    e.classList.remove("winner");
    e.classList.remove("loser");
  });
  aiReset.forEach((e) => {
    e.classList.remove("winner");
    e.classList.remove("loser");
  });
}
