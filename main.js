const merge = (leftSkyline, rightSkyline) => {

    let mergedSkyline = [];
    let [leftPointer, rightPointer] = [0, 0];
    let [leftHeight, rightHeight] = [0, 0];
    let mergedX = 0;

    while (leftPointer < leftSkyline.length && rightPointer < rightSkyline.length) {
        let leftEdge = leftSkyline[leftPointer];
        let rightEdge = rightSkyline[rightPointer];

        let leftX = leftEdge[0];
        let leftY = leftEdge[1];

        let rightX = rightEdge[0];
        let rightY = rightEdge[1];

        if (leftX < rightX) {
            mergedX = leftX;
            leftHeight = leftY;

            leftPointer += 1;
        } else if (leftX > rightX) {
            mergedX = rightX;
            rightHeight = rightY;

            rightPointer += 1;
        } else {
            mergedX = leftX;
            leftHeight = leftY;
            rightHeight = rightY;

            leftPointer += 1;
            rightPointer += 1;
        }

        const height = Math.max(leftHeight, rightHeight);

        if (mergedSkyline.length === 0 || height !== mergedSkyline[mergedSkyline.length - 1][1]) {
            const newPoint = [mergedX, height];
            mergedSkyline.push(newPoint);
        }
    }

    const remainingElements = [];

    while (leftPointer < leftSkyline.length) {
        remainingElements.push(leftSkyline[leftPointer]);
        leftPointer += 1;
    }

    while (rightPointer < rightSkyline.length) {
        remainingElements.push(rightSkyline[rightPointer]);
        rightPointer += 1;
    }

    mergedSkyline.push(...remainingElements);

    return mergedSkyline;
};

const getSkyline = (b, left = 0, right = b.length - 1) => {
    if (left > right) return [];

    if (left === right) {
        const startX = b[left][0];
        const startY = b[left][2];

        const endX = b[left][1];
        const endY = 0;

        return [[startX, startY], [endX, endY]];
    }

    const mid = left + Math.floor((right - left) / 2);

    const leftHalf = getSkyline(b, left, mid);
    const rightHalf = getSkyline(b, mid + 1, right);

    const merged = merge(leftHalf, rightHalf);

    console.log(merged);
    return merged;
};

getSkyline([[2, 9, 10], [9, 12, 15]]);