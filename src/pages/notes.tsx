//import { useState, useEffect } from "react";
import "../App.css";
//import uid from "../utils/uid";
import Block from "../components/block";
import { useSelector } from "react-redux";
import { updateBlock, addBlock, deleteBlock } from "../features/note"
//import type { RootState } from "../index"


// export interface BlockItem {
//   id: string;
//   html: string;
// }

// export interface BlockData {
//   id: string;
//   ref: HTMLElement | null;
// }

export default function Notes(): JSX.Element {
  // const initBlock: BlockItem = {
  //   id: uid(),
  //   html: "This is the initial block, press Enter to type in a new block."
  // };

  // const initBlockData: BlockData = {
  //   id: uid(),
  //   ref: null,
  // }

  //Controls the states of both Blocks(An array of BlockItems) and currBlockData(An object of BlockData)
  // const [currBlockData, setCurrBlockData] = useState<BlockData | undefined>(undefined);
  // const [Blocks, setBlocks] = useState<BlockItem[]>([initBlock]);

  //When currBlockData state is modified, the function is called. 
  // useEffect(() => {
  //   (currBlockData?.ref?.nextElementSibling as HTMLElement)?.focus()
  // }, [currBlockData]);

  // const updateBlockHandler = (updatedBlock: BlockItem) => {
  //   const currBlockList: BlockItem[] = Blocks;
  //   const updatedBlockIndex: number = currBlockList.map(blk => blk.id).indexOf(updatedBlock.id);
  //   const updatedBlocks: BlockItem[] = [...Blocks];
  //   updatedBlocks[updatedBlockIndex] = {
  //     ...updatedBlocks[updatedBlockIndex],
  //     html: updatedBlock.html,
  //   };
  //   console.log(updatedBlocks); 
  //   setBlocks(updatedBlocks);
  // }

  // const addBlockHandler = (currBlock: BlockData) => {
  //   const currBlockList: BlockItem[] = [...Blocks];
  //   const currBlockIndex: number = currBlockList.findIndex((block) => block.id === currBlock.id);
  //   //console.log(currBlockIndex);
  //   const updatedBlocks: BlockItem[] = [...currBlockList];
  //   updatedBlocks.splice(currBlockIndex + 1, 0, { id: uid(), html: "" });
  //   setCurrBlockData(currBlock);
  //   setBlocks(updatedBlocks);
  //   console.log(updatedBlocks);
  //   //console.log(currBlockData?.ref);
  //   console.log(Blocks);  
  // }

  const blocks = useSelector((state: any) => state.note.value);

  return (
    <div>
      {blocks.map((block: { uid: string; html: string; }) => <Block
        uid={block.uid}
        html={block.html}
        onUpdateBlock={updateBlock}
        onAddBlock={addBlock}
        onDeleteBlock={deleteBlock}
      />)}
    </div>
  );

}