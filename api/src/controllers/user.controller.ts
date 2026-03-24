import { Request, Response } from "express";
import { getUserProfile } from "../services/user.service";

export const getUserHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const profile = await getUserProfile(parseInt(req.params.id));
    res.send(profile);
  } catch {
    res.sendStatus(500);
  }
};
