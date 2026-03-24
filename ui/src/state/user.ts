import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, FavoriteItem } from "../interfaces";

const initialState: UserState = {
  id: null,
  username: "",
  favorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: number | null; username: string }>,
    ) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<{ id: number }>) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id,
      );
    },
  },
});

export const { setUser, setFavorites, addFavorite, removeFavorite } =
  userSlice.actions;
export default userSlice.reducer;
