
let currentHeapSize = 0;

// Function to swap elements
function swap(el1, el2) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

// Function to heapify a subtree rooted at index `i`
async function heapify(array, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && parseInt(array[left].style.height) > parseInt(array[largest].style.height)) {
        largest = left;
    }

    if (right < n && parseInt(array[right].style.height) > parseInt(array[largest].style.height)) {
        largest = right;
    }

    if (largest !== i) {
        if (stopSorting) {
            currentSortingFunction = () => heapify(array, n, i);
            enableContinueButton();
            return;
        }

        swap(array[i], array[largest]);
        array[i].style.background = 'orange';
        array[largest].style.background = 'orange';
        await waitforme(delay);

        array[i].style.background = 'rgb(229, 73, 229)';
        array[largest].style.background = 'rgb(229, 73, 229)';

        await heapify(array, n, largest);
    }
}

// Function to build a max heap
async function buildHeap(array) {
    currentHeapSize = array.length;

    for (let i = Math.floor(currentHeapSize / 2) - 1; i >= 0; i--) {
        if (stopSorting) {
            currentSortingFunction = () => buildHeap(array);
            enableContinueButton();
            return;
        }

        await heapify(array, currentHeapSize, i);
    }
}

// Heap Sort function
async function heapSort(array) {
    await buildHeap(array);

    for (let i = array.length - 1; i >= 0; i--) {
        if (stopSorting) {
            currentSortingFunction = () => heapSort(array);
            enableContinueButton();
            return;
        }

        swap(array[0], array[i]);
        array[i].style.background = 'purple';

        currentHeapSize--;
        await heapify(array, currentHeapSize, 0);
    }

    for (let k = 0; k < array.length; k++) {
        array[k].style.background = 'purple';
    }

    disableStopButton();
    disableContinueButton();
    currentSortingFunction = null;
}

// Event listener for Heap Sort button
const heapSortbtn = document.querySelector(".heapSort");
heapSortbtn.addEventListener('click', async function () {
    console.log("heap SORT");
    let array = document.querySelectorAll('.bar');
    stopSorting = false;
    enableStopButton();
    disableSortingBtn();
    disableSizeSliderbtn();
    disableNewArraybtn();
    await heapSort(array);
    enableSortingBtn();
    enableSizeSliderbtn();
    enableNewArraybtn();
});
