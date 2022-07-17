import { userSettings } from "./app.js";
export const EXPANSION_RATE = 1;
export let FOOD_POINTS = 5;
export let score = 0;
let MAX_SPEED = 30;
export let SNAKE_SPEED = 10;
export const snakeBody = [{ x: 11, y: 11 }];
export let SNAKE_MAX_SIZE = 0;
export let gameMode = "default";
let speedIncrement = 2;
export let snakeColor = "blueviolet";
export let foodColor = "lime";
export const maxBombsLength = 10;

export function updatePoints() {
  score += FOOD_POINTS;
}

export function snakeSpeedUp() {
  if (snakeBody.length % 2 === 0 && SNAKE_SPEED !== MAX_SPEED) {
    SNAKE_SPEED += speedIncrement;
    console.log("Spead UP!");
  }
}

function raceMode() {
  console.log("RACE!");
  speedIncrement = 5;
  MAX_SPEED = 100;
  SNAKE_MAX_SIZE = 5;
  FOOD_POINTS = 10;
}

function bombsMode() {
  console.log("BOMBS!");
  speedIncrement = 1;
  MAX_SPEED = 30;
  SNAKE_MAX_SIZE = 10;
  FOOD_POINTS = 20;
}
export function setSettings() {
  if (Object.keys(userSettings).length == 0) {
    return;
  }
  FOOD_POINTS = Number(userSettings.userScore);
  SNAKE_SPEED = Number(userSettings.speed);
  gameMode = userSettings.mode;
  snakeColor = userSettings.mainColor;
  foodColor = userSettings.secondColor;
  console.log(
    `Snake Color: ${snakeColor}\nFood Clolr: ${foodColor}\nStart Score: ${FOOD_POINTS}\nSpeed: ${SNAKE_SPEED}\nGame Mode: ${gameMode}`
  );
  if (gameMode === "race") {
    raceMode();
  }
  if (gameMode === "bombs") {
    bombsMode();
  }
}
