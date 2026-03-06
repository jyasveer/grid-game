const generateRandomNumberArray = (
  arrayDimension: number,
): (number | undefined)[] => {
  const randomArray = [];
  const totalItems = arrayDimension * arrayDimension;
  for (let i = 0; i < totalItems; i++) {
    if (i === totalItems - 1) continue;
    randomArray.push(totalItems - i);
  }
  return randomArray;
};

// 9, 8, 7, 6, 5, 4, 3, 2

const getRandomValue = (array: (number | undefined)[]) => {
  const available = array
    .map((v, i) => (v !== undefined ? i : -1))
    .filter((i) => i !== -1);
  if (available.length === 0) return undefined;
  const randomIndex = available[Math.floor(Math.random() * available.length)];
  const value = array[randomIndex];
  array[randomIndex] = undefined;
  return value;
};

export const generate2DArray = (
  rows: number,
  cols: number,
): (number | undefined)[][] => {
  const array: (number | undefined)[][] = [];
  const randomArray = generateRandomNumberArray(rows);
  for (let i = 0; i < rows; i++) {
    const row: (number | undefined)[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(getRandomValue(randomArray)); // Initialize with 0 or any default value
    }
    array.push(row);
  }
  return array;
};

export const checkAdjacentCellsAndReturnIfEmpty = (
  rowIndexToCheck: number,
  colIndexToCheck: number,
  valueToSwitch: number | undefined,
  array: (number | undefined)[][],
): (number | undefined)[][] => {
  const neighbors = [
    [rowIndexToCheck - 1, colIndexToCheck], // up
    [rowIndexToCheck + 1, colIndexToCheck], // down
    [rowIndexToCheck, colIndexToCheck - 1], // left
    [rowIndexToCheck, colIndexToCheck + 1], // right
    [rowIndexToCheck - 1, colIndexToCheck - 1], // top-left
    [rowIndexToCheck - 1, colIndexToCheck + 1], // top-right
    [rowIndexToCheck + 1, colIndexToCheck - 1], // bottom-left
    [rowIndexToCheck + 1, colIndexToCheck + 1], // bottom-right
  ];

  for (const [r, c] of neighbors) {
    if (r < 0 || r >= array.length || c < 0 || c >= array[0].length) continue;
    if (!array[r][c]) {
      const newArray = array.map((row) => [...row]);
      newArray[r][c] = valueToSwitch;
      newArray[rowIndexToCheck][colIndexToCheck] = undefined;
      console.log(checkIfGameIsComplete([...newArray]));
      return newArray;
    }
  }

  return array;
};

export const checkIfGameIsComplete = (
  array: (number | undefined)[][],
): boolean => {
  const flat = array.flat();
  if (flat[flat.length - 1] !== undefined) return false;
  for (let i = 0; i < flat.length - 2; i++) {
    if ((flat[i] as number) > (flat[i + 1] as number)) return false;
  }
  return true;
};
