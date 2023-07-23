import { ButtonGroup, ClickAwayListener, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { CodeSharp, FormatQuoteSharp, QuizSharp, TitleSharp } from "@mui/icons-material";
import BlockButton from "./BlockButton";
import classes from "./BlockToggler.module.css";
import { TypesetUtil } from "../../utils/TypesetUtil";
import { useRef, useState } from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";

const HEADING_LEVELS: string[] = ["part", "chapter", "section", "subsection", "subsubsection"];

export default function BlockToggler() {
  const editor: Editor = useSlate();
  const [isTogglingHeading, setIsTogglingHeading] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const onCloseSelectMenuHandler = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    setIsTogglingHeading(false)
  }

  const onToggleSelectMenuHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsTogglingHeading(!isTogglingHeading);
  }

  const onToggleBlockHandler = (event: React.PointerEvent<HTMLButtonElement | HTMLLIElement>,
    level: string) => {
    event.preventDefault()
    TypesetUtil.toggleBlock(editor, "heading", { headingLevel: level });
  }

  return (
    <>
      <ButtonGroup ref={anchorRef} className={classes.blockButtons} orientation="vertical">
        <BlockButton
          blockType="heading"
          onClick={event => onToggleSelectMenuHandler(event)}
          icon={<TitleSharp />}
        />
        <BlockButton blockType="quote" icon={<FormatQuoteSharp />} />
        <BlockButton blockType="code-block" icon={<CodeSharp />} />
        <BlockButton blockType="thm" thmStyle="thm" icon={<i>Thm</i>} />
        <BlockButton blockType="thm" thmStyle="dfn" icon={<strong>Def</strong>} />
        <BlockButton blockType="thm" thmStyle="remark" icon={<i>Rmk</i>} />
        <BlockButton blockType="thm" thmStyle="eg" icon={<strong>E.g.</strong>} />
        <BlockButton blockType="thm" thmStyle="problem" icon={<QuizSharp />} />
      </ButtonGroup>
      <Popper
        style={{
          zIndex: 1,
          top: anchorRef.current?.offsetTop,
          left: anchorRef.current?.offsetLeft! + anchorRef.current?.offsetWidth!
        }}
        open={isTogglingHeading}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
        <ClickAwayListener onClickAway={event => onCloseSelectMenuHandler(event)}>
          <MenuList autoFocusItem>
            {HEADING_LEVELS.map(level => (
              <MenuItem
                key={level}
                onPointerDown={event => onToggleBlockHandler(event, level)}
                onPointerUp={() => TypesetUtil.updateHeadingIndexes(editor)}
              >
                {level}
              </MenuItem>
            ))}
          </MenuList>
        </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  )
}