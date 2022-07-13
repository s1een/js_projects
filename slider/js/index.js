const slides = document.querySelectorAll(".slide");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

let counter = 0;
nextButton.addEventListener("click", (event) => {
  counter++;
  carousel();
});

prevButton.addEventListener("click", (event) => {
  counter--;
  carousel();
});

function carousel() {
  if (counter === slides.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = slides.length - 1;
  }
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}
