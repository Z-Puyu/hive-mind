import { css } from "@emotion/css";
import { Box } from "@mui/material";
import { Coordinates, Mafs } from "mafs";
import "mafs/core.css";
import "./Mafs.css";

interface GraphMakerProps {
  onClose: () => void;
}

export default function GraphMaker(props: GraphMakerProps) {
  return (
      <Mafs
        width="auto"
        height={200}
        zoom
      >
        <Coordinates.Cartesian />
      </Mafs>
  )
}