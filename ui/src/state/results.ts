import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultsState, TmdbMovie, UserResult } from "../interfaces";

const initialState: ResultsState = {
  movie: [],
  tv: [],
  user: [],
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (
      state,
      action: PayloadAction<{
        category: keyof ResultsState;
        data: TmdbMovie[] | UserResult[];
      }>,
    ) => {
      (state[action.payload.category] as (TmdbMovie | UserResult)[]) =
        action.payload.data;
    },
    removeResult: (
      state,
      action: PayloadAction<{ category: keyof ResultsState; id: number }>,
    ) => {
      const cat = action.payload.category;
      (state[cat] as (TmdbMovie | UserResult)[]) = (
        state[cat] as (TmdbMovie | UserResult)[]
      ).filter((r) => r.id !== action.payload.id);
    },
  },
});

export const { setResults, removeResult } = resultsSlice.actions;
export default resultsSlice.reducer;
