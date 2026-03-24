import axios from "axios";
import { TMDB_API_KEY } from "../config/config";
import { searchUsers } from "../repositories/user.repository";
import { PaginatedResult } from "../interfaces";

const PAGE_SIZE = 20;

export const searchMovies = async (
  title: string,
  pageNumber = 1,
): Promise<PaginatedResult<unknown>> => {
  const query = title.replaceAll(" ", "+");
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${pageNumber}`,
  );
  return {
    total: response.data.total_results as number,
    data: (response.data.results as unknown[]) ?? [],
  };
};

export const searchTv = async (
  title: string,
  pageNumber = 1,
): Promise<PaginatedResult<unknown>> => {
  const query = title.replaceAll(" ", "+");
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${query}&page=${pageNumber}`,
  );
  return {
    total: response.data.total_results as number,
    data: (response.data.results as unknown[]) ?? [],
  };
};

export const searchUsersByUsername = async (
  username: string,
  pageNumber = 1,
): Promise<PaginatedResult<unknown>> => {
  const offset = (pageNumber - 1) * PAGE_SIZE;
  const { count, rows } = await searchUsers(username, PAGE_SIZE, offset);
  return { total: count, data: rows };
};

export const getMovieById = async (id: string): Promise<unknown> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`,
  );
  return response.data;
};

export const getTvById = async (id: string): Promise<unknown> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`,
  );
  return response.data;
};
