import { createAction, createReducer } from "@reduxjs/toolkit";

export const setItem = createAction("SETITEM");

const initialState = {
  id: null,
  title: "",
  genres: [],
  director: "",
  release_date: "",
  poster_path: "",
  overview: "",
  category: "",
};

const reducer = createReducer(initialState, {
  [setItem]: (state, action) => {
    return action.payload;
  },
});

export default reducer;
