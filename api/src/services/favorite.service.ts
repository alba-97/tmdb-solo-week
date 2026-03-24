import axios from "axios";
import { TMDB_API_KEY } from "../config/config";
import { findUserById } from "../repositories/user.repository";
import {
  findOrCreateItem,
  findItemById,
  destroyItem,
} from "../repositories/item.repository";
import Items from "../models/Items";
import { TmdbMovie } from "../interfaces";

export const addFavorite = async (
  userId: number,
  itemId: number,
  category: string,
): Promise<[Items, boolean]> => {
  const response = await axios.get<TmdbMovie>(
    `https://api.themoviedb.org/3/${category}/${itemId}?api_key=${TMDB_API_KEY}`,
  );
  const itemData = response.data;

  const user = await findUserById(userId);
  if (!user) throw new Error("User not found");

  const [item, created] = await findOrCreateItem(itemId, {
    id: itemData.id,
    title: itemData.title ?? itemData.name ?? "",
    genres: itemData.genres?.map((g) => g.name) ?? [],
    director: itemData.director,
    release_date: itemData.release_date ?? itemData.first_air_date,
    poster_path: itemData.poster_path ?? undefined,
    overview: itemData.overview ?? undefined,
    category,
  });

  if (created) {
    await user.addItems([item]);
  }

  return [item, created];
};

export const removeFavorite = async (
  userId: number,
  itemId: number,
): Promise<Items> => {
  const user = await findUserById(userId);
  const item = await findItemById(itemId);
  if (!user || !item) throw new Error("Not found");
  await user.removeItem(item);
  await destroyItem(itemId);
  return item;
};
