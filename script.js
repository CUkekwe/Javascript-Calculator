const input = document.getElementById('input');
const number = document.querySelectorAll('.numbers div');
const operator = document.querySelectorAll('.operators div');
const result = document.getElementById('result'); //equal button
const clear = document.getElementById('clear');
let resultDisplayed = false; //toggle to determine whether the input or result is displayed

//click handlers for each of the number buttons
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function (e) {
        //storing current input string and its last character as variables to be used later
        let currentString = input.innerHTML
        let lastChar = currentString[currentString.length - 1];

        //if resultDisplayed = false; just keep adding

        if (resultDisplayed == false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            //if result is currently displayed and user pressed a number
            //we need to clear the string and add the new input to start the new operation
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;

        }

    });
}

//adding click handlers to operator buttons
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function (e) {
        //storing current input string and its last character 
        let currentString = input.innerHTML
        let lastChar = currentString[currentString.length - 1];

        //if last character entered is an operator, replaced it with the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            //if first key pressed is an operator pressed, do nothing
            console.log('enter a number first');
        } else {
            // else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }

    });

}

//on click of 'equal' button
result.addEventListener('click', function () {

    //this is the string that we will be calculating
    let inputString = input.innerHTML;

    //forming an array of numbers
    let numbers = inputString.split(/\+|\-|\×|\÷/g);

    //forming an array of operators
    //first we replace all the numbers and dot with empty strying and then split
    let operators = inputString.replace(/[0-9]|\./g, "").split("");


})

