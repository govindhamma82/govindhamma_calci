document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '0';
    let previousInput = null;
    let operator = null;
    let waitingForSecondOperand = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                resetCalculator();
                return;
            }

            if (value === '=') {
                handleEqual();
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
                return;
            }

            handleNumber(value);
        });
    });

    function handleNumber(value) {
        if (waitingForSecondOperand) {
            currentInput = value;
            waitingForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }
        display.textContent = currentInput;
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (previousInput === null) {
            previousInput = inputValue;
        } else if (operator) {
            const result = calculate(previousInput, inputValue, operator);
            currentInput = String(result);
            display.textContent = currentInput;
            previousInput = result;
        }

        operator = nextOperator;
        waitingForSecondOperand = true;
    }

    function handleEqual() {
        if (operator && previousInput !== null) {
            const result = calculate(previousInput, parseFloat(currentInput), operator);
            currentInput = String(result);
            display.textContent = currentInput;
            previousInput = null;
            operator = null;
            waitingForSecondOperand = false;
        }
    }

    function resetCalculator() {
        currentInput = '0';
        previousInput = null;
        operator = null;
        waitingForSecondOperand = false;
        display.textContent = '0';
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }
});
