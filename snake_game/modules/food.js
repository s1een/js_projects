import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import {
  EXPANSION_RATE,
  updatePoints,
  snakeSpeedUp,
  foodColor,
  SNAKE_MAX_SIZE,
  snakeBody,
  gameMode,
  maxBombsLength,
} from "./settings.js";
export { died };

let food = getRandomFoodPosition();
let bombs = [
  getRandomBombPosition(),
  getRandomBombPosition(),
  getRandomBombPosition(),
];
let died = false;

export function update() {
  if (gameMode === "bombs") {
    if (onSnake(food)) {
      if (snakeBody.length % 2 === 0 && bombs.length <= maxBombsLength) {
        bombs.push(getRandomBombPosition());
      }
      bombs = bombs.map((el) => {
        el = getRandomBombPosition();
        return el;
      });
      expandSnake(EXPANSION_RATE);
      food = getRandomFoodPosition();
      updatePoints();
      snakeSpeedUp();
    }
    if (bombsCheck(bombs)) {
      died = true;
    }
  } else {
    if (onSnake(food)) {
      if (SNAKE_MAX_SIZE === 0) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
        updatePoints();
        snakeSpeedUp();
      } else {
        if (snakeBody.length !== SNAKE_MAX_SIZE) {
          expandSnake(EXPANSION_RATE);
        }
        food = getRandomFoodPosition();
        updatePoints();
        snakeSpeedUp();
      }
    }
  }
}

function bombsCheck(bombsArray) {
  for (let i = 0; i < bombsArray.length; i++) {
    if (onSnake(bombsArray[i])) return true;
  }
  return false;
}
export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  foodElement.classList.add("active");
  foodElement.style.backgroundColor = foodColor;
  foodElement.style.boxShadow = `0px 0px 10px 5px ${foodColor}`;
  gameBoard.appendChild(foodElement);
  if (gameMode === "bombs") {
    for (let i = 0; i < bombs.length; i++) {
      const bombElement = document.createElement("div");
      bombElement.style.gridRowStart = bombs[i].y;
      bombElement.style.gridColumnStart = bombs[i].x;
      bombElement.classList.add("food");
      bombElement.classList.add("active");
      bombElement.style.backgroundColor = "red";
      bombElement.style.boxShadow = `0px 0px 10px 5px red`;
      gameBoard.appendChild(bombElement);
    }
  }
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

function getRandomBombPosition() {
  let newBombPosition;
  while (newBombPosition == null || onSnake(newBombPosition)) {
    newBombPosition = randomGridPosition();
    if (newBombPosition.x === food.x && newBombPosition.y === food.y) {
      newBombPosition = randomGridPosition();
    }
  }
  return newBombPosition;
}
