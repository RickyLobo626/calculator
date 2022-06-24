'use strict';

const operationDisplay = document.getElementById('operation');
const currentDisplay = document.getElementById('current');
const clearBtn = document.getElementById('clear');
const clearEntryBtn = document.getElementById('clear-entry');
const equalBtn = document.getElementById('equal');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const pointBtn = document.querySelector('[data-point]');

numberBtns.forEach(button => {
  button.addEventListener('click', () => {

  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {

  });
});

equalBtn.addEventListener('click', () => {
  
});



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