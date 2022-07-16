const inputField = document.querySelector(".input-text");
const clearButton = document.querySelector(".clear");
const searchButton = document.querySelector(".find");
const mainForm = document.querySelector(".input-container");
const result = document.querySelector(".result-container");
const item = document.querySelector(".item");
const itemClone = item.cloneNode(true);
const randomWord = document.querySelector(".random");

const toggleButton = document.querySelector(".toggle-button");
const links = document.querySelector(".navbar-links");

toggleButton.addEventListener("click", (event) => {
  links.classList.toggle("active");
});

function replaceBrackets(str) {
  return str.replace(/\[|\]/g, "");
}

function makeLinks(str) {
  let result = str.replaceAll("[", `<a href="#" class='word-link'>`);
  result = result.replaceAll("]", "</a>");
  return result;
}
async function getRandomWord() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "55124000ccmshc595b69e5203666p10ff32jsn5d8f9fe02e2d",
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    },
  };
  const url = "https://random-words5.p.rapidapi.com/getMultipleRandom?count=1";
  const response = await fetch(url, options);
  const data = await response.json();
  sendRequest(data[0]);
  inputField.value = data[0];
}
randomWord.addEventListener("click", (e) => {
  getRandomWord();
});

clearButton.addEventListener("click", (e) => {
  inputField.value = "";
  clearButton.style.display = "none";
  searchButton.style.display = "flex";
});

inputField.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    clearButton.style.display = "flex";
    searchButton.style.display = "none";
  } else {
    clearButton.style.display = "none";
    searchButton.style.display = "flex";
  }
});

mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = inputField.value;
  if (!inputValidate(userInput)) {
    sendRequest(userInput);
  } else {
    alert("Incurrect Input!");
    console.log(`User Input: ${userInput}`);
  }
});

async function sendRequest(value) {
  const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${value}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "55124000ccmshc595b69e5203666p10ff32jsn5d8f9fe02e2d",
      "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return await makeCard(data.list);
}

async function makeCard(data) {
  const list = await data;
  result.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const clone = itemClone.cloneNode(true);
    clone.children[0].innerHTML = list[i].word.toUpperCase();
    clone.children[0].href = list[i].permalink;
    let definition = list[i].definition;
    clone.children[1].children[0].innerHTML = makeLinks(definition);
    let example = list[i].example;
    clone.children[2].children[0].innerHTML = makeLinks(example);
    clone.children[3].children[0].innerHTML = list[i].author;
    let date = new Date(list[i].written_on);
    clone.children[3].children[1].innerHTML = date.toLocaleDateString();
    clone.children[4].children[0].innerHTML += list[i].thumbs_up;
    clone.children[4].children[1].innerHTML += list[i].thumbs_down;
    result.append(clone);
  }
  const wordLinks = document.querySelectorAll(".word-link");
  wordLinks.forEach((el) => {
    el.addEventListener("click", (event) => {
      sendRequest(event.currentTarget.textContent);
      inputField.value = event.currentTarget.textContent;
    });
  });
}

function inputValidate(value) {
  if (value === "") {
    return true;
  } else {
    return /[0-9]|\W+|\./g.test(value);
  }
}
