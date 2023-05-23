import React, { useState } from "react";
import uid from "../utils/uid";
import Block from "../components/block"

const initialBlock = { id: uid(), html: "", tag: "p" };

export default function Home() {
  const [blocks, setBlocks] = useState([initialBlock]);

  const updatePageHandler = (updatedBlock:any) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.id === updatedBlock.id) {
        return {
          ...block,
          tag: updatedBlock.tag,
          html: updatedBlock.html,
        };
      }
      return block;
    });
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock:any) => {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const index = blocks.findIndex((block) => block.id === currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock:any) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const index = blocks.findIndex((block) => block.id === currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
    }
  }


  return (
    <div className="Page">
      {blocks.map((block, key) => (
        <Block
          key={key}
          id={block.id}
          tag={block.tag}
          html={block.html}
          updatePage={updatePageHandler}
          addBlock={addBlockHandler}
          deleteBlock={deleteBlockHandler}
        />
      ))}
    </div>
  );
}