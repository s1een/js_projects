const form = document.querySelector(".form");
const inputField = document.querySelector(".input_text");
const imgField = document.querySelector(".code__container");
const colors = ["f00", "0f0", "00f", "556B2F", ""];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // makeQrCode(inputField, imgField);
  shuffle(colors);
  qrCodeApi(inputField, imgField, colors);
});

function formValidate(value) {
  if (value === "") {
    return false;
  } else {
    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return expression.test(value);
  }
}
function makeQrCode(inputField, imgField) {
  let inputValue = inputField.value;
  if (!formValidate(inputValue)) {
    alert("The entered text is invalid.");
    console.log(`User input: ${inputValue}`);
    return;
  }
  let src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${inputValue}`;
  imgField.innerHTML = `<img src="${src}" alt="qr-code" width="300" height="300">`;
}
function qrCodeApi(field, img, colors) {
  if (formValidate(field.value)) {
    const url = `https://api.qrserver.com/v1/create-qr-code/?data=${field.value}&size=${img.clientWidth}x${img.clientHeight}&color=${colors[0]}`;
    fetch(url)
      .then((response) => response.url)
      .then((data) => {
        img.innerHTML = `<a class='qr-code' href="http://${field.value}" target="_blank"></a>`;
        let link = img.firstChild;
        link.innerHTML = `<img src="${data}" alt="qr-code" width="300" height="300">`;
      })
      .catch((e) => alert(e));
  } else {
    alert("The entered text is invalid.");
    console.log(`User input: ${field.value}`);
    return;
  }
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
