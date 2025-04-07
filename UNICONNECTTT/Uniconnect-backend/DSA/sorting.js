function mergeSort(arr, comparator = (a, b) => a - b) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), comparator);
    const right = mergeSort(arr.slice(mid), comparator);

    return merge(left, right, comparator);
}

function merge(left, right, comparator) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (comparator(left[i], right[j]) <= 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

module.exports = { mergeSort };
