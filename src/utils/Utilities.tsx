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
  },

  transpose: (matrix: any[][], nRows?: number, nCols?: number) => {
    if (!nRows) {
      nRows = matrix.length;
    }
    if (!nCols) {
      nCols = Math.max(...Array.from(matrix.values()).map(elem => elem.length));
    }
    const originalMatrix: string[][] = JSON.parse(JSON.stringify(matrix));
    let updatedMatrix: string[][] = JSON.parse(JSON.stringify(matrix));
    if (nRows < nCols) {
      updatedMatrix = updatedMatrix.map(row => row.slice(0, nRows))
        .concat(Utilities.generate2DArray(nCols - nRows, nRows, " "));
    } else if (nRows > nCols) {
      updatedMatrix = updatedMatrix.map(row => row.concat(" "
        .repeat(nRows! - nCols!).split(""))).slice(0, nCols);
    }
    for (let i: number = 0; i < nCols; i += 1) {
      for (let j: number = 0; j < nRows; j += 1) {
        updatedMatrix[i][j] = originalMatrix[j][i];
      }
    }
    return updatedMatrix;
  }
}