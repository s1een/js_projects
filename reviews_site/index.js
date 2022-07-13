const reviews = [
  {
    id: 1,
    name: "Dmitry Morozov",
    job: "web developer",
    img: "../reviews_site/img/img1.png",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptate nemo sed, corporis illo porro aut molestiae eius.`,
  },
  {
    id: 2,
    name: "Susan Smith",
    job: "web developer",
    img: "../reviews_site/img/img2.png",
    text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure quia ullam, mollitia sapiente magni ducimus. Nam nulla deleniti id. Vero.`,
  },
  {
    id: 3,
    name: "Alexia Smith",
    job: "BackEnd developer",
    img: "../reviews_site/img/img3.png",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptate nemo sed, corporis illo porro aut molestiae eius.`,
  },
  {
    id: 4,
    name: "Peter Jones",
    job: "Intern",
    img: "../reviews_site/img/img1.png",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,corporis provident illum quo nobis eum libero, officia veniam cum esse ut totam odit maiores numquam, recusandae fugiat error laborum deleniti!`,
  },
];

const image = document.getElementById("person-img");
const author = document.getElementById("name");
const personJob = document.getElementById("job");
const description = document.getElementById("description");

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const randomButton = document.querySelector(".random");

let currentItem = 0;
window.addEventListener("DOMContentLoaded", (event) => {
  getReview();
});

prevButton.addEventListener("click", (event) => {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  getReview();
});

nextButton.addEventListener("click", (event) => {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  getReview();
});

randomButton.addEventListener("click", (event) => {
  currentItem = Math.floor(Math.random() * reviews.length);
  getReview();
});

function getReview() {
  const item = reviews[currentItem];
  image.src = item.img;
  author.innerText = item.name;
  personJob.innerText = item.job;
  description.innerText = item.text;
}
