
async function selectionSortFunc(start = 0) {
    const array1 = document.querySelectorAll(".bar"); // array1 is a NodeList of all elements with the class ".bar". These elements represent the bars in a visual sorting representation.
    stopSorting = false;
    enableStopButton();

    for (let i = start; i < array1.length; i++) {
        if (stopSorting) {
            currentSortingFunction = () => selectionSortFunc(i);
            disableStopButton();
            return;
        }

        let min_index = i; // For each iteration, i represents the current position where the smallest element will be placed.
        array1[i].style.background = 'blue'; // The current element is highlighted blue.

        // The inner loop searches for the smallest element in the unsorted portion of the array. 
        for (let j = i + 1; j < array1.length; j++) {
            if (stopSorting) {
                currentSortingFunction = () => selectionSortFunc(i);
                disableStopButton();
                return;
            }

            array1[j].style.background = 'rgb(116, 0, 225)'; // Each element being compared is colored purple.

            await waitforme(delay);

            if (parseInt(array1[j].style.height) < parseInt(array1[min_index].style.height)) {
                // If an element smaller than the current minimum is found, it updates the min_index. 
                if (min_index !== i) {
                    // If min_index was changed from its initial value, the previous minimum element is recolored pink.
                    array1[min_index].style.background = 'rgb(229, 73, 229)'; // pink
                }
                min_index = j; // updated
            } else {
                array1[j].style.background = 'rgb(229, 73, 229)'; // Elements not selected as the new minimum are recolored pink after comparison.
            }
        }
        await waitforme(delay);
        // After finding the minimum element in the unsorted portion, the function swaps it with the element at position i.
        swap(array1[min_index], array1[i]);
        array1[min_index].style.background = 'rgb(229, 73, 229)'; // The element at min_index (after being swapped) is recolored pink,
        array1[i].style.background = 'purple'; // and the element at i (now in its correct position) is colored purple.
    }
    disableStopButton();
    disableContinueButton();
    currentSortingFunction = null;
}

const selectionSortButton = document.querySelector('.selectionSort');
selectionSortButton.addEventListener('click', async function () {
    console.log("selection SORT");
    disableSortingBtn();
    disableSizeSliderbtn();
    disableNewArraybtn();
    await selectionSortFunc();
    enableSortingBtn();
    enableSizeSliderbtn();
    enableNewArraybtn();
});