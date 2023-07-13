import { useEffect, useState } from "react";
import { BookmarkElem } from "../../utils/CustomSlateTypes";
import { Editor, Element, Node, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface BookmarkConfigMenuProps {
  target: BookmarkElem;
  onConfirm: (title: string, dest?: string, destId?: string, desc?: string) => void;
}

export default function BookmarkConfigMenu(props: BookmarkConfigMenuProps) {
  const editor: Editor = useSlate();
  const [isSelectMenuActive, setIsSelectMenuActive] = useState<boolean>(false);
  const [bookmarkName, setBookmarkName] = useState<string>(props.target.title);
  const [bookmarkDest, setBookmarkDest] = useState<string | undefined>(
    props.target.destTitle ? props.target.destTitle : undefined
  );
  const [bookmarkDestId, setBookmarkDestId] = useState<string | undefined>(
    props.target.dest ? props.target.dest : undefined
  );
  const [availableBookmarks, setAvailableBookmarks] = useState<BookmarkElem[]>([]);
  const [bookmarkDesc, setBookmarkDesc] = useState<string>(
    !!props.target.customDesc ? props.target.customDesc : ""
  );

  const initialiseBookmarkList = () => {
    const elements = Node.elements(editor, {
      pass: n => !Editor.isEditor(n[0]) && Element.isElement(n[0]) && n[0].type === "bookmark",
    });
    const bmList: BookmarkElem[] = [];
    const firstElem = elements.next().value;
    for (let elem = firstElem; !!elem; elem = elements.next().value) {
      if (elem[0].type === "bookmark") {
        bmList.push(elem[0] as BookmarkElem);
      }
    }
    setAvailableBookmarks(bmList);
  }

  useEffect(() => initialiseBookmarkList(), []);

  const onClickHandler = () => {
    if (availableBookmarks.length === 0) {
      initialiseBookmarkList();
    }
    setIsSelectMenuActive(!isSelectMenuActive);
  }

  const onLinkBookmarksHandler = (id: string) => {
    const bm: BookmarkElem = availableBookmarks.find(bookmark => bookmark.id === id)!;
    setBookmarkDest(bm.title);
    setBookmarkDestId(bm.id);
    Transforms.setNodes(editor, {
      dest: bm.id,
    }, { at: ReactEditor.findPath(editor, props.target) });
    Transforms.setNodes(editor, {
      dest: props.target.id,
    }, { at: ReactEditor.findPath(editor, bm) });
    setIsSelectMenuActive(!isSelectMenuActive);
  }

  console.log(bookmarkDest)
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required
        label="Bookmark Name"
        value={bookmarkName}
        onChange={event => setBookmarkName(event.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required
        label="Custom Description"
        value={bookmarkDesc}
        onChange={event => setBookmarkDesc(event.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="bookmark-linkage-label">Link to</InputLabel>
        <Select
          labelId="bookmark-linkage-label"
          value={bookmarkDestId}
          label="Link to"
          onChange={event => onLinkBookmarksHandler(event.target.value)}
        >
          {availableBookmarks
            .filter(bm => bm.id !== props.target.id)
            .map(bm => <MenuItem value={bm.id}>{bm.title}</MenuItem>)
          }
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => props.onConfirm(bookmarkName, bookmarkDest, bookmarkDestId, bookmarkDesc)}
      >
        Confirm
      </Button>
    </>
  )
}