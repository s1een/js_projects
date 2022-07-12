const balanceField = document.querySelector(".balance");
const descField = document.querySelector(".description");
const amountField = document.querySelector(".amount");
const historyContainer = document.querySelector(".history__container");
const historyItems = document.getElementsByClassName("history__item");
const income = document.getElementsByClassName("income_text");
const expense = document.getElementsByClassName("expense_text");
const button = document.querySelector(".btn");
const MAX_BALANCE = 100000;

function getBalance(changeValue) {
  let value = parseInt(changeValue);
  let balance = parseInt(balanceField.textContent);
  let result = balance + value;
  if (result >= MAX_BALANCE) {
    result = MAX_BALANCE;
    button.setAttribute("disabled", "");
    alert("Maximum balance. Congratulations)");
  } else if (result <= -MAX_BALANCE) {
    result = -MAX_BALANCE;
    button.setAttribute("disabled", "");
    alert("Maximum balance. Congratulations)");
  } else {
    button.removeAttribute("disabled");
  }
  balanceField.innerHTML = `${result}`;
}

const form = document.querySelector(".form");
form.addEventListener("submit", formSend);
async function formSend(event) {
  event.preventDefault();
  if (!formValidate(descField, amountField)) {
    alert("The entered text is invalid.");
    return;
  }
  if (addItem(descField.value, amountField.value, historyContainer)) {
    getBalance(amountField.value);
    form.reset();
    for (let index = 0; index < historyItems.length; index++) {
      historyItems[index].addEventListener("click", (e) => {
        let valueCard = e.target.querySelector(".value");
        valueCard = valueCard.textContent;
        getBalance(-valueCard);
        spendDelete(parseInt(valueCard));
        e.target.remove();
      });
    }
  }
}

function spendDelete(value) {
  let incomeValue = parseInt(income[0].textContent);
  let expenseValue = parseInt(expense[0].textContent);
  let result = 0;
  if (value > 0) {
    result = incomeValue - value;
    income[0].innerHTML = `${result}`;
  } else {
    result = expenseValue + value;
    expense[0].innerHTML = `${result}`;
  }
}

function formValidate(desc, amount) {
  desc.classList.remove("_error");
  amount.classList.remove("_error");
  let regTest = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(desc.value);
  let error = 0;
  if (desc.value === "" || !regTest) {
    desc.classList.add("_error");
    error++;
  }
  if (amount.value === "") {
    amount.classList.add("_error");
    error++;
  }
  if (error > 0) return false;
  else return true;
}
function spendingCheck(value) {
  let incomeValue = parseInt(income[0].textContent);
  let expenseValue = parseInt(expense[0].textContent);
  let result = 0;
  if (value > 0) {
    result = incomeValue + value;
    income[0].innerHTML = `${result}`;
  } else {
    result = expenseValue - value;
    expense[0].innerHTML = `${result}`;
  }
}
function addItem(desc, value, field) {
  let color = "";
  if (value == 0) {
    alert("Transaction cannot be null!");
    return;
  }
  if (value > 0) {
    let incomeValue = parseInt(income[0].textContent);
    let myValue = parseInt(value);
    let res = incomeValue + myValue;
    if (res > MAX_BALANCE) {
      alert("Max Balance: 99999, u cant add more.");
      return false;
    }
    color = "income";
  } else {
    let expenseValue = parseInt(expense[0].textContent);
    let myValue = parseInt(value);
    let res = expenseValue - myValue;
    if (res > MAX_BALANCE) {
      alert("Min Balance: -99999, u cant add less.");
      return false;
    }
    color = "expense";
  }
  content = `<div class="history__item ${color}">
  <span class="text">${desc}</span><span class="value">${value}</span>
</div>`;
  field.innerHTML += content;
  spendingCheck(parseInt(value));
  return true;
}
