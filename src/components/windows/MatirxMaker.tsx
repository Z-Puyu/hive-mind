import { Box, Select, TextField } from "@mui/material";
import Modal from "./Modal";
import { useState } from "react";
import { MathJax } from "better-react-mathjax";
import { css } from "@emotion/css";
import { Utilities } from "../../utils/Utilities";

export default function MatrixMaker() {
  const [nCols, setNCols] = useState<number>(3);
  const [nRows, setNRows] = useState<number>(3);
  const [delimiters, setDelimiters] = useState<string>("pmatrix");
  const [matrixData, setMatrixData] = useState<string[][]>(Utilities.generate2DArray(3, 3, " "));
  const [mathJax, setMathJax] = useState<string>(
    "  &   &   \\" + "\\" + "\n" + 
    "  &   &   \\" + "\\" + "\n" + 
    "  &   &   \\" + "\\" + "\n"
  );

  const updateMatrixData = (i: number, j: number, data: string) => {
    const updatedData: string[][] = matrixData;
    console.log(updatedData[i][j])
    updatedData[i][j] = data;
    setMatrixData(updatedData);
    setMathJax(updatedData.map(row => row.join(" & ")).join("\\" + "\\" + "\n"));
  }

  const setNRowsHandler = (n: string) => {
    if (n === "") {
      n = "0";
    }
    const newNRows: number = parseInt(n);
    if (newNRows !== nRows) {
      const currData: string[][] = matrixData;
      let updatedData: string[][] = currData;
      if (newNRows < nRows) {
        updatedData = currData.splice(newNRows, nRows - newNRows);
      } else if (newNRows > nRows) {
        const emptyMatrix: string[][] = Utilities.generate2DArray(newNRows - nRows, nCols, " ");
        updatedData = currData.concat(emptyMatrix);
      }
      setMatrixData(updatedData);
      setMathJax(updatedData.map(row => row.join(" & ")).join(" \\" + "\\" + "\n"));
      setNRows(newNRows);
    }
  }

  const setNColsHandler = (n: string) => {
    if (n === "") {
      n = "0";
    }
    const newNCols: number = parseInt(n);
    if (newNCols !== nCols) {
      let updatedData: string[][] = matrixData;
      if (newNCols < nCols) {
        updatedData = matrixData.map(row => row.splice(newNCols, nCols - newNCols));
      } else if (newNCols > nCols) {
        updatedData = matrixData.map(row => row.concat(" "));
      }
      setMatrixData(updatedData);
      setMathJax(updatedData.map(row => row.join(" & ")).join(" \\" + "\\" + "\n"));
      setNCols(newNCols);
    }
  }

  return (
    <Box>
      <TextField
        variant="outlined"
        label="No. Rows"
        defaultValue="3"
        fullWidth
        margin="normal"
        onChange={event => setNRowsHandler(event.target.value)}
      />
      <TextField
        variant="outlined"
        label="No. Cols"
        defaultValue="3"
        fullWidth
        margin="normal"
        onChange={event => setNColsHandler(event.target.value)}
      />
      <Select>

      </Select>
      {Utilities.generate2DArray(nRows, nCols, null)
        .map((x, i) => <div>{x.map((y, j) => <input
          className={css`width: 20px`}
          onChange={event => updateMatrixData(i, j, event.target.value)}
        />)}</div>)}
      <Box>
        <MathJax dynamic>
          {"\\[\n\\begin{" + delimiters + "}" + mathJax + "\\end{" + delimiters + "}\n\\]"}
        </MathJax>
      </Box>
    </Box>
  )
}