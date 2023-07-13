import { css } from "@emotion/css";
import { Box, Button, List, ListItem, TextField } from "@mui/material";
import { Coordinates, LaTeX, Mafs, Plot, Text, Theme } from "mafs";
import "mafs/core.css";
import "./Mafs.css";
import evaluatex from "evaluatex/dist/evaluatex";
import { useState } from "react";
import { nanoid } from "nanoid";
import Function from "../Function";
import { ComputeEngine } from "@cortex-js/compute-engine";
import { Utilities } from "../../utils/Utilities";
import { AddSharp } from "@mui/icons-material";
import { MathJax } from "better-react-mathjax";
import "katex/dist/katex.min.css";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

export interface FuncObj {
  id: string;
  def: string;
  fx: boolean;
}

interface GraphMakerProps {
  onClose: () => void;
}

export const PLOT_COLOURS: string[] = [
  Theme.foreground,
  Theme.blue,
  Theme.green,
  Theme.indigo,
  Theme.orange,
  Theme.pink,
  Theme.red,
  Theme.violet,
  Theme.yellow
]

export default function GraphMaker(props: GraphMakerProps) {
  const editor: Editor = useSlate();
  const [funcObjects, setFuncObjects] = useState<FuncObj[]>([{ id: nanoid(), def: "", fx: true }]);

  const onChangeFuncHandler = (index: number, value: string) => {
    const updatedFuncObjects: FuncObj[] = [...funcObjects];
    updatedFuncObjects[index] = {
      ...updatedFuncObjects[index],
      def: value,
    };
    setFuncObjects(updatedFuncObjects);
  }

  const onFlipVarHandler = (index: number) => {
    const updatedFuncObjects: FuncObj[] = [...funcObjects];
    updatedFuncObjects[index] = {
      ...updatedFuncObjects[index],
      fx: !updatedFuncObjects[index].fx
    };
    setFuncObjects(updatedFuncObjects);
  }

  const onInsertPlotHandler = () => {
    Transforms.insertNodes(editor, {
      id: nanoid(),
      type: "func-plot",
      functions: funcObjects,
      children: [{ text: "" }]
    });
    props.onClose();
  }

  return (
    <Box>
      <Box
        id="func-configure"
        className={css`
          margin-bottom: 1em;
          text-align: left;
        `}
      >
        <List>
          {funcObjects.map((func, index) => <Function
            key={func.id}
            sub={index}
            f={func}
            onChange={(value: string) => onChangeFuncHandler(index, value)}
            onFlipVar={() => onFlipVarHandler(index)}
          />)}
        </List>
        {funcObjects.length < 9 ? <Button variant="outlined">
          <AddSharp onClick={() => setFuncObjects(funcObjects
            .concat([{ id: nanoid(), def: "", fx: true }]))} />
        </Button> : null}
      </Box>
      <Mafs
        width="auto"
        height={200}
        zoom
      >
        <Coordinates.Cartesian />
        {funcObjects.map((func, index) => func.fx
          ? <Plot.OfX
            key={func.id}
            y={xVar => Utilities.evaluate(func.def, xVar, "x")}
            color={PLOT_COLOURS[index]}
          />
          : <Plot.OfY
            key={func.id}
            x={yVar => Utilities.evaluate(func.def, yVar, "y")}
            color={PLOT_COLOURS[index]}
          />
        )}
      </Mafs>
      <Button onClick={onInsertPlotHandler}>Insert Plot</Button>
    </Box>
  )
}