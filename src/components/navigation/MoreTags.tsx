import { css } from "@emotion/css";
import { Portal, Card } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useRef } from "react";
import MiniTag from "./MiniTag";

interface MoreTagsProps {
  anchor: HTMLElement | null;
  tagList: DocumentData[];
}

export default function MoreTags(props: MoreTagsProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  console.log(props.tagList)

  return (
    <Portal container={document.body}>
      <Card
        ref={cardRef}
        sx={{
          backgroundColor: "aliceblue",
        }}
        className={css`
          display: flex;
          flex-direction: column;
          width: fit-content;
          position: absolute;
          padding: 0.5em 0.5em 0.5em 0;
          top: ${props.anchor?.getBoundingClientRect().top! - 40}px;
          left: ${props.anchor?.getBoundingClientRect().left! - 20}px;
        `}
        
      >
        {props.tagList.map(tag => <MiniTag colour={tag.tagColour.value} name={tag.tagName}/>)}
      </Card>
    </Portal>
  )
}