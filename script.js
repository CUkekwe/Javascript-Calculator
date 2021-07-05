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
    let numbers = inputString.split(/\+|\-|\×|\÷/g);   //what is this strange syntax? Why does it work?

    //forming an array of operators
    //first we replace all the numbers and dot with empty strying and then split
    let operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("------------------------");

    //now we are looping through the array and doing one operation at a time.
    //first divide, multiply, then subtraction and then addition
    //as we move we are alternating the original numbers and operators array
    //the final element remaining in the array will be the output

    let divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    let multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    let subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    let add = operators.indexOf("+");
    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; //displays the output

    resultDisplayed = true; //turning off the the flag if the result is displayed

});


//clearing the input on press of clear
clear.addEventListener("click", function () {
    input.innerHTML = "";
})

