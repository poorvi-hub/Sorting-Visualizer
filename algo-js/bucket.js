async function insertionSort(bucket) {
    for (let i = 1; i < bucket.length; i++) {
        let key = bucket[i];
        let j = i - 1;

        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j = j - 1;
        }
        bucket[j + 1] = key;
    }
}

async function bucketSort(array) {
    stopSorting = false;
    enableStopButton();
    disableSortingBtn();
    disableSizeSliderbtn();
    disableNewArraybtn();

    let n = array.length;
    if (n <= 0) return;

    // Find the max and min heights
    let max = parseInt(array[0].style.height);
    let min = parseInt(array[0].style.height);
    for (let i = 1; i < n; i++) {
        if (parseInt(array[i].style.height) > max) {
            max = parseInt(array[i].style.height);
        }
        if (parseInt(array[i].style.height) < min) {
            min = parseInt(array[i].style.height);
        }
    }

    // Determine the number of buckets
    let bucketCount = Math.floor((max - min) / n) + 1;
    let buckets = Array.from({ length: bucketCount }, () => []);

    // Color bars for initial state
    for (let i = 0; i < n; i++) {
        if (stopSorting) {
            currentSortingFunction = () => bucketSort(array);
            enableContinueButton();
            return;
        }
        array[i].style.background = 'yellow';
        await waitforme(delay);
    }

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        if (stopSorting) {
            currentSortingFunction = () => bucketSort(array);
            enableContinueButton();
            return;
        }
        let bucketIndex = Math.floor((parseInt(array[i].style.height) - min) / n);
        if (bucketIndex >= 0 && bucketIndex < bucketCount) {
            buckets[bucketIndex].push(parseInt(array[i].style.height));
            array[i].style.background = 'orange'; // Color change for assignment to buckets
            await waitforme(delay);
        }
    }

    // Sort individual buckets and update array
    let index = 0;
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length > 0) {
            await insertionSort(buckets[i]);
            for (let j = 0; j < buckets[i].length; j++) {
                if (stopSorting) {
                    currentSortingFunction = () => bucketSort(array);
                    enableContinueButton();
                    return;
                }
                array[index].style.height = buckets[i][j] + "px";
                array[index].style.background = 'green'; // Color change for sorted buckets
                await waitforme(delay);
                index++;
            }
        }
    }

    // Final sorted color
    for (let i = 0; i < n; i++) {
        if (stopSorting) {
            currentSortingFunction = () => bucketSort(array);
            enableContinueButton();
            return;
        }
        array[i].style.background = 'purple';
        await waitforme(delay);
    }

    disableStopButton();
    disableContinueButton();
    enableSortingBtn();
    enableSizeSliderbtn();
    enableNewArraybtn();
    currentSortingFunction = null;
}

const bucketSortbtn = document.querySelector(".bucketSort");
bucketSortbtn.addEventListener('click', async function () {
    console.log("Bucket sort");
    let array = document.querySelectorAll('.bar');
    await bucketSort(array);
});
