const numberButtons = document.querySelectorAll('[number-button]');
const operatorButtons = document.querySelectorAll('[operator-button]');
const equalsButton = document.getElementById('equalsBtn');
const pointButton = document.getElementById('pointBtn');
const deleteButton = document.getElementById('deleteBtn');
const clearButton = document.getElementById('clearBtn');
const currentScreen = document.getElementById('currentScreen');
const lastScreen = document.getElementById('lastScreen');

let firstElement = '';
let secondElement = '';
let currentOperation = null;
let resetScreen = false;

window.addEventListener('keydown', KeyboardInput)
equalsButton.addEventListener('click', eval)
clearButton.addEventListener('click', clearScreen)
deleteButton.addEventListener('click', deleteLast)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => addNumberOnScreen(button.textContent))
})

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => setOps(button.textContent))
})

function appendPoint() {
  if (resetScreen) resetTheScreen()
  if (currentScreen.textContent === '')
    currentScreen.textContent = '0'
  if (currentScreen.textContent.includes('.')) return
    currentScreen.textContent += '.'
}

function KeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) addNumberOnScreen(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') eval()
  if (e.key === 'Backspace') deleteLast()
  if (e.key === 'Escape') clearScreen()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOps(convertOperator(e.key))
}
  
function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function addNumberOnScreen(number) {
  if (resetScreen) {
    resetTheScreen();
  }

  if (currentScreen.textContent === '0') {
    currentScreen.textContent = number;
  } else {
    currentScreen.textContent += number;
  }
}

function resetTheScreen() {
  currentScreen.textContent = '';
  resetScreen = false;
}

function deleteLast() {
  if (currentScreen.textContent.toString().length == '1') {
    currentScreen.textContent = '0';
  } else {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
  }
}

function clearScreen(){
  currentScreen.textContent = '0';
  lastScreen.textContent = null;
  firstElement = '';
  secondElement = '';
  currentOperation = null;
}

function setOps(operation) {
  if (currentOperation !== null) eval();
  firstElement = currentScreen.textContent;
  currentOperation = operation;
  lastScreen.textContent = `${firstElement} ${currentOperation}`;
  resetScreen = true;
}

function eval() {
  if (currentOperation === null || resetScreen) return
  if (currentOperation === '÷' && currentOperation.textContent === '0') {
    alert('Division by 0!');
    return;
  }
  secondElement = currentScreen.textContent;
  currentScreen.textContent = roundResult(operation(currentOperation, firstElement, secondElement))
  lastScreen.textContent = `${firstElement} ${currentOperation} ${secondElement} =`;
  currentOperation = null;
}

function addition(a, b) {
  return a + b;
}

function substraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function operation(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch(operator) {
    case '+':
      return addition(a, b)
    case '-':
      return substraction(a, b)
    case '×':
      return multiplication(a, b)
    case '÷':
      if (b === 0) return null
      else return division(a, b)
    default:
      return null
  }
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}