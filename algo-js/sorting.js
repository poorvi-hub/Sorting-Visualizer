
//Swaps the heights of two elements to visually represent swapping during sorting.
function swap(element1, element2){
    let temp = element1.style.height;
    element1.style.height = element2.style.height;
    element2.style.height = temp;
}

// Initialize global variables
let stopSorting = false;//stopSorting: A boolean flag to indicate whether the sorting process should stop.
let continueSorting = false;//continueSorting: A boolean flag to indicate whether the sorting process should continue after stopping.
let currentSortingFunction = null;//currentSortingFunction: A variable to hold the reference to the currently executing sorting function, which is necessary for resuming the sorting process.
let delay = 280; //delay is a variable that holds the initial delay value (280 milliseconds) between each step of the sorting algorithm. This delay controls the speed of the visualization.


let arraySize = document.querySelector("#sizeInput");//This line selects the input element with the ID sizeInput from the DOM and assigns it to the variable arraySize.
//This line adds an event listener to the arraySize element that listens for a click event.
//When the element is clicked, it logs the current value of the input (arraySize.value) and its type (typeof(arraySize.value)) to the console.
arraySize.addEventListener('click', function(){
    console.log(arraySize.value, typeof(arraySize.value));
});

// Function to adjust sorting delay based on user input
// sortingSpeed selects the input element with the ID speedInput from the DOM. This element is expected to be a range slider or similar input used to control the speed of the sorting visualization.
let sortingSpeed = document.querySelector('#speedInput') ;
//addEventListener('input', function() {...}): Adds an event listener that listens for the input event on the sortingSpeed element. The input event fires every time the value of the input changes, providing real-time feedback.
sortingSpeed.addEventListener('click', function () {
    console.log(sortingSpeed.value, typeof (sortingSpeed.value));
    //delay = 320 - parseInt(sortingSpeed.value): Adjusts the delay variable based on the current value of the sortingSpeed input. Here's how it works:
    // sortingSpeed.value retrieves the current value of the input as a string.
   // parseInt(sortingSpeed.value) converts this string value to an integer.
   // 320 - parseInt(sortingSpeed.value) calculates the new delay. The higher the value of sortingSpeed, the shorter the delay, making the sorting visualization faster. Conversely, the lower the value of sortingSpeed, the longer the delay, making the sorting visualization slower.
    delay = 320 - parseInt(sortingSpeed.value);
});

// ---buttons--------

function disableSortingBtn(){
    // The disableSortingBtn function disables all the sorting buttons on the webpage by setting their disabled property to true.
    document.querySelector(".bubbleSort").disabled =true;//document.querySelector(".bubbleSort"): Selects the element with the class bubbleSort from the DOM.
    document.querySelector(".insertionSort").disabled =true; 
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
    document.querySelector(".heapSort").disabled = true;
    document.querySelector(".bucketSort").disabled = true;
}

function enableSortingBtn() {
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
    document.querySelector(".heapSort").disabled = false;
    document.querySelector(".bucketSort").disabled = false;
}

function disableSizeSliderbtn(){
    document.querySelector("#sizeInput").disabled =true ;
}

function enableSizeSliderbtn() {
    document.querySelector("#sizeInput").disabled = false;
}

function disableNewArraybtn() {
    document.querySelector("#newArrayGen").disabled = true;
}

function enableNewArraybtn() {
    document.querySelector("#newArrayGen").disabled = false;
}

//These two functions, enableButton and disableButton, are utility functions designed to enable or disable buttons in a web application by manipulating their properties and classes.
function enableButton(button) {
    button.disabled = false;//This line sets the disabled property of the button to false, which makes the button clickable and interactable.
    button.classList.add('enabled');//This line adds the CSS class enabled to the button. This can be used to apply specific styles to enabled buttons, such as changing their appearance to indicate that they are active and can be interacted with.
}

function disableButton(button) {
    button.disabled = true;
    button.classList.remove('enabled');//This line removes the CSS class enabled from the button. This can be used to revert the button’s appearance to indicate that it is inactive and cannot be interacted with.
}


// ------------function buttons-------------

//following functions enable or disable the respective buttons using helper functions enableButton and disableButton.
function enableStopButton() {
    const button = document.querySelector("#stopSort");
    enableButton(button);
}

function disableStopButton() {
    const button = document.querySelector("#stopSort");
    disableButton(button);
}

function enableContinueButton() {
    const button = document.querySelector("#continueSort");
    enableButton(button);
}

function disableContinueButton() {
    const button = document.querySelector("#continueSort");
    disableButton(button);
}

function enableResetButton() {
    const button = document.querySelector("#resetSort");
    enableButton(button);
}

function disableResetButton() {
    const button = document.querySelector("#resetSort");
    disableButton(button);
}

//This event listener enables the reset button as soon as the page is loaded.
document.addEventListener("DOMContentLoaded", function() {
    enableResetButton();
});

//When the stop button is clicked:
//stopSorting is set to true to stop the sorting process.
//The stop button is disabled, and the continue button is enabled.
const stopSortButton = document.querySelector("#stopSort");
stopSortButton.addEventListener("click", function() {
    console.log("Stop button clicked");
    stopSorting = true;
    disableStopButton();
    enableContinueButton();
});

//When the continue button is clicked:
//If currentSortingFunction is defined, it sets continueSorting to true.
//The continue button is disabled, and the stop button is enabled.
//The sorting process is resumed by calling await currentSortingFunction().
const continueSortButton = document.querySelector("#continueSort");
continueSortButton.addEventListener("click", async function() {
    if (currentSortingFunction) {
        console.log("continue button clicked");
        stopSorting = false;
        disableContinueButton();
        enableStopButton();
        await currentSortingFunction();//Uses the await keyword to resume the execution of currentSortingFunction. Since currentSortingFunction is expected to be an asynchronous function, await ensures that the event listener waits for the sorting function to complete before continuing.
    }
});

//When the reset button is clicked:
//stopSorting is set to true to stop any ongoing sorting.
//continueSorting is set to false.
//Re-enables sorting-related UI elements (sorting buttons, size slider, new array button).
//Disables the stop and continue buttons.
//Calls createNewArray(arraySize.value) to create a new array with the current size.
const resetSortButton = document.querySelector("#resetSort");
resetSortButton.addEventListener("click", function() {
    console.log("Reset button clicked");
    stopSorting = true; // Stop any ongoing sorting
    continueSorting = false;
    enableSortingBtn();
    enableSizeSliderbtn();
    enableNewArraybtn();
    disableStopButton();
    disableContinueButton();
    createNewArray(arraySize.value);//create random size array
});



//The waitforme function creates a delay for a specified number of milliseconds. This is useful in asynchronous code where you want to pause execution for a certain amount of time, such as when creating visualizations for sorting algorithms.
async function waitforme(milisec) {//Declares an asynchronous function named waitforme that takes a single parameter milisec, which represents the number of milliseconds to wait.
    return new Promise(resolve => {//Returns a new Promise object. Promises are used to handle asynchronous operations in JavaScript.
        setTimeout(() => {//he setTimeout function is used to create a delay. It takes a callback function and a delay in milliseconds (milisec).
            resolve('');//After the specified delay (milisec), the callback function is executed, which calls resolve(''). This resolves the Promise, allowing the waitforme function to continue its execution after the delay.
        }, milisec);
    });
}


createNewArray();//This line calls the createNewArray function, which will execute immediately upon loading.
//The createNewArray function generates a new array of random values and visualizes them as bars in a container element on a webpage.
function createNewArray(newArraySize = 10){ //This line declares the function createNewArray with an optional parameter newArraySize which defaults to 10 if no argument is provided. This parameter determines the number of elements in the new array.
    // Deleting the existing array
    deleteArray() ;
    
    //Creating a new array in JS
    newArray = [];
    for(let i = 0;i < newArraySize; ++i){
        newArray.push(Math.floor(Math.random()*250)+1); //Fills the array with random values between 1 and 250.
    }
    console.log(newArray); 
    
    //Adding this array to html
    const array = document.querySelector("#array") ;//const array = document.querySelector("#array");: Selects the container element with the ID array from the DOM.
    for(let i = 0; i < newArraySize; ++i){//Iterates over the array to create and style div elements representing each value.
        const bar = document.createElement("div") ;//Creates a new div element.
        bar.style.height = 2 * newArray[i] + "px"; //Sets the height of the div based on the array value, multiplied by 2 for visual scaling.
        //Adds CSS classes to the div for styling purposes
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add('barNo${i}');//barNo${i} (note the corrected template literal syntax for dynamic class names).
        //Appends the div to the array container in the DOM, thereby visualizing each array element as a bar.
        array.appendChild(bar);
    }
}

function deleteArray(){
    const array = document.querySelector("#array");//const array = document.querySelector("#array");: This line selects the container element with the ID array from the DOM.
    array.innerHTML = "";// This line sets the inner HTML of the selected container to an empty string, effectively removing all child elements (i.e., any previously generated bars) from the container.
}

const newArrayGen = document.querySelector("#newArrayGen");
newArrayGen.addEventListener("click", function(){
    enableSortingBtn();
    enableSizeSliderbtn();
    createNewArray(arraySize.value);
})
