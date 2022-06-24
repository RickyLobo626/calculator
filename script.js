'use strict';

const clearBtn = document.getElementById('clear');
const clearEntryBtn = document.getElementById('clear-entry');
const equalBtn = document.getElementById('equal');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const pointBtn = document.querySelector('[data-point]');
let operationDisplay = document.getElementById('operation');
let currentDisplay = document.getElementById('current');
let currentNum, previousNum, currentOperator, equalWasClicked;
reset();

numberBtns.forEach(button => {
  button.addEventListener('click', () => enterNumber(button.textContent));
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => enterOperator(button.textContent));
});

equalBtn.addEventListener('click', evaluate);

clearBtn.addEventListener('click', () => {
  
});

function enterNumber(num) {
  if (equalWasClicked) {
    reset();
    currentDisplay.textContent += num;
  }
  //if display is only a 0 or if current num is empty
  if (currentDisplay.textContent == '0' || currentNum == '') {
    currentDisplay.textContent = '';
    currentDisplay.textContent += num;
  } else {
    currentDisplay.textContent += num;
  }

  
  
    
  // Store number in the currentNum variable 
  currentNum = currentDisplay.textContent;
  console.log({previousNum});
  console.log({currentNum});
}

function enterOperator(op) {
  

  // If two numbers are stored, operate
  if (previousNum != '' && currentNum != '') {
    currentNum = operate(currentOperator, previousNum, currentNum);
    currentDisplay.textContent = currentNum;
    currentOperator = null;
    previousNum = '';
  }

  // Store currentNum on previousNum and empty currentNum for the next value
  previousNum = currentNum;
  currentNum = '';
  
  // store operator
  currentOperator = op;

  equalWasClicked = false;

  console.log({previousNum});
  console.log({currentNum});
  console.log({currentOperator});
}

function evaluate() {
  // If two numbers are stored, operate
  if (previousNum != '' && currentNum != '') {
    currentNum = operate(currentOperator, previousNum, currentNum);
    currentDisplay.textContent = currentNum;
    currentOperator = null;
    previousNum = '';
  } 

  // Store currentNum on previousNum and empty currentNum for the next value
  previousNum = currentNum;
  currentNum = '';
  
  equalWasClicked = true;

  console.log({previousNum});
  console.log({currentNum});
  console.log({currentOperator});
}

function reset() {
  currentNum = '';
  previousNum = '';
  currentOperator = null;
  equalWasClicked = false;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '−':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      if (b == 0) {
        return 0;
      }
      return divide(a, b);
    default:
      return null;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}