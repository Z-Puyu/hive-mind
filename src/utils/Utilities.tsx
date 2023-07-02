export const Utilities = {
  generate2DArray: (nRows: number, nCols: number, item: any) => {
    type arrayElement = typeof item;
    let array: arrayElement[][] = [];
    for (let i = 0; i < nRows; i += 1) {
      let currRow: arrayElement[] = [];
      for (let j = 0; j < nCols; j += 1) {
        const seed: arrayElement = item;
        currRow.push(seed);
      }
      array.push(currRow);
    }
    return array;
  }
}