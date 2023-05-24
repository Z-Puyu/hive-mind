import { useState, useEffect } from 'react';
import TeXBlock from './TeXBlock';

const { v4: uuidv4 } = require('uuid');

export interface TeXBlockItem {
  id: string;
  html: string;
}

export interface NewBlockData {
  id: string;
  ref: HTMLElement | null;
}

export default function TeXBox(): JSX.Element {
  const initBlock: TeXBlockItem = {
    id: uuidv4(),
    html: "This is the initial block, press Enter to type in a new block."
  };

  const [[TeXBlocks, currBlockData], setTeXBlocks] = useState<[TeXBlockItem[],
    NewBlockData | undefined]>([[initBlock], undefined]);

  useEffect(() => (currBlockData?.ref?.nextElementSibling as HTMLElement)?.focus(),
    [currBlockData]);

  const updateBoxHandler = (updatedBlock: TeXBlockItem) => {
    const currBlockList: TeXBlockItem[] = TeXBlocks;
    const updatedBlockIndex: number = currBlockList.map(blk => blk.id).indexOf(updatedBlock.id);
    const updatedBlocks: TeXBlockItem[] = [...TeXBlocks];
    updatedBlocks[updatedBlockIndex] = {
      ...updatedBlocks[updatedBlockIndex],
      html: updatedBlock.html,
    };
    setTeXBlocks([updatedBlocks, currBlockData]);
  };

  const addBlockHandler = (currBlock: NewBlockData) => {
    const currBlockList: TeXBlockItem[] = TeXBlocks;
    const currBlockIndex: number = currBlockList.findIndex(block => block.id === currBlock.id);
    console.log(currBlockIndex);
    const updatedBlocks: TeXBlockItem[] = [...currBlockList];
    updatedBlocks.splice(currBlockIndex + 1, 0, { id: uuidv4(), html: "" });
    setTeXBlocks([updatedBlocks, currBlock]);
    console.log(TeXBlocks.length)
    // (currBlock.ref?.nextElementSibling as HTMLElement)?.focus();
  };

  return (
    <div>
      {TeXBlocks.map(block => <TeXBlock
        id={block.id}
        html={block.html}
        onAddBlock={addBlockHandler}
        onUpdateBox={updateBoxHandler}
      />)}
    </div>
  );
}