import { 
  Box, 
  Button, 
  ButtonGroup, 
  Divider, 
  FormControl, 
  FormControlLabel, 
  FormGroup, 
  InputLabel, 
  MenuItem, 
  Select, 
  Switch, 
} from "@mui/material";
import { useRef, useState } from "react";
import { MathJax } from "better-react-mathjax";
import { css } from "@emotion/css";
import { Utilities } from "../../utils/Utilities";
import { nanoid } from "nanoid";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { TypesetUtil } from "../../utils/TypesetUtil";

const SPECIAL_BUTTONS = [
  {
    id: "matrix-identity",
    display: "$\\mathbfit{I}$",
  },
  {
    id: "matrix-zero",
    display: "$\\mathbf{0}$"
  },
  {
    id: "matrix-diagonal",
    display: "Diagonal"
  },
  {
    id: "matrix-uptri",
    display: "Upper-$\\triangle$"
  },
  {
    id: "matrix-lowertri",
    display: "Lower-$\\triangle$"
  },
  {
    id: "matrix-trans",
    display: "$\\mathbfit{M}^{\\mathrm{T}}$"
  }
]

const transcribe = (data: string[][]) => data.map(row => row.map(str => str.trim()).join(" & "));

interface MatrixMakerProps {
  onClose: () => void;
}

export default function MatrixMaker(props: MatrixMakerProps) {
  const editor: Editor = useSlate();
  const [nCols, setNCols] = useState<number>(3);
  const [nRows, setNRows] = useState<number>(3);
  const [delimiters, setDelimiters] = useState<[string, string]>(["(", ")"]);
  const [delimiterName, setDelimiterName] = useState<string>("Parentheses")
  const [matrixData, setMatrixData] = useState<string[][]>(Utilities.generate2DArray(3, 3, ""));
  const [mathJax, setMathJax] = useState<string[]>([" &  & ", " &  & ", " &  & "]);
  const [nColsSec, setNColsSec] = useState<number>(1);
  const [matrixDataSec, setMatrixDataSec] = useState<string[][]>(Utilities
    .generate2DArray(3, 1, " "));
  const [mathJaxSec, setMathJaxSec] = useState<string[]>(["", "", ""]);
  const [isAugmented, setIsAugmented] = useState<boolean>(false);

  const texRef: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const updateMatrixData = (i: number, j: number, data: string, which?: "Secondary") => {
    if (which === "Secondary") {
      const updatedData: string[][] = JSON.parse(JSON.stringify(matrixDataSec));
      updatedData[i][j] = data;
      setMatrixDataSec(updatedData);
      setMathJaxSec(transcribe(updatedData));
    } else {
      const updatedData: string[][] = JSON.parse(JSON.stringify(matrixData));
      updatedData[i][j] = data;
      setMatrixData(updatedData);
      setMathJax(transcribe(updatedData));
    }
  }

  const setNRowsHandler = (n: string) => {
    if (n === "") {
      n = "0";
    }
    const newNRows: number = parseInt(n);
    if (newNRows !== nRows) {
      const currData: string[][] = JSON.parse(JSON.stringify(matrixData));
      const currDataSec: string[][] = JSON.parse(JSON.stringify(matrixDataSec));
      let updatedData: string[][] = currData;
      let updatedDataSec: string[][] = currDataSec;
      if (newNRows < nRows) {
        updatedData = updatedData.slice(0, newNRows);
        updatedDataSec = updatedDataSec.slice(0, newNRows);
      } else if (newNRows > nRows) {
        const empty: string[][] = Utilities.generate2DArray(newNRows - nRows, nCols, "");
        const emptySec: string[][] = Utilities.generate2DArray(newNRows - nRows, nColsSec, "");
        updatedData = updatedData.concat(empty);
        updatedDataSec = updatedDataSec.concat(emptySec)
      }
      setMatrixData(updatedData);
      setMathJax(transcribe(updatedData));
      setMatrixDataSec(updatedDataSec);
      setMathJaxSec(transcribe(updatedDataSec));
      setNRows(newNRows);
    }
  }

  const setNColsHandler = (n: string, which?: "Secondary") => {
    if (n === "") {
      n = "0";
    }
    const newNCols: number = parseInt(n);
    if (which === "Secondary") {
      if (newNCols !== nColsSec) {
        let updatedData: string[][] = JSON.parse(JSON.stringify(matrixDataSec));
        if (newNCols < nColsSec) {
          updatedData = updatedData.map(row => row.slice(0, newNCols));
        } else if (newNCols > nColsSec) {
          updatedData = updatedData.map(row => row.concat(" ".repeat(newNCols - nColsSec).split("")));
        }
        setMatrixDataSec(updatedData);
        setMathJaxSec(transcribe(updatedData));
        setNColsSec(newNCols);
      }
    } else {
      if (newNCols !== nCols) {
        let updatedData: string[][] = JSON.parse(JSON.stringify(matrixData));
        if (newNCols < nCols) {
          updatedData = updatedData.map(row => row.slice(0, newNCols));
        } else if (newNCols > nCols) {
          updatedData = updatedData.map(row => row.concat(" ".repeat(newNCols - nCols).split("")));
        }
        setMatrixData(updatedData);
        setMathJax(transcribe(updatedData));
        setNCols(newNCols);
      }
    }
  }

  const onChangeDelimitersHandler = (str: string) => {
    setDelimiterName(str);
    switch (str) {
      case "Modulus":
        setDelimiters(["|", "|"]);
        break;
      case "Square brackets":
        setDelimiters(["[", "]"]);
        break;
      case "Norm":
        setDelimiters(["\\lVert", "\\rVert"]);
        break;
      case "Parentheses":
      default:
        setDelimiters(["(", ")"]);
        break;
    }
  }

  const onSetSpecialMatrixHandler = (type: string, which: "Primary" | "Secondary") => {
    if (which === "Primary") {
      let updatedMatrixData: string[][] = JSON.parse(JSON.stringify(matrixData));
      switch (type) {
        case "matrix-identity":
          for (let i: number = 0; i < nRows; i += 1) {
            for (let j: number = 0; j < nCols; j += 1) {
              updatedMatrixData[i][j] = i === j ? "1" : "0";
            }
          }

          break;
        case "matrix-zero":
          for (let i: number = 0; i < nRows; i += 1) {
            for (let j: number = 0; j < nCols; j += 1) {
              updatedMatrixData[i][j] = "0";
            }
          }
          break;
        case "matrix-diagonal":
          for (let i: number = 0; i < nRows; i += 1) {
            for (let j: number = 0; j < nCols; j += 1) {
              if (i !== j) {
                updatedMatrixData[i][j] = "0";
              }
            }
          }
          break;
        case "matrix-uptri":
          for (let i: number = 0; i < nRows; i += 1) {
            for (let j: number = 0; j < i; j += 1) {
              updatedMatrixData[i][j] = "0";
            }
          }
          break;
        case "matrix-lowertri":
          for (let i: number = 0; i < nRows; i += 1) {
            for (let j: number = i + 1; j < nCols; j += 1) {
              updatedMatrixData[i][j] = "0";
            }
          }
          break;
        case "matrix-trans":
          updatedMatrixData = Utilities.transpose(matrixData, nRows, nCols);
          /* const originalMatrix: string[][] = JSON.parse(JSON.stringify(matrixData));
          if (nRows < nCols) {
            updatedMatrixData = updatedMatrixData.map(row => row.slice(0, nRows))
              .concat(Utilities.generate2DArray(nCols - nRows, nRows, " "));
          } else if (nRows > nCols) {
            updatedMatrixData = updatedMatrixData.map(row => row.concat(" "
              .repeat(nRows - nCols).split(""))).slice(0, nCols);
          }
          for (let i: number = 0; i < nCols; i += 1) {
            for (let j: number = 0; j < nRows; j += 1) {
              updatedMatrixData[i][j] = originalMatrix[j][i];
            }
          } */
          const temp: number = nRows;
          setNRows(nCols);
          setNCols(temp);
          break;
        default:
          break;
      }
      setMatrixData(updatedMatrixData);
      setMathJax(transcribe(updatedMatrixData));
    }
  }

  const onInsertLaTeXHandler = () => {
    if (TypesetUtil.isInlineActive(editor, "math")) {
      Transforms.insertText(editor, texRef.current?.innerText!);
    } else {
      Transforms.insertNodes(editor, {
        id: nanoid(),
        type: "math",
        inline: false,
        environment: "equation*",
        children: [{ text: texRef.current?.innerText! }]
      });
    }
    props.onClose();
  }

  return (
    <Box>
      <Box
        className={css`
          margin: auto;
          width: fit-content;
        `}
      >
        <FormGroup row className={css`width: fit-content`}>
          <FormControl
            margin="normal"
            className={css`
            width: fit-content;
          `}
          >
            <InputLabel>Delimiters</InputLabel>
            <Select
              className={css`height: 2.5em; margin-right: 1em`}
              value={delimiterName}
              label="Delimiters"
              onChange={event => onChangeDelimitersHandler(event.target.value)}
            >
              <MenuItem value="Parentheses">Parentheses</MenuItem>
              <MenuItem value="Square brackets">Square brackets</MenuItem>
              <MenuItem value="Modulus">Modulus</MenuItem>
              <MenuItem value="Norm">Norm</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch onClick={() => setIsAugmented(!isAugmented)} />}
            label="Augmented"
          />
        </FormGroup>
      </Box>
      <Box
        className={css`
          display: flex;
          margin: 0 auto;
          width: fit-content;
        `}
      >
        <Box id="main-matrix-creation">
          <Box
            id="matrix-size-main"
            className={css`
            margin: 1em auto;
          `}
          >
            <input
              className={css`
              width: 2.5em;
            `}
              defaultValue="3"
              onChange={event => setNRowsHandler(event.target.value)}
            />
            <MathJax inline>
              $\times$
            </MathJax>
            <input
              className={css`
              width: 2.5em;
            `}
              defaultValue="3"
              onChange={event => setNColsHandler(event.target.value)}
            />
          </Box>
          <Box
            id="matrix-config-main"
            className={css`
            display: flex;
            align-items: center;
            width: fit-content;
          `}
          >
            <ButtonGroup orientation="vertical">
              {SPECIAL_BUTTONS.map(button => <Button
                key={button.id}
                id={button.id}
                sx={{
                  fontFamily: "times",
                  textTransform: "none",
                  padding: "0 0.25em",
                }}
                onClick={() => onSetSpecialMatrixHandler(button.id, "Primary")}
                disabled={button.id !== "matrix-zero"
                  && (isAugmented || button.id !== "matrix-trans")
                  && nCols !== nRows}
              >
                <MathJax inline>
                  {button.display}
                </MathJax>
              </Button>)}
            </ButtonGroup>
            <Box className={css`margin-right: 0.25em;`}>
              {Utilities.generate2DArray(nRows, nCols, null)
                .map((x, i) => <div key={"input-row-" + i}>{x.map((y, j) => <input
                  key={"input-row-" + i + "col-" + j}
                  id={"input-row-" + i + "col-" + j}
                  className={css`
                    width: 20px;
                    margin: 0.25em;
                  `}
                  value={matrixData[i][j]}
                  onChange={event => updateMatrixData(i, j, event.target.value)}
                />)}</div>)}
            </Box>
          </Box>
        </Box>
        {isAugmented ? <>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              border: "1px dashed black"
            }}
          />
          <Box id="sec-matrix-creation">
            <Box
              id="matrix-size-sec"
              className={css`
                margin: 1em auto;
              `}
            >
              <input
                className={css`
                  width: 2.5em;
                `}
                defaultValue={nColsSec}
                onChange={event => setNColsHandler(event.target.value, "Secondary")}
              />
              <span> columns</span>
            </Box>
            <Box
              id="matrix-config-sec"
              className={css`
                margin: 0 auto;
                display: flex;
                align-items: center;
                width: fit-content;
            `}
            >
              <Box className={css`margin-left: 0.25em`}>
                {Utilities.generate2DArray(nRows, nColsSec, null)
                  .map((x, i) => <div key={"input-row-" + i + "-sec"}>
                    {x.map((y, j) => <input
                      key={"input-row-sec-" + i + "col-" + j}
                      id={"input-row-sec-" + i + "col-" + j}
                      className={css`
                        width: 20px;
                        margin: 0.25em;
                      `}
                      value={matrixDataSec[i][j]}
                      onChange={event => updateMatrixData(i, j, event.target.value, "Secondary")}
                    />)}
                  </div>)
                }
              </Box>
              <ButtonGroup orientation="vertical">
                {SPECIAL_BUTTONS.map(button => <Button
                  key={button.id + "-sec"}
                  id={button.id + "-sec"}
                  sx={{
                    fontFamily: "times",
                    textTransform: "none",
                    padding: "0 0.25em",
                  }}
                  onClick={() => onSetSpecialMatrixHandler(button.id, "Secondary")}
                  disabled={button.id !== "matrix-zero" && nColsSec !== nRows}
                >
                  <MathJax inline>
                    {button.display}
                  </MathJax>
                </Button>)}
              </ButtonGroup>
            </Box>
          </Box>
        </> : null}
      </Box>
      <Box
        id="matrix-display"
        className={css`
            display: flex;
            align-items: center;
            width: fit-content;
            margin: 0.5em auto;
          `}
      >
        <pre
          className={css`
              margin: 0 0.5em;
              height: 100%;
              padding: 0.5em 0.5em;
              background: rgba(192, 192, 192, 0.25);
              border-radius: 0.5em;
              text-align: left;
              &:hover {
                background-color: rgba(192, 192, 192, 0.5);
                transition: background-color 0.5s;
              }
            `}
        >
          <code ref={texRef}>
            {"\\left" + delimiters[0] + "\\begin{array}{" + "c".repeat(nCols) +
              (isAugmented ? "|" + "c".repeat(nColsSec) : "") + "}\n" +
              (isAugmented
                ? mathJax.map((str, index) => str + " & " + mathJaxSec[index]).join(" \\" + "\\" + "\n")
                : mathJax.join(" \\" + "\\" + "\n")) +
              "\n" + "\\end{array}\\right" + delimiters[1]}
          </code>
        </pre>
        <MathJax dynamic>
          {"\\[\n" +
            "\\left" + delimiters[0] + "\\begin{array}{" + "c".repeat(nCols) +
            (isAugmented ? ("|" + "c".repeat(nColsSec)) : "") + "}\n" +
            (isAugmented
              ? mathJax.map((str, index) => str + " & " + mathJaxSec[index]).join(" \\" + "\\" + "\n")
              : mathJax.join(" \\" + "\\" + "\n")) +
            "\n" + "\\end{array}\\right" + delimiters[1] + "\n" +
            "\\]"}
        </MathJax>
      </Box>
      <Button onClick={onInsertLaTeXHandler}>Insert as LaTeX</Button>
    </Box>
  )
}