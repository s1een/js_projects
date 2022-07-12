const inputField = document.querySelector(".input");
const resultField = document.querySelector(".result");
const containerText = document.querySelector(".text");
const favoritesField = document.querySelector(".favorites");
// Buttons
const translateButton = document.querySelector(".btn");
const clearButton = document.querySelector(".clear");
const heartButton = document.querySelector(".add_to");
// Listeners
translateButton.addEventListener("click", translator);
clearButton.addEventListener("click", clearFields);
heartButton.addEventListener("click", addToWish);
inputField.addEventListener("input", addClearButton);

function addToWish(event) {
  const value = resultField.value;
  if (value !== "") {
    const item = document.createElement("div");
    item.className = "item";
    favoritesField.append(item);
    const text = document.createElement("div");
    const result = document.createElement("div");
    text.className = "favorite left";
    result.className = "favorite right";
    text.textContent = `${inputField.value}`;
    result.textContent = `${value}`;
    item.append(text, result);
  }
}
function addClearButton(event) {
  if (event.target.value !== "") {
    clearButton.removeAttribute("hidden");
    heartButton.removeAttribute("hidden");
  } else {
    clearButton.setAttribute("hidden", "");
    heartButton.setAttribute("hidden", "");
  }
}
function clearFields(event) {
  inputField.value = "";
  resultField.value = "";
  clearButton.setAttribute("hidden", "");
  heartButton.setAttribute("hidden", "");
}
function translator(event) {
  event.preventDefault();
  let value = inputField.value;
  console.log(value);
  if (value !== "") {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", `${value}`);
    encodedParams.append("target", "ru");
    encodedParams.append("source", "en");
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "55124000ccmshc595b69e5203666p10ff32jsn5d8f9fe02e2d",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      body: encodedParams,
    };

    makeRequest(options);
  } else {
    alert("Empty Field!");
  }
}
function makeRequest(options) {
  fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    options
  )
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        console.log(response);
      }
    })
    .then((response) => {
      console.log(response);
      let data = response.data.translations[0].translatedText;
      console.log(data);
      resultField.innerHTML = data;
    })
    .catch((err) => {
      console.log(err);
      alert("Too Many Requests!");
    });
}
