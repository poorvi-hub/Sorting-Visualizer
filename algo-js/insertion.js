async function insertionSortFunc(){
    const array1 = document.querySelectorAll(".bar") ;
    // array1 is a NodeList of all elements with the class ".bar". These elements represent the bars in a visual sorting representation.
    stopSorting = false;
    enableStopButton();


   // The first bar is initially highlighted white, indicating that it is considered sorted.
    array1[0].style.background = 'white';

    // The outer loop iterates from the second element to the end of the array, treating the first element as already sorted.
    for(let i = 1; i < array1.length; i++){
        if (stopSorting) {
            currentSortingFunction = () => insertionSortFunc(i);
            disableStopButton();
            return;
        }
       
        let = j = i - 1; //j is set to the index before i
        let key = array1[i].style.height;//key stores the height of the current bar that will be compared
        array1[i].style.background = 'blue';//The current bar is highlighted blue to indicate it is the key being inserted.

        await waitforme(delay);//Introduces a delay to make the sorting process visible.

        //The inner loop compares the key with each element in the sorted portion, moving elements one position to the right to make space for the key.
        while(j >= 0 && (parseInt(array1[j].style.height) > parseInt(key))){
            if (stopSorting) {
                currentSortingFunction = () => insertionSortFunc(i);
                disableStopButton();
                return;
            }
            array1[j].style.background = "rgb(116, 0, 225)";//Bars being compared are colored purple.
            array1[j + 1].style.height = array1[j].style.height;//placed to thier right pos
            j--;

            await waitforme(delay);

            for(let k = i; k >= 0; k--){
                array1[k].style.background = 'rgb(229, 73, 229)';//pink all elements from i to the start are recolored pink to indicate their current state.
            }
        }

        array1[j + 1].style.height = key; //The key is inserted into its correct position.
        array1[i].style.background = 'rgb(229, 73, 229)';//The current bar is recolored pink after insertion.
    }
    disableStopButton();
    disableContinueButton();
    currentSortingFunction = null;
}
// Selects the button element with class ".bubbleSort".
const insertionSortButton = document.querySelector('.insertionSort');

insertionSortButton.addEventListener('click', async function () {
    console.log("insertion SORT");
    // Adds a click event listener to the bubble sort button. When clicked, the following actions occur:

//  1. Disables sorting buttons, size slider, and new array button to prevent interference during sorting.
    disableSortingBtn();
    disableSizeSliderbtn();
    disableNewArraybtn();
// 2. Calls the bubbleSortFunc function and waits for it to complete.
    await insertionSortFunc();
//3. Re-enables the UI elements after sorting is done.
    enableSortingBtn();
    enableSizeSliderbtn();
    enableNewArraybtn();
})
