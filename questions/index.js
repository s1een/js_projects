// Selectors inside element
const questions = document.querySelectorAll(".question");
questions.forEach((question) => {
  const btn = question.querySelector(".question-btn");
  btn.addEventListener("click", (event) => {
    questions.forEach((item) => {
      if (item !== question) item.classList.remove("show-text");
    });
    question.classList.toggle("show-text");
  });
});
// traversing the DOM
// const questions = document.querySelectorAll(".question");
// const buttons = document.querySelectorAll(".question-btn");

// buttons.forEach((el) => {
//   el.addEventListener("click", (event) => {
//     event.currentTarget.parentElement.parentElement.classList.toggle(
//       "show-text"
//     );
//   });
// });
