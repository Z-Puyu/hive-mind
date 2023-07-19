import classes from "./BlockSelection.module.css";
import ModalOverlay from "../../interface/ModalOverlay";
import { css } from "@emotion/css";
import SelectMenu from "../../interface/SelectMenu";
import VerticalList from "../../interface/VerticalList";
import { Coords } from "../../utils/UtilityInterfaces";

interface BlockSelectionProps {
  pos: Coords;
  items: { [key: string]: string }[];
  currSelection: { [key: string]: string };
  onSelect: (item: { [key: string]: string }) => void;
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function BlockSelection(props: BlockSelectionProps): JSX.Element {
  return (
    <>
      <SelectMenu position={props.pos}>
        <VerticalList>
          {props.items.map(
            (item, key) => {
              const isSelected: boolean = (item.name === props.currSelection.name);
              return (
                <div
                  className={isSelected ? classes.selected : classes.unselected}
                  key={key}
                  role="button"
                  tabIndex={0}
                  onClick={() => props.onSelect(item)}
                >
                  {item.name}
                </div>
              )
            }
          )}
        </VerticalList>
      </SelectMenu>
    </>
  );
};