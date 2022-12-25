// Function to find a false value inside 2D array
export const findFalseValue = (array: boolean[][]): boolean => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === false) {
                return true;
            }
        }
    }
    return false;
}