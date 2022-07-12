const clock = document.querySelector(".clock__container");
const text = document.querySelector(".date");
const res = document.querySelector(".result");
let myTime = "";
let time;
function showTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let session = "AM";
  if (hours === 0) hours = 12;
  if (hours > 12) {
    hours -= 12;
    session = "PM";
  }
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  clock.innerHTML = `${hours}:${minutes}:${seconds} ${session}`;
  showDate(date);
  myTime = setTimeout(showTime, 1000);
}

function showDate(date) {
  let fullDate = date.toDateString();
  text.innerHTML = `${fullDate}`;
  return fullDate;
}

const buttons = document.querySelectorAll(".btn");
buttons[0].addEventListener("click", (e) => {
  showTime();
  buttons[2].removeAttribute("disabled");
});
buttons[1].addEventListener("click", (e) => {
  clearTimeout(myTime);
  buttons[2].setAttribute("disabled", "");
});
buttons[2].addEventListener("click", (e) => {
  let date = new Date();
  if (e.target.classList.contains("_active")) {
    let result = date.getTime() - time;
    result = result % (1000 * 60 * 60 * 24);
    let dh = parseInt(result / (1000 * 60 * 60));
    result = result % (1000 * 60 * 60);
    let dm = parseInt(result / (1000 * 60));
    result = result % (1000 * 60);
    let ds = parseInt(result / 1000);
    res.innerHTML += `Detected time: ${dh}:${dm}:${ds} <br>`;
    e.target.classList.remove("_active");
  } else {
    time = date.getTime();
    e.target.classList.add("_active");
  }
});
