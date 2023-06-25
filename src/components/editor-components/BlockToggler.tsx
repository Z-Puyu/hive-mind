import { Editor } from "slate";
import { useSlate } from "slate-react";
import VerticalToolbar from "../../interface/VerticalToolbar";
import { Card, Portal } from "@mui/material";
import { CodeSharp, FormatQuoteSharp, TitleSharp } from "@mui/icons-material";
import BlockButton from "./BlockButton";
import classes from "./BlockToggler.module.css";

export default function BlockToggler() {
  return (
    <Portal>
      <Card className={classes.blockButtons}>
        <VerticalToolbar>
          <BlockButton blockType="heading" icon={<TitleSharp />} />
          <BlockButton blockType="quote" icon={<FormatQuoteSharp />} />
          <BlockButton blockType="code-block" icon={<CodeSharp />} />
          <BlockButton blockType="thm" thmStyle="thm" icon={<i>Thm</i>} />
          <BlockButton blockType="thm" thmStyle="dfn" icon={<strong>Def</strong>} />
          <BlockButton blockType="thm" thmStyle="remark" icon={<i>Rmk</i>} />
        </VerticalToolbar>
      </Card>
    </Portal>
  )
}