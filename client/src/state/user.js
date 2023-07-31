import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SETUSER");
export const setFavorites = createAction("SETFAVORITES");
export const addFavorite = createAction("ADDFAVORITE");
export const removeFavorite = createAction("REMOVEFAVORITE");

const initialState = {
  id: null,
  username: "",
  favorites: [],
};

const reducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    let newState = { ...state };
    newState.id = action.payload.id;
    newState.username = action.payload.username;
    return newState;
  },
  [setFavorites]: (state, action) => {
    let newState = { ...state };
    newState.favorites = action.payload;
    return newState;
  },
  [addFavorite]: (state, action) => {
    let newState = { ...state };
    newState.favorites = newState.favorites.concat([action.payload]);
    return newState;
  },
  [removeFavorite]: (state, action) => {
    let newState = { ...state };
    newState.favorites = newState.favorites.filter(
      (item) => item.id !== action.payload.id
    );
    return newState;
  },
});

export default reducer;
