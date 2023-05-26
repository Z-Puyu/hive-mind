import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux"
import noteReducer from "./features/note"

const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>
);

//export type RootState = ReturnType<typeof store.getState>
