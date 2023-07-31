import { createAction, createReducer } from "@reduxjs/toolkit";

export const setResults = createAction("SETRESULTS");
export const removeResult = createAction("REMOVERESULT");

const initialState = { movie: [], tv: [], user: [] };

const reducer = createReducer(initialState, {
  [setResults]: (state, action) => {
    let newState = { ...state };
    newState[action.payload.category] = action.payload.data;
    return newState;
  },
  [removeResult]: (state, action) => {
    let newState = { ...state };
    const category = action.payload.category;
    let results = newState[category];
    results = results.filter((result) => result.id !== action.payload.id);
    newState[category] = results;
    return newState;
  },
});

export default reducer;
