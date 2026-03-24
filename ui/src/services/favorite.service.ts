import api from "./api";
import { FavoriteItem } from "../interfaces";

export const addFavorite = (userId: number, itemId: number, category: string) =>
  api.post<[FavoriteItem, boolean]>("/favorites/add", {
    userId,
    itemId,
    category,
  });

export const removeFavorite = (userId: number, itemId: number) =>
  api.post<FavoriteItem>("/favorites/remove", { userId, itemId });
