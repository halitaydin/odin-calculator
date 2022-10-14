const add = (firstNum, secondNum) => firstNum + secondNum;
const subtract = (firstNum, secondNum) => firstNum - secondNum;
const multiply = (firstNum, secondNum) => firstNum * secondNum;
const divide = (firstNum, secondNum) => firstNum / secondNum;

function operate(operator, firstNum, secondNum) {
  return Number(operator(firstNum, secondNum).toFixed(3));
}

const display = document.getElementById("display");
const backSpace = document.getElementById("backSpace");
const decimalBtn = document.getElementById("decimalBtn");
const mainDiv = document.getElementById("mainDiv");
const allClear = document.getElementById("allClear");

mainDiv.addEventListener("click", () => {
  if (!display.value.includes(".")) decimalBtn.disabled = false;
  display.value ? (allClear.textContent = "C") : (allClear.textContent = "AC");
});

backSpace.addEventListener("click", () => {
  let val = display.value.split("");
  if (val.length > 0) {
    val.pop().toString();
    display.value = val.join("");
  }
});

let clearDisplay = false;
const buttons = document.querySelectorAll(".num");
for (const button of buttons) {
  button.addEventListener("click", (e) => {
    if (clearDisplay) {
      display.value = "";
      clearDisplay = false;
    }
    display.value += e.target.textContent;
    if (display.value.includes(".")) decimalBtn.disabled = true;
  });
}

const clear = document.querySelector(".key");
clear.addEventListener("click", () => {
  display.value = "";
  numbers = [];
  operatorArray = [];
});

const operators = document.querySelectorAll(".operator");
let numbers = [];
let operatorArray = [];

for (operation of operators) {
  operation.addEventListener("click", (e) => {
    numbers.push(Number(display.value));
    operatorArray.push(e.target.textContent);

    if (numbers.length === 2) {
      if (operatorArray[0] === "+")
        numbers[0] = operate(add, numbers[0], numbers[1]);
      if (operatorArray[0] === "-")
        numbers[0] = operate(subtract, numbers[0], numbers[1]);
      if (operatorArray[0] === "x")
        numbers[0] = operate(multiply, numbers[0], numbers[1]);
      if (operatorArray[0] === "/")
        numbers[0] = operate(divide, numbers[0], numbers[1]);
      numbers.pop();
      operatorArray.shift();
      display.value = numbers[0];
    }
    clearDisplay = true;
  });
}

// Keyboard Support
window.addEventListener("keydown", (e) => {
  if (e.code === "Period" || e.code === "NumpadDecimal")
    decimalBtn.disabled = true;
  if (clearDisplay) {
    display.value = "";
    clearDisplay = false;
  }

  if (e.key === "Backspace") {
    let val = display.value.split("");
    if (val.length > 0) {
      val.pop().toString();
      display.value = val.join("");
    }
    if (!display.value.includes(".")) decimalBtn.disabled = false;
  }

  if (e.key === "c" || e.key === "C") {
    display.value = "";
    numbers = [];
    operatorArray = [];
  }

  let key = Number(e.key);
  if (e.key === ".") {
    if (
      display.value.includes(".") &&
      (e.code === "NumpadDecimal" || e.code === "Period")
    ) {
      e.preventDefault();
      return false;
    }
    display.value += e.key;
  }
  if (!(isNaN(key) || e.key === null || e.key === " ")) {
    display.value += e.key;
  }
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "/" ||
    e.key === "*" ||
    e.key === "=" ||
    e.key === "Enter"
  ) {
    numbers.push(Number(display.value));
    operatorArray.push(e.key);
    clearDisplay = true;
  }

  if (numbers.length === 2) {
    if (operatorArray[0] === "+")
      numbers[0] = operate(add, numbers[0], numbers[1]);
    if (operatorArray[0] === "-")
      numbers[0] = operate(subtract, numbers[0], numbers[1]);
    if (operatorArray[0] === "*")
      numbers[0] = operate(multiply, numbers[0], numbers[1]);
    if (operatorArray[0] === "/")
      numbers[0] = operate(divide, numbers[0], numbers[1]);
    numbers.pop();
    operatorArray.shift();
    display.value = numbers[0];
  }
  display.value ? (allClear.textContent = "C") : (allClear.textContent = "AC");
  display.value.length > 13
    ? (display.style.fontSize = "25px")
    : (display.style.fontSize = "40px");
});
