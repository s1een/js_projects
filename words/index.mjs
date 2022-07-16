import { RapidAPI, GiphyAPI } from "./api_keys.mjs";

const inputField = document.querySelector(".input-text");
const mainForm = document.querySelector(".input-container");
const result = document.querySelector(".result-container");
const gifts = document.querySelector(".picture");
const mainField = document.querySelector(".wrapper");
// result item
const item = document.querySelector(".item");
const itemClone = item.cloneNode(true);

// buttons
const clearButton = document.querySelector(".clear");
const searchButton = document.querySelector(".find");
const randomWord = document.querySelector(".random");
const favarButton = document.querySelector(".favor");

// navbar
const toggleButton = document.querySelector(".toggle-button");
const links = document.querySelector(".navbar-links");

toggleButton.addEventListener("click", (event) => {
  links.classList.toggle("active");
});

// favorites
const favorites = [];

favarButton.addEventListener("click", showFavorites);

function showFavorites() {
  result.innerHTML = "";
  if (favorites.length > 0) {
    for (let i = 0; i < favorites.length; i++) {
      result.append(favorites[i]);
    }
  } else {
    item.innerHTML = "";
    item.classList.add("empty");
    item.removeAttribute("hidden");
    item.innerHTML = "Your favorites list is empty.";
    result.append(item);
  }
}

// gif
gifts.addEventListener("click", (e) => {
  getGif();
});

async function getGif() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${RapidAPI}`,
      "X-RapidAPI-Host": "giphy.p.rapidapi.com",
    },
  };
  const url = `https://giphy.p.rapidapi.com/v1/gifs/random?api_key=${GiphyAPI}&tag=cat&rating=pg-13`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    gifts.children[0].src = data.data.images.original.url;
  } catch (error) {
    alert(
      `Oops, something went wrong... You're fine, it's a problem on our side.`
    );
    console.error(error);
  }
}

// main
mainForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = inputField.value;
  if (!inputValidate(userInput)) {
    gifts.setAttribute("hidden", "");
    itemClone.removeAttribute("hidden");
    sendRequest(userInput);
  } else {
    alert("Incurrect Input!");
    console.log(`User Input: ${userInput}`);
  }
});

async function sendRequest(value) {
  mainField.classList.add("_sending");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    mainField.classList.remove("_sending");
    document.body.style.overflow = "auto";
  }, 3000);
  const url = `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${value}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${RapidAPI}`,
      "X-RapidAPI-Host": "mashape-community-urban-dictionary.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return await makeCard(data.list);
  } catch (error) {
    alert(
      `Oops, something went wrong... You're fine, it's a problem on our side.`
    );
    console.error(error);
  }
}

async function makeCard(data) {
  const list = await data;
  result.innerHTML = "";
  if (list.length === 0) {
    item.innerHTML = "";
    item.classList.add("error");
    item.classList.add("empty");
    item.innerHTML = "I dont know this word, try something else.";
    result.append(item);
    return;
  }
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
    clone.children[4].children[2].innerHTML += list[i].thumbs_down;
    result.append(clone);
  }
  const wordLinks = document.querySelectorAll(".word-link");
  wordLinks.forEach((el) => {
    el.addEventListener("click", (event) => {
      sendRequest(event.currentTarget.textContent);
      inputField.value = event.currentTarget.textContent;
    });
  });
  const favoriteButtons = document.querySelectorAll(".favorite");
  favoriteButtons.forEach((el) => {
    el.addEventListener("click", (e) => {
      let card = e.currentTarget.parentElement.parentElement;
      card.classList.toggle("append");
      favorites.push(card);
      e.currentTarget.style.display = "none";
    });
  });
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
      "X-RapidAPI-Key": `${RapidAPI}`,
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    },
  };
  const url = "https://random-words5.p.rapidapi.com/getMultipleRandom?count=1";
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    sendRequest(data[0]);
    inputField.value = data[0];
  } catch (error) {
    alert(
      `Oops, something went wrong... You're fine, it's a problem on our side.`
    );
    console.error(error);
  }
}

function inputValidate(value) {
  if (value === "") {
    return true;
  } else {
    return /[0-9]|\W+|\./g.test(value);
  }
}

// Events
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
