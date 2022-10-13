const add = (firstNum, secondNum) => firstNum + secondNum;
const subtract = (firstNum, secondNum) => firstNum - secondNum;
const multiply = (firstNum, secondNum) => firstNum * secondNum;
const divide = (firstNum, secondNum) => firstNum / secondNum;

function operate(operator, firstNum, secondNum) {
  return operator(firstNum, secondNum);
}

let firstNum = [];
let secondNum = "";
const display = document.getElementById("display");

const backSpace = document.getElementsByClassName("key");
backSpace[1].addEventListener("click", () => {
  let val = display.value.split("");
  if (val.length > 0) {
    val.pop().toString();
    return (display.value = val.join(""));
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
  });
}

const clear = document.querySelector(".key");
clear.addEventListener("click", () => {
  display.value = "";
  test = [];
});

const operators = document.querySelectorAll(".operator");

let test = [];
let type = [];
let result = 0;
for (operation of operators) {
  operation.addEventListener("click", (e) => {
    if (test.length < 2) {
      test.push(Number(display.value));
    }
    type.push(e.target.textContent);

    if (test.length === 2) {
      test[1] = Number(display.value);
      if (type[type.length - 2] === "+") {
        test[0] = operate(add, test[0], test[1]);
      }

      if (type[type.length - 2] === "-") {
        test[0] = operate(subtract, test[0], test[1]);
      }

      if (type[type.length - 2] === "x") {
        test[0] = operate(multiply, test[0], test[1]);
      }

      if (type[type.length - 2] === "/") {
        test[0] = operate(divide, test[0], test[1]);
      }
      display.value = test[0];
      console.log(test);
    }
    clearDisplay = true;
  });
}
