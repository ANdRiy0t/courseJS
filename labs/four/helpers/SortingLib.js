/**
 * @namespace SortingLib
 * @description A library for sorting numeric JS arrays using various algorithms.
 */
const SortingLib = {
    /**
     * @summary Constant representing one assignment operation.
     * @constant {number}
     */
    MOVE_SINGLE: 1,

    /**
     * @summary Constant representing the index offset used in calculations.
     * @constant {number}
     */
    INDEX_OFFSET: 1,
    
    /**
     * @summary Constant representing a swap operation, which counts as three moves.
     * @constant {number}
     */
    MOVE_SWAP: 3,

    /**
     * @summary Checks if the provided array is sparse.
     * @param {Array} arrayForSorting - The array to check.
     * @returns {boolean} Returns true if the array is sparse, otherwise false.
     */
    checkSparse: function(arrayForSorting) {
        for (let index = 0; index < arrayForSorting.length; index++) {
            if (!(index in arrayForSorting)) {
                console.warn(`Warning: the array is sparse, element at index ${index} is missing.`);
                return true;
            }
        }
        return false;
    },

    /**
     * @summary Sorts an array using the bubble sort (exchange sort) algorithm.
     * @param {Array} arrayForSorting - The array to be sorted.
     * @param {boolean} [ascending=true] - True for ascending sort, false for descending.
     * @returns {Array} The sorted array.
     */
    bubbleSort: function(arrayForSorting, ascending = true) {
        let array = arrayForSorting.slice();
        let compCount = 0, moveCount = 0;
        this.checkSparse(array);

        for (let firstIndex = 0; firstIndex < array.length - this.INDEX_OFFSET; firstIndex++) {
            for (let secondIndex = 0; secondIndex < array.length - this.INDEX_OFFSET - firstIndex; secondIndex++) {
                compCount++;
                if ((ascending && array[secondIndex] > array[secondIndex + this.INDEX_OFFSET]) ||
                    (!ascending && array[secondIndex] < array[secondIndex + this.INDEX_OFFSET])) {
                    let savedSecondValue = array[secondIndex];
                    array[secondIndex] = array[secondIndex + this.INDEX_OFFSET];
                    array[secondIndex + this.INDEX_OFFSET] = savedSecondValue;
                    moveCount += this.MOVE_SWAP;
                }
            }
        }
        console.log(`Bubble Sort: comparisons = ${compCount}, moves = ${moveCount}`);
        return array;
    },

    /**
     * @summary Sorts an array using the selection sort (minimal element sort) algorithm.
     * @param {Array} arrayForSorting - The array to be sorted.
     * @param {boolean} [ascending=true] - True for ascending sort, false for descending.
     * @returns {Array} The sorted array.
     */
    selectionSort: function(arrayForSorting, ascending = true) {
        let array = arrayForSorting.slice();
        let compCount = 0, moveCount = 0;
        this.checkSparse(array);

        for (let firstIndex = 0; firstIndex < array.length - this.INDEX_OFFSET; firstIndex++) {
            let targetIndex = firstIndex;
            for (let secondIndex = firstIndex + this.INDEX_OFFSET; secondIndex < array.length; secondIndex++) {
                compCount++;
                if ((ascending && array[secondIndex] < array[targetIndex]) ||
                    (!ascending && array[secondIndex] > array[targetIndex])) {
                    targetIndex = secondIndex;
                }
            }
            if (targetIndex !== firstIndex) {
                let savedValueForSwap = array[firstIndex];
                array[firstIndex] = array[targetIndex];
                array[targetIndex] = savedValueForSwap;
                moveCount += this.MOVE_SWAP;
            }
        }
        console.log(`Selection Sort: comparisons = ${compCount}, moves = ${moveCount}`);
        return array;
    },

    /**
     * @summary Sorts an array using the insertion sort algorithm.
     * @param {Array} arrayForSorting - The array to be sorted.
     * @param {boolean} [ascending=true] - True for ascending sort, false for descending.
     * @returns {Array} The sorted array.
     */
    insertionSort: function(arrayForSorting, ascending = true) {
        let array = arrayForSorting.slice();
        let compCount = 0, moveCount = 0;
        this.checkSparse(array);

        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            moveCount += this.MOVE_SINGLE;
            let j = i - 1;
            while (j >= 0) {
                compCount++;
                if ((ascending && array[j] > key) ||
                    (!ascending && array[j] < key)) {
                    array[j + this.INDEX_OFFSET] = array[j];
                    moveCount += this.MOVE_SINGLE;
                    j--;
                } else {
                    break;
                }
            }
            array[j + this.INDEX_OFFSET] = key;
            moveCount += this.MOVE_SINGLE;
        }
        console.log(`Insertion Sort: comparisons = ${compCount}, moves = ${moveCount}`);
        return array;
    },

    /**
     * @summary Sorts an array using the Shell sort algorithm.
     * @param {Array} arrayForSorting - The array to be sorted.
     * @param {boolean} [ascending=true] - True for ascending sort, false for descending.
     * @returns {Array} The sorted array.
     */
    shellSort: function(arrayForSorting, ascending = true) {
        let array = arrayForSorting.slice();
        let compCount = 0, moveCount = 0;
        this.checkSparse(array);
        let arrayLength = array.length;
        for (let gap = Math.floor(arrayLength / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < arrayLength; i++) {
                let temp = array[i];
                moveCount += this.MOVE_SINGLE;
                let j = i;
                while (j >= gap) {
                    compCount++;
                    if ((ascending && array[j - gap] > temp) ||
                        (!ascending && array[j - gap] < temp)) {
                        array[j] = array[j - gap];
                        moveCount += this.MOVE_SINGLE;
                        j -= gap;
                    } else {
                        break;
                    }
                }
                array[j] = temp;
                moveCount += this.MOVE_SINGLE;
            }
        }
        console.log(`Shell Sort: comparisons = ${compCount}, moves = ${moveCount}`);
        return array;
    },

    /**
     * @summary Partitions the array segment for the quick sort algorithm.
     * @param {Array} arraySegment - The segment of the array to partition.
     * @param {number} leftIndex - The left index of the segment.
     * @param {number} rightIndex - The right index of the segment.
     * @param {boolean} ascending - True for ascending sort, false for descending.
     * @param {Object} counters - An object tracking the number of comparisons and moves.
     * @returns {number} The pivot index after partitioning.
     */
    quickSortPartition: function(arraySegment, leftIndex, rightIndex, ascending, counters) {
        let pivotElement = arraySegment[rightIndex];
        counters.moveCount += this.MOVE_SINGLE;
        let boundaryIndex = leftIndex - this.INDEX_OFFSET;
        for (let currentIndex = leftIndex; currentIndex < rightIndex; currentIndex++) {
            counters.compCount++;
            if ((ascending && arraySegment[currentIndex] <= pivotElement) ||
                (!ascending && arraySegment[currentIndex] >= pivotElement)) {
                boundaryIndex++;
                let savedElement = arraySegment[boundaryIndex];
                arraySegment[boundaryIndex] = arraySegment[currentIndex];
                arraySegment[currentIndex] = savedElement;
                counters.moveCount += this.MOVE_SWAP;
            }
        }
        let savedPivot = arraySegment[boundaryIndex + this.INDEX_OFFSET];
        arraySegment[boundaryIndex + this.INDEX_OFFSET] = arraySegment[rightIndex];
        arraySegment[rightIndex] = savedPivot;
        counters.moveCount += this.MOVE_SWAP;
        return boundaryIndex + this.INDEX_OFFSET;
    },

    /**
     * @summary Recursively sorts the array segment using the quick sort algorithm.
     * @param {Array} arraySegment - The segment of the array to sort.
     * @param {number} leftIndex - The left index of the segment.
     * @param {number} rightIndex - The right index of the segment.
     * @param {boolean} ascending - True for ascending sort, false for descending.
     * @param {Object} counters - An object tracking the number of comparisons and moves.
     */
    quickSortRecursive: function(arraySegment, leftIndex, rightIndex, ascending, counters) {
        if (leftIndex < rightIndex) {
            let pivotIndex = this.quickSortPartition(arraySegment, leftIndex, rightIndex, ascending, counters);
            this.quickSortRecursive(arraySegment, leftIndex, pivotIndex - this.INDEX_OFFSET, ascending, counters);
            this.quickSortRecursive(arraySegment, pivotIndex + this.INDEX_OFFSET, rightIndex, ascending, counters);
        }
    },

    /**
     * @summary Sorts an array using the quick sort algorithm.
     * @param {Array} arrayForSorting - The array to be sorted.
     * @param {boolean} [ascending=true] - True for ascending sort, false for descending.
     * @returns {Array} The sorted array.
     */
    quickSort: function(arrayForSorting, ascending = true) {
        let array = arrayForSorting.slice();
        let counters = { compCount: 0, moveCount: 0 };
        this.checkSparse(array);
        this.quickSortRecursive(array, 0, array.length - this.INDEX_OFFSET, ascending, counters);
        console.log(`Quick Sort: comparisons = ${counters.compCount}, moves = ${counters.moveCount}`);
        return array;
    }
};
