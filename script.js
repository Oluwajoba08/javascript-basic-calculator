// display
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const inputHidden = document.querySelector('#input-hidden');
// buttons
const buttons = document.querySelectorAll('button');

const plus = document.querySelector('#_plus');
const minus = document.querySelector('#_minus');
const multiply = document.querySelector('#_multiply');
const divide = document.querySelector('#_divide');
const decimal = document.querySelector('#_decimal');
const percent = document.querySelector('#_percent');
const equal = document.querySelector('#_equal');

const multiplySign = document.querySelector('#_multiply').textContent;
const divideSign = document.querySelector('#_divide').textContent;

buttons.forEach(button =>{
    button.addEventListener('click', () =>{

        if (button.id === '_delete'){
            if (input.value == 0) {

            } else if(input.value.length === 1){
                input.value = 0
                inputHidden.value = 0
                output.value = 0
            } else if(input.value.slice(-1) === '%'){
                input.value = input.value.slice(0, -1);
                inputHidden.value = inputHidden.value.slice(0, -4);
                output.value = eval(inputHidden.value);
            }else {
                input.value = input.value.slice(0, -1);
                inputHidden.value = inputHidden.value.slice(0, -1);

                if (input.value.slice(-1) === multiplySign
                || input.value.slice(-1) === divideSign
                || input.value.slice(-1) === '+'
                || input.value.slice(-1) === '-') {
                    // do nothing
                } else {
                    output.value = eval(inputHidden.value);
                }
            }
        } else if (button.id === '_clear'){
            input.value = 0;
            inputHidden.value = 0;
            output.value = 0;

        } else if (button.id === '_decimal'){
            if(input.value.slice(-2).includes('.')
                || input.value.slice(-1).includes('%')){
                errorMessage(decimal);
            } else if(input.value.includes('.') && input.value.slice(input.value.lastIndexOf('.') + 1) * 1 !== NaN){
                errorMessage(decimal);
            } else {
                input.value += button.textContent;
                inputHidden.value += button.textContent;
            }
        } else if (button.classList.contains('num')){
            if(input.value === '0'){
                input.value = '';
                input.value += button.textContent;

                inputHidden.value = '';
                inputHidden.value += button.textContent;

                output.value = inputHidden.value;
            } else if(input.value.slice(-1) === '%'){
                errorMessage(percent)
            } else {
                input.value += button.textContent;
                inputHidden.value += button.textContent;
                output.value = eval(inputHidden.value);
            }
        } else if (button.id === '_multiply') {   
            if (input.value.slice(-1) === button.textContent
// we cannot have 5+*2 or 5-*2 or 5/*2
            || input.value.slice(-1) === '+'
            || input.value.slice(-1) === '-'
            || input.value.slice(-1) === divideSign) {
                errorMessage(multiply);
            } else {
                input.value += button.textContent;
                inputHidden.value += '*';
            }
        } else if (button.id === '_divide') {   
            if (input.value.slice(-1) === button.textContent
// we cannot have 5+/2 or 5-/2 or 5*/2
            || input.value.slice(-1) === '+'
            || input.value.slice(-1) === '-'
            || input.value.slice(-1) === multiplySign) {
                errorMessage(divide);
            } else {
                input.value += button.textContent;
                inputHidden.value += '/';
            }
        } else if (button.id === '_plus') {   
            if (input.value.slice(-2) === '++' ||input.value.slice(-2) === '--' || input.value === '+'
            || input.value.slice(-2) === multiplySign + '+' || input.value.slice(-2) === multiplySign + '-'
            || input.value.slice(-2) === divideSign + '+' || input.value.slice(-2) === divideSign + '-'){
                errorMessage(plus);
            } else if(input.value.slice(-1) === '+'){
                input.value += button.textContent;
            } else if(input.value == 0){
                input.value = button.textContent;
                inputHidden.value = button.textContent;
            } else {
                input.value += button.textContent;
                inputHidden.value += '+';
            }
        } else if (button.id === '_minus') {   
            if (input.value.slice(-2) === '--' ||input.value.slice(-2) === '++' || input.value === '-' 
            || input.value.slice(-2) === multiplySign + '+' || input.value.slice(-2) === multiplySign + '-'
            || input.value.slice(-2) === divideSign + '+' || input.value.slice(-2) === divideSign + '-'){
                errorMessage(minus);
            } else if(input.value.slice(-1) === '-'){
                input.value += button.textContent;
                inputHidden.value += '+';
            } else if(input.value == 0){
                input.value = button.textContent;
                inputHidden.value = button.textContent;
            } else {
                input.value += button.textContent;
                inputHidden.value += '-';
            }
        }else if (button.id === '_percent'){
            if (input.value.slice(-2).includes('%') 
                || input.value.slice(-1).includes(multiplySign)
                || input.value.slice(-1).includes(divideSign)
                || input.value.slice(-1).includes('+')
                || input.value.slice(-1).includes('-')
                || input.value.slice(-1).includes('.')){
                errorMessage(percent);
            } else{
                input.value = input.value + button.textContent;
                inputHidden.value += '/100';
                output.value = eval(inputHidden.value);
            }
        } else if (button.id === '_equal'){
            if (input.value.slice(-1) === multiplySign
                || input.value.slice(-1) === divideSign
                || input.value.slice(-1) === '+'
                || input.value.slice(-1) === '-'
                || input.value.slice(-1) === '.'){
                } else {
                    input.value = output.value;
                    inputHidden.value = output.value;
                }
        }
    })
})

function errorMessage(caller){
    if (caller.children.length === 0) {
        errorP = document.createElement('p');
        errorP.textContent = 'Please perform a valid calculation.';
        errorP.classList.add('error-message');
        caller.appendChild(errorP);

        setTimeout(() => {
            if (caller.children.length !== 0) {
                caller.removeChild(errorP);
            }
        }, 1000);
    } else {

    }
}