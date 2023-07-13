import Bookmark from "./blocks/Bookmark";
import { RenderElementProps } from "slate-react";
import { FuncPlotElem, ThmElem } from "../../utils/CustomSlateTypes";
import CodeBlock from "./blocks/CodeBlock";
import Command from "./blocks/Command";
import Definition from "./blocks/Definition";
import Heading from "./blocks/Heading";
import Quote from "./blocks/Quote";
import Remark from "./blocks/Remark";
import TeXBox from "./blocks/TeXBox";
import Theorem from "./blocks/Theorem";
import Link from "./blocks/Link";
import Math from "./blocks/Math";
import Example from "./blocks/Example";
import Problem from "./blocks/Problem";
import Solution from "./blocks/Solution";
import { Mafs, Coordinates, Plot } from "mafs";
import "mafs/core.css";
import "../windows/Mafs.css";
import { Utilities } from "../../utils/Utilities";
import { PLOT_COLOURS } from "../windows/GraphMaker";
import classes from "./DynElem.module.css";

export default function DynElem(props: RenderElementProps): JSX.Element {
  switch (props.element.type) {
    case "code-block":
      return <CodeBlock {...props} />;
    case "math":
      return <Math {...props} />;
    case "link":
      return <Link {...props} />;
    case "quote":
      return <Quote {...props} />;
    case "heading":
      return <Heading {...props} />;
    case "cmd":
      return <Command {...props} />;
    case "bookmark":
      return <Bookmark {...props} />;
    case "thm":
      switch ((props.element as ThmElem).style) {
        case "dfn":
          return <Definition {...props} />;
        case "remark":
          return <Remark {...props} />;
        case "eg":
          return <Example {...props} />;
        case "problem":
          return <Problem {...props} />;
        case "thm":
        default:
          return <Theorem {...props} />;
      }
    case "soln":
      return <Solution {...props} />;
    case "func-plot":
      return (
        <Mafs
          width="auto"
          height={200}
          zoom
        >
          <Coordinates.Cartesian />
          {(props.element as FuncPlotElem).functions.map((func, index) => func.fx
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
          {props.children}
        </Mafs>
      )
    default: // Paragraph
      return <TeXBox {...props} />;
  }
};