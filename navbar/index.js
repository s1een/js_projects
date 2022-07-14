const toggleButton = document.querySelector(".toggle-button");
const links = document.querySelector(".navbar-links");
const events = document.querySelector(".events");
const dom = document.querySelector(".dom");

toggleButton.addEventListener("click", (event) => {
  links.classList.toggle("active");
});
addGlobalEventListener("click", "div", (e) => {
  console.log(e.target);
});

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

const newDiv = document.createElement("div");
newDiv.style.width = "200px";
newDiv.style.height = "200px";
newDiv.style.backgroundColor = "red";
events.append(newDiv);
