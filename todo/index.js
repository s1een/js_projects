const inputField = document.querySelector(".input-text");
const toDoField = document.querySelector(".todos");
const toDo = document.getElementsByClassName("todo");
const delelteButtons = document.getElementsByClassName("del");
const form = document.querySelector(".form");
form.addEventListener("submit", formSend);
async function formSend(event) {
  event.preventDefault();
  if (!formValidate(inputField)) {
    alert("The entered text is invalid.");
    console.log(`User input: ${inputField.value}`);
    return;
  }
  let contents = `<div class="todo">
  <div class="todotext">
    ${inputField.value}
  </div>
  <div class="buttons">
    <button class="btn del">DEl</button>
  </div>
  </div>`;
  toDoField.innerHTML += contents;
  form.reset();
  for (let index = 0; index < delelteButtons.length; index++) {
    delelteButtons[index].addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });
  }
}
function formValidate(inputField) {
  if (inputField.value === "") {
    return false;
  } else {
    return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(inputField.value);
  }
}
