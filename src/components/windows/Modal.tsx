import { Box, Modal as MuiModal } from "@mui/material";
import classes from "./Modal.module.css";
import { MathJaxContext } from "better-react-mathjax";
import { mathjaxConfig } from "../../config/MathJax";

interface ModalProps {
  children: JSX.Element | (JSX.Element | null)[];
  open: boolean;
  transparent?: true;
  onClose: () => void;
}

export default function Modal(props: ModalProps): JSX.Element {
  return (
    <MuiModal
      slotProps={{
        backdrop: {
          invisible: props.transparent ? true : false
        }
      }}
      sx={{opacity: props.transparent ? "0" : "1"}}
      open={props.open}
      onClose={props.onClose}
    >
      <Box className={classes.box}>
        {props.children}
      </Box>
    </MuiModal>
  );
}