import { Box, Modal as MuiModal } from "@mui/material";
import classes from "./Modal.module.css";
import { MathJaxContext } from "better-react-mathjax";
import { mathjaxConfig } from "../../config/MathJax";

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  onClose: () => void;
}

export default function Modal(props: ModalProps): JSX.Element {
  return (
    <MuiModal
      open={props.open}
      onClose={props.onClose}
    >
      <Box className={classes.box}>
        {props.children}
      </Box>
    </MuiModal>
  );
}