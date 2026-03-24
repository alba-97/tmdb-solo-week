import api from "./api";
import { FavoriteItem } from "../interfaces";

interface UserProfile {
  username: string;
  items: FavoriteItem[];
}

export const getUserProfile = (id: number | string) =>
  api.get<UserProfile>(`/users/${id}`);
