const colors = [
  "green",
  "red",
  "rgba(133,122,200)",
  "#f15025",
  "yellow",
  "blue",
  "pink",
];
const mySpan = document.querySelector(".color");
const button = document.querySelector(".btn");

document.body.style.backgroundColor = mySpan.textContent;

button.addEventListener("click", (event) => {
  const random = getRandom();
  document.body.style.backgroundColor = `${colors[random]}`;
  mySpan.innerHTML = colors[random];
});

function getRandom() {
  return Math.floor(Math.random() * colors.length);
}
