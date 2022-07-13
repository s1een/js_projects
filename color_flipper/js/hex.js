const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const mySpan = document.querySelector(".color");
const button = document.querySelector(".btn");
const title = document.querySelector(".nav-center");

let start = shuffle();
document.body.style.backgroundColor = start;
mySpan.innerHTML = start;
title.style.color = start;

button.addEventListener("click", (event) => {
  const random = shuffle();
  document.body.style.backgroundColor = random;
  mySpan.innerHTML = random;
  title.style.color = random;
});

function shuffle() {
  let str = "#";
  for (let i = 0; i < 6; i++) {
    str += hex[getRandon()];
  }
  return str;
}

function getRandon() {
  return Math.floor(Math.random() * hex.length);
}
