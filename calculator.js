class Calculator {
    
    constructor(previousTextElement,currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation='';
    }
    
    delete(){
        this.currentOperand = this.currentOperand.slice(0,-1);
    }
    
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.'))
            return ;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    operate(operation){
        if (this.currentOperand === '')
            return ;
        if (this.previousOperand !== '')
            this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        
    }
    
    compute(){
        let computation = '';
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return ;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '%':
                computation = prev / current;
                break;
            default:
                return ;
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    updateDisplay(){
        this.currentTextElement.innerText = this.currentOperand;
        if (this.operation != null){
            this.previousTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }else{
            this.previousTextElement.innerText = this.previousOperand;
        }
        
        
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousTextElement = document.querySelector('[data-revious-op]');
const currentTextElement = document.querySelector('[data-current-op]');

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', e => {
        calculator.operate(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', e => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', e => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', e => {
    calculator.delete();
    calculator.updateDisplay();
})