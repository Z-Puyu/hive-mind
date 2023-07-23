import { BoxedExpression, ComputeEngine } from "@cortex-js/compute-engine";

type MathExpression = number | string | MathExpression[];

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
  },

  toNumber: (value: string) => {
    const result: number = Number(value);
    return Number.isNaN(result) ? 0 : result;
  },

  substitute: (val: number | string, x: string, expr: MathExpression | MathExpression[]) => {
    let f: MathExpression | MathExpression[] = JSON.parse(JSON.stringify(expr));
    if (!Array.isArray(f)) {
      // f is either a constant or a single variable.
      switch (f) {
        case "\\pi":
          return Math.PI;
        case "e":
          return Math.E;
        case "\\infty":
          return Math.min();
        case "-\\infty":
          return Math.max();
        default:
          break;
      }
      switch (val) {
        case "\\pi":
          val = Math.PI;
          break;
        case "e":
          val = Math.E;
          break;
        case "\\infty":
          val = Math.min();
          break;
        case "-\\infty":
          val = Math.max();
          break;
        default:
          break;
      }
      return f === x ? val : f;
    }
    for (let i: number = 0; i < f.length; i += 1) {
      f[i] = Utilities.substitute(val, x, f[i]);
    }
    return f;
  },

  evaluate: (f: string, x: number | string, varName: string) => {
    const ce: ComputeEngine = new ComputeEngine();
    const mathJSON: BoxedExpression = ce.parse(f);
    let stringExpr: string = mathJSON.valueOf() as string;
    if (stringExpr[0] !== '[') {
      return ce.box(Utilities.substitute(x, varName, stringExpr)).N().valueOf() as number;
    }
    const expr: MathExpression | MathExpression[] = JSON.parse(stringExpr);
    return ce.box(Utilities.substitute(x, varName, expr)).N().valueOf() as number;
  },

  evaluateExactly: (f: string, x: number | string, varName: string) => {
    const ce: ComputeEngine = new ComputeEngine();
    const mathJSON: BoxedExpression = ce.parse(f);
    let stringExpr: string = mathJSON.valueOf() as string;
    if (stringExpr[0] !== '[') {
      stringExpr = "[ " + stringExpr + "]";
    }
    const expr: MathExpression | MathExpression[] = JSON.parse(stringExpr);
    return ce.box(Utilities.substitute(x, varName, expr)).evaluate().json;
  },

  romanise: (num: number) => {
    let result: string = "";
    while (num > 0) {
      if (num >= 1000) {
        result += "M";
        num -= 1000;
      } else if (num >= 500) {
        if (num >= 900) {
          result += "CM";
          num -= 900;
        } else {
          result += "D";
          num -= 500;
        }
      } else if (num >= 100) {
        if (num >= 400) {
          result += "CD";
          num -= 400;
        } else {
          result += "C";
          num -= 100;
        }
      } else if (num >= 50) {
        if (num >= 90) {
          result += "XC";
          num -= 90;
        } else {
          result += "L";
          num -= 50;
        }
      } else if (num >= 10) {
        if (num >= 40) {
          result += "XL";
          num -= 40;
        } else {
          result += "X";
          num -= 10;
        }
      } else if (num >= 5) {
        if (num >= 9) {
          result += "IX";
          num -= 9;
        } else {
          result += "V";
          num -= 5;
        }
      } else {
        if (num >= 4) {
          result += "IV";
          num -= 4;
        } else {
          result += "I";
          num -= 1;
        }
      }
    }
    return result;
  },
};