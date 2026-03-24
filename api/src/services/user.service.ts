import { findUserWithItems } from "../repositories/user.repository";
import Items from "../models/Items";

interface UserProfile {
  username: string;
  items: Items[];
}

export const getUserProfile = async (id: number): Promise<UserProfile> => {
  const user = await findUserWithItems(id);
  if (!user) return { username: "", items: [] };
  return { username: user.username, items: user.items ?? [] };
};
