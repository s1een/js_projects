import {
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood, died } from "./food.js";
import { outsideGrid } from "./grid.js";
import { score, setSettings, SNAKE_SPEED } from "./settings.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");
const scoreBoard = document.querySelector(".score");
const startButton = document.querySelector(".btn");
const settingsBoard = document.querySelector(".settings");
const container = document.querySelector(".cantainer");
const colors = document.querySelector(".colors");
export let userSettings = {};
export { gameOver };

startMenu();

function startMenu() {
  drawSnake(gameBoard);
  drawFood(gameBoard);

  const snake = document.querySelector(".snake");
  const food = document.querySelector(".food");

  colors.addEventListener("input", (e) => {
    if (e.target.classList.contains("snake-color")) {
      snake.style.backgroundColor = e.target.value;
      snake.style.boxShadow = `0px 0px 10px 5px ${e.target.value}`;
    }
    if (e.target.classList.contains("food-color")) {
      food.style.backgroundColor = e.target.value;
      food.style.boxShadow = `0px 0px 10px 5px ${e.target.value}`;
    }
  });
}

function getSettings() {
  const snakeColor = document.querySelector(".snake-color").value;
  const foodColor = document.querySelector(".food-color").value;
  let startScore = document.querySelector(".increment").value;
  let speedInc = document.querySelector(".speed").value;
  const gameMode = document.querySelector(".game-mode").value;
  if (startScore > 50 || startScore < 1) {
    startScore = 1;
  }
  if (speedInc > 10 || speedInc < 0) {
    speedInc = 1;
  }
  console.log(
    `Snake Color: ${snakeColor}\nFood Clolr: ${foodColor}\nStart Score: ${startScore}\nSpeed: ${speedInc}\nGame Mode: ${gameMode}`
  );
  return {
    mainColor: snakeColor,
    secondColor: foodColor,
    userScore: startScore,
    speed: speedInc,
    mode: gameMode,
  };
}

startButton.addEventListener("click", (e) => {
  userSettings = getSettings();
  setSettings();
  scoreBoard.removeAttribute("hidden");
  settingsBoard.setAttribute("hidden", "");
  container.style.flexDirection = "column";
  window.requestAnimationFrame(main);
});

function main(currentTIme) {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart..")) {
      window.location.reload(true);
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTIme - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTIme;
  update();
  draw();
}

function update() {
  updateSnake();
  updateFood();
  updateScore();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || died;
}

function updateScore() {
  scoreBoard.innerHTML = score;
}
