import api from "./api";
import { PaginatedResult, TmdbMovie, UserResult } from "../interfaces";

export const searchMovies = (title: string, pageNumber = 1) =>
  api.get<PaginatedResult<TmdbMovie>>(
    `/search/movie?title=${encodeURIComponent(title)}&pageNumber=${pageNumber}`,
  );

export const searchTv = (title: string, pageNumber = 1) =>
  api.get<PaginatedResult<TmdbMovie>>(
    `/search/tv?title=${encodeURIComponent(title)}&pageNumber=${pageNumber}`,
  );

export const searchUsers = (username: string, pageNumber = 1) =>
  api.get<PaginatedResult<UserResult>>(
    `/search/user?username=${encodeURIComponent(username)}&pageNumber=${pageNumber}`,
  );

export const getMovie = (id: string | number) =>
  api.get<TmdbMovie>(`/movie/${id}`);

export const getTv = (id: string | number) => api.get<TmdbMovie>(`/tv/${id}`);
