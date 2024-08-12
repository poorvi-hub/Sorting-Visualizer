async function bubbleSortFunc(){
    const array1 = document.querySelectorAll(".bar") ;
    // array1 is a NodeList of all elements with the class ".bar". These elements represent the bars in a visual sorting representation.
    stopSorting = false; // Reset the flag when sorting starts
    enableStopButton(); 
    for(let i = 0; i < array1.length - 1; ++i){
          //The inner loop goes through the array, comparing and swapping elements. It runs fewer times with each iteration of the outer loop since the largest elements "bubble up" to their correct positions.
        for(let j = 0; j < array1.length - i - 1; ++j){
            //Check Stop Flag: if (stopSorting) { ... return; }
           //If the stopSorting flag is set, it stores the current state and exits, allowing for the process to be resumed later.
            if (stopSorting) {
                currentSortingFunction = () => bubbleSortFunc(i);
                disableStopButton();
                return;
            }
            //Bars being compared are colored purple.
            array1[j].style.background= "rgb(116, 0, 225)";//purple
            array1[j+1].style.background= "rgb(116, 0, 225)";

            // If the height of the j-th bar is greater than the height of the j+1-th bar, a wait function (waitforme) introduces a delay, then the swap function swaps their positions.
            if(parseInt(array1[j].style.height) > parseInt(array1[j+1].style.height)){
                await waitforme(delay) ;
                swap(array1[j], array1[j+1]) ;
            }

           //After comparison (and possible swap), bars revert to pink.
            array1[j].style.background ='rgb(229, 73, 229)';
            array1[j+1].style.background = 'rgb(229, 73, 229)';
        }
        
        //The bar that is in its final position after each outer loop iteration is colored purp
        array1[array1.length-1-i].style.background = 'purple' ;
    }    
    //Once sorting is complete, the first element is also highlighted purple.
    array1[0].style.background = 'purple' ;
    disableStopButton();
    disableContinueButton();
    currentSortingFunction = null;
}

// Selects the button element with class ".bubbleSort".
const bubbleSortButton = document.querySelector('.bubbleSort');

bubbleSortButton.addEventListener('click', async function () {
    // Adds a click event listener to the bubble sort button. When clicked, the following actions occur:
console.log("BUBLE SORT");
//  1. Disables sorting buttons, size slider, and new array button to prevent interference during sorting.
    disableSortingBtn();
    disableSizeSliderbtn();
    disableNewArraybtn();
// 2. Calls the bubbleSortFunc function and waits for it to complete.
    await bubbleSortFunc();
//3. Re-enables the UI elements after sorting is done.
    enableSortingBtn();
    enableSizeSliderbtn();
    enableNewArraybtn();
})
