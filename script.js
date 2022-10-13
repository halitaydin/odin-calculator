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

mainDiv.addEventListener("click", () => {
  if (!display.value.includes(".")) decimalBtn.disabled = false;
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
