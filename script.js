'use strict';

const clearBtn = document.getElementById('clear');
const clearEntryBtn = document.getElementById('clear-entry');
const equalBtn = document.getElementById('equal');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const pointBtn = document.querySelector('[data-point]');
let operationDisplay = document.getElementById('operation');
let currentDisplay = document.getElementById('current');
let currentNum, previousNum, currentOperator;
reset();

// Click events
clearEntryBtn.addEventListener('click', clearEntry);
pointBtn.addEventListener('click', enterPoint);
equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', reset);

numberBtns.forEach(button => {
  button.addEventListener('click', () => enterNumber(button.textContent));
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => enterOperator(button.textContent));
});

// Keydown event
window.addEventListener('keydown', getKey);

function enterNumber(num) {

  if (currentDisplay.textContent == '0' || currentNum == '') {
    currentDisplay.textContent = '';
  } else if (previousNum == '' && currentNum != '' && currentOperator != null) {
    previousNum = currentNum;
    currentDisplay.textContent = '';
  }

  // Show number
  currentDisplay.textContent += num;

  // Store number in the currentNum variable 
  currentNum = '';
  currentNum = currentDisplay.textContent;
}

function enterOperator(op) {
  
  // If two numbers are stored, operate
  if (previousNum != '' && currentNum != '') {
    currentNum = operate(currentOperator, previousNum, currentNum);
    currentDisplay.textContent = currentNum;
    operationDisplay.textContent = `${currentNum} ${op}`;
    currentOperator = null;
    previousNum = '';
  } else {
    operationDisplay.textContent = `${currentNum} ${op}`;
    // Store currentNum on previousNum and empty currentNum for the next value
    previousNum = currentNum;
    currentNum = '';
  }
  
  // Store operator
  currentOperator = op;
}

function evaluate() {
  if (currentOperator != null) {
    operationDisplay.textContent = `${previousNum} ${currentOperator} ${currentNum} =`;
    // If two numbers are stored, operate
    if (previousNum != '' && currentNum != '') {
      currentNum = roundDecimals(operate(currentOperator, previousNum, currentNum));
      currentDisplay.textContent = currentNum;
      previousNum = '';
    } else {
      // Store currentNum on previousNum and empty currentNum for the next value
      previousNum = currentNum;
      currentNum = '';
    }
    currentOperator = null;
  }
}

function enterPoint() {
  if (!isDecimal(currentDisplay.textContent)) {
    if (currentDisplay.textContent != '') {
      currentDisplay.textContent += '.';
    } else {
      currentDisplay.textContent = '0.';
    }
    currentNum = currentDisplay.textContent;
  }
}

function reset() {
  currentNum = '';
  previousNum = '';
  currentOperator = null;
  currentDisplay.textContent = '0';
  operationDisplay.textContent = '';
}

function clearEntry() {
  if (currentDisplay.textContent.length > 0 && currentDisplay.textContent != '0') {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    currentNum = currentDisplay.textContent;
  }
  if (currentDisplay.textContent == '') {
    currentDisplay.textContent = '0';
  }
}

function getKey(e) {
  if (e.key >= 0 && e.key <= 9) {
    enterNumber(e.key);
  } else if (e.key == '.') {
      enterPoint();
  } else if (e.key == '=' || e.key == 'Enter') {
      evaluate();
  } else if (e.key == 'Backspace') {
      clearEntry();
  } else if (e.key == 'Escape') {
      reset();
  } else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
      if (e.key == '/') {
        enterOperator('÷');
      } else if (e.key == '*') {
        enterOperator('×');
      } else {
        enterOperator(e.key);
      }
  }
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

function isDecimal(str) {
  if (str.includes('.')) {
    return true;
  }
  return false;
}

// Round to 3 decimals
function roundDecimals(num) {
  return Math.round(num * 1000) / 1000;
}
