import { Request, Response } from "express";
import { addFavorite, removeFavorite } from "../services/favorite.service";
import { addFavoriteSchema, removeFavoriteSchema } from "../utils/validation";

export const addFavoriteHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await addFavoriteSchema.validate(req.body);
    const { userId, itemId, category } = req.body as {
      userId: number;
      itemId: number;
      category: string;
    };
    const result = await addFavorite(userId, itemId, category);
    res.send(result);
  } catch {
    res.sendStatus(400);
  }
};

export const removeFavoriteHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await removeFavoriteSchema.validate(req.body);
    const { userId, itemId } = req.body as { userId: number; itemId: number };
    const item = await removeFavorite(userId, itemId);
    res.send(item);
  } catch {
    res.sendStatus(404);
  }
};
