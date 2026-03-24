import api from "./api";
import { UserState } from "../interfaces";

export const login = (username: string, password: string) =>
  api.post("/login", { username, password });

export const getSecret = () => api.get<UserState>("/secret");

export const getMe = () => api.get<UserState>("/me");

export const logout = () => api.post("/logout");

export const signup = (username: string, password: string, email: string) =>
  api.post("/signup", { username, password, email });
