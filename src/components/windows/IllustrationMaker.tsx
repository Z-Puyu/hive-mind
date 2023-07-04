import { useState } from "react";
import MatrixMaker from "./MatirxMaker";
import Modal from "./Modal";
import { css } from "@emotion/css";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import GraphMaker from "./GraphMaker";

interface IllustrationMakerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IllustrationMaker(props: IllustrationMakerProps) {
  const [illustrationType, setIllustrationType] = useState<string>("");
  let configPanel: JSX.Element | null = null;

  switch (illustrationType) {
    case "Matrix":
      configPanel = <MatrixMaker onClose={props.onClose} />;
      break;
    case "Function Plot":
      configPanel = <GraphMaker onClose={props.onClose} />;
      break;
    default:
      break;
  };

  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <FormControl
        margin="normal"
        className={css`
          width: fit-content;
        `}
      >
        <InputLabel>Illustration Type</InputLabel>
        <Select
          className={css`
            height: 2.5em; 
            min-width: 8em;
            margin-right: 1em
          `}
          value={illustrationType}
          label="Illustration Type"
          onChange={event => setIllustrationType(event.target.value)}
        >
          <MenuItem value="Matrix">Matrix</MenuItem>
          <MenuItem value="Function Plot">Function Plot</MenuItem>
        </Select>
      </FormControl>
      {configPanel}
    </Modal>
  )
}