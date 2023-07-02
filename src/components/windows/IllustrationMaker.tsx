import MatrixMaker from "./MatirxMaker";
import Modal from "./Modal";

interface IllustrationMakerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IllustrationMaker(props: IllustrationMakerProps) {
  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <MatrixMaker />
    </Modal>
  )
}