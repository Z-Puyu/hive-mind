import { createSlice } from "@reduxjs/toolkit";
import uid from "../utils/uid";

const initialBlock = {
  uid: uid(),
  html: "",
};

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    value: [initialBlock],
  },
  reducers: {
    updateBlock: (state, action) => {
      const index = state.value.findIndex(
        (block) => block.uid === action.payload.uid
      );
      const tmp = [...state.value];
      tmp[index].html = action.payload.html;
      state.value = tmp;
      //console.log(state.value[0].html);
    },

    addBlock: (state, action) => {
      const index = state.value.findIndex(
        (block) => block.uid === action.payload.uid
      );
      state.value.splice(index + 1, 0, { uid: uid(), html: "" });
    },
    deleteBlock: (state, action) => {
      if (state.value.length != 1) {
        const index = state.value.findIndex(
          (block) => block.uid === action.payload.uid
        );
        state.value.splice(index, 1);
      }
    },
  },
});

export const { updateBlock, addBlock, deleteBlock } = noteSlice.actions;

export default noteSlice.reducer;
