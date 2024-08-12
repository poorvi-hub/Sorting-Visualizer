
async function findPivot(array, l, r) {
    let i = l - 1;
    array[r].style.background = 'red';

    for (let j = l; j <= r - 1; ++j) {
        array[j].style.background = 'yellow';
        
        await waitforme(delay);
        
        if (stopSorting) {
            currentSortingFunction = () => findPivot(array, l, r);
            enableContinueButton();
            return i;
        }

        if (parseInt(array[j].style.height) < parseInt(array[r].style.height)) {
            ++i;
            swap(array[i], array[j]);
            array[i].style.background = 'orange';
            if (i != j) {
                array[j].style.background = 'orange';
            }
            await waitforme(delay);
        } else {
            array[j].style.background = 'rgb(229, 73, 229)';
        }
    }
    
    ++i;
    await waitforme(delay);
    swap(array[i], array[r]);

    array[r].style.background = 'rgb(229, 73, 229)';
    array[i].style.background = 'purple';

    await waitforme(delay);

    for (let k = 0; k < array.length; ++k) {
        if (array[k].style.background != 'purple') {
            array[k].style.background = 'rgb(229, 73, 229)';
        }
    }
    return i;
}

async function quickSortFunc(array, l, r) {
    if (l < r) {
        let pivot_index = await findPivot(array, l, r);

        if (stopSorting) {
            currentSortingFunction = () => quickSortFunc(array, l, r);
            enableContinueButton();
            return;
        }

        await quickSortFunc(array, l, pivot_index - 1);

        if (stopSorting) {
            currentSortingFunction = () => quickSortFunc(array, l, r);
            enableContinueButton();
            return;
        }

        await quickSortFunc(array, pivot_index + 1, r);
    } else {
        if (l >= 0 && r >= 0 && l < array.length && r < array.length) {
            array[r].style.background = 'purple';
            array[l].style.background = 'purple';
        }
    }
}

async function quickSort(array, l, r) {
    stopSorting = false;
    await quickSortFunc(array, l, r);

    if (stopSorting) {
        currentSortingFunction = () => quickSort(array, l, r);
        enableContinueButton();
        return;
    }
    
    disableStopButton();
    disableContinueButton();
    currentSortingFunction = null;
}

const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener('click', async function () {
    console.log("quick SORT");
    let array = document.querySelectorAll('.bar');
    let l = 0;
    let r = array.length - 1;
    stopSorting = false;
    enableStopButton();
    disableSortingBtn();
    disableSizeSliderbtn();
    disableNewArraybtn();
    await quickSort(array, l, r);
    enableSortingBtn();
    enableNewArraybtn();
    enableSizeSliderbtn();
});
