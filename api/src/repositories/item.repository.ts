import { Items } from "../models";

interface ItemDefaults {
  id: number;
  title: string;
  genres: string[];
  director?: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  category: string;
}

export const findItemById = (id: number) => Items.findByPk(id);

export const findOrCreateItem = (id: number, defaults: ItemDefaults) =>
  Items.findOrCreate({ where: { id }, defaults });

export const destroyItem = (id: number) => Items.destroy({ where: { id } });
