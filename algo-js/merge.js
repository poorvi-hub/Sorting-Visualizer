
async function merge(array, low, mid, high) {
    const n1 = mid - low + 1;
    const n2 = high - mid;

    const left = [];
    const right = [];

    for (let i = 0; i < n1; i++) {
        await waitforme(delay);
        array[low + i].style.background = 'orange'; // Color for left array
        left.push(array[low + i].style.height);
    }
    for (let i = 0; i < n2; i++) {
        await waitforme(delay);
        array[mid + 1 + i].style.background = 'yellow'; // Color for right array
        right.push(array[mid + 1 + i].style.height);
    }

    let i = 0, j = 0, k = low;

    while (i < n1 && j < n2) {
        if (stopSorting) {
            currentSortingFunction = () => merge(array, low, mid, high);
            enableContinueButton();
            return;
        }

        await waitforme(delay);

        if (parseInt(left[i]) <= parseInt(right[j])) {
            array[k].style.background = (n1 + n2) === array.length ? 'purple' : 'rgb(229, 73, 229)';
            array[k].style.height = left[i];
            i++;
        } else {
            array[k].style.background = (n1 + n2) === array.length ? 'purple' : 'rgb(229, 73, 229)';
            array[k].style.height = right[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        if (stopSorting) {
            currentSortingFunction = () => merge(array, low, mid, high);
            enableContinueButton();
            return;
        }
        await waitforme(delay);
        array[k].style.background = (n1 + n2) === array.length ? 'purple' : 'rgb(229, 73, 229)';
        array[k].style.height = left[i];
        i++;
        k++;
    }

    while (j < n2) {
        if (stopSorting) {
            currentSortingFunction = () => merge(array, low, mid, high);
            enableContinueButton();
            return;
        }
        await waitforme(delay);
        array[k].style.background = (n1 + n2) === array.length ? 'purple' : 'rgb(229, 73, 229)';
        array[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSortFunc(array, l, r) {
    if (l >= r) return;

    if (stopSorting) {
        currentSortingFunction = () => mergeSortFunc(array, l, r);
        enableContinueButton();
        return;
    }

    const m = l + Math.floor((r - l) / 2);

    await mergeSortFunc(array, l, m);
    await mergeSortFunc(array, m + 1, r);

    if (stopSorting) {
        currentSortingFunction = () => mergeSortFunc(array, l, r);
        enableContinueButton();
        return;
    }

    await merge(array, l, m, r);

    if (stopSorting) {
        currentSortingFunction = () => mergeSortFunc(array, l, r);
        enableContinueButton();
        return;
    }

    if (l === 0 && r === array.length - 1) {
        disableStopButton();
        disableContinueButton();
        currentSortingFunction = null;
    }
}

async function mergeSort(array) {
    stopSorting = false;
    await mergeSortFunc(array, 0, array.length - 1);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener('click', async function () {
    console.log("Merge Sort");
    let array = document.querySelectorAll('.bar');
    stopSorting = false;
    enableStopButton();
    disableSortingBtn();
    disableSizeSliderbtn();
    disableNewArraybtn();
    await mergeSort(array);
    enableSortingBtn();
    enableSizeSliderbtn();
    enableNewArraybtn();
});
