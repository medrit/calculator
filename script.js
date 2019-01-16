const calculator = document.querySelector("#calculator");
const digit = calculator.querySelectorAll(".digit");
const operatorButton = calculator.querySelectorAll(".operator");
const clearButton = calculator.querySelectorAll(".clear");
const equal = calculator.querySelector("#equals");
const displayValue = calculator.querySelector('#screen h2');
const displayHistory = calculator.querySelector('#screen h3');

displayValue.textContent = '0';
displayHistory.textContent = '';

let value = 0;
let operator = '';
let clear = false;

digit.forEach((button) => {
    button.addEventListener('click', () => {
        if (clear) {
            displayValue.textContent = '';
            clear = false;
        }
        if (displayValue.textContent.length > 10) {return}
        if (button.textContent === '.' && displayValue.textContent.includes('.')) {return}
        displayValue.textContent += button.textContent;
        if (displayValue.textContent.charAt(0) === '0' && displayValue.textContent.length > 1) {
            displayValue.textContent = displayValue.textContent.substring(1);
        }
    })
})

operatorButton.forEach((button) => {
    button.addEventListener('click', () => {
        if (displayValue.textContent == ''){
        } else {
            value = operate(value, parseFloat(displayValue.textContent), operator);
        }
        operator = button.value;
        displayHistory.textContent = value + button.textContent;
        displayValue.textContent = '';
    })
})

clearButton.forEach((button) => {
    button.addEventListener('click', () => {
        switch (button.getAttribute('id')) {
            case "allClear":
            displayValue.textContent = '0';
            displayHistory.textContent = '';
            value = 0;
            operator = '';
            clear = false;
            break;
            case "clear":
            displayValue.textContent = '';
            break;
            case "delete":
            displayValue.textContent = displayValue.textContent.slice(0, -1);
            break;
            default:
        }
    })
})

equal.addEventListener('click', () => {
    if (displayValue.textContent == '') {
        displayValue.textContent = value;
    } else {
        displayValue.textContent = operate(value,parseFloat(displayValue.textContent),operator);
    }
    operator = '';
    displayHistory.textContent = '';
    clear = true;
    displayValue.textContent  = (displayValue.textContent > 99999999999) ? 'Overflow': displayValue.textContent ;
    displayValue.textContent = (Math.trunc(parseFloat(displayValue.textContent)*1000000))/1000000;
})


function operate(a, b, op) {
    switch (op) {
        case 'add':
        b = a + b;
        break;
        case 'multiply':
        b = a * b;
        break;
        case 'divide':
        b = a / b;
        break;
        case 'subtract':
        b = a - b;
        break;
        case '':
        b = b;
        break;
        default:
        return false;
    }
    return b;
}

document.addEventListener('keyup', e =>{
    console.log(e.key);
    isNaN(parseInt(e.key))? false : digit[e.key].click();
    switch (e.key) {
      case '.':
      digit[10].click()
        break;
      case '+':
      operator[3].click()
        break;
      case '-':
      operator[2].click()
        break;
      case '*':
      operator[0].click()
        break;
      case '/':
      operator[1].click()
        break;
      case 'Backspace':
      clear[2].click()
        break;
      case 'Delete':
      clear[0].click()
        break;
      case 'c':
      clear[1].click()
        break;
      case '=':
      case 'Enter':
      equal.click()
        break;
      default:
  
    }
  
  });