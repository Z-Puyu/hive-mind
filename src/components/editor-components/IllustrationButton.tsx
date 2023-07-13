import { css } from "@emotion/css";
import { AddToPhotosSharp } from "@mui/icons-material";
import { useState } from "react";
import IllustrationMaker from "../windows/IllustrationMaker";
import { Editor } from "slate";
import { useSlate } from "slate-react";

export default function IllustrationButton() {
  const editor: Editor = useSlate();
  const [isAddingIllustration, setIsAddingIllustration] = useState<boolean>(false);

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isAddingIllustration) {
      event.preventDefault();
      setIsAddingIllustration(true);
    }
  }

  return (
    <span
      className={css`
        cursor: pointer;
        color: rgb(83, 60, 27);
        margin-right: 0.25em;
      `}
      onPointerDown={onPointerDownHandler}
    >
      <IllustrationMaker 
        isOpen={isAddingIllustration} 
        onClose={() => setIsAddingIllustration(false)}
      />
      <AddToPhotosSharp />
    </span>
  );
};