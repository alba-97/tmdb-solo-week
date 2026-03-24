import { Request, Response } from "express";
import {
  searchMovies,
  searchTv,
  searchUsersByUsername,
  getMovieById,
  getTvById,
} from "../services/search.service";

export const searchMoviesHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const title = req.query.title as string;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const result = await searchMovies(title, pageNumber);
    res.send(result);
  } catch {
    res.sendStatus(500);
  }
};

export const searchTvHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const title = req.query.title as string;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const result = await searchTv(title, pageNumber);
    res.send(result);
  } catch {
    res.sendStatus(500);
  }
};

export const searchUsersHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const username = req.query.username as string;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    const result = await searchUsersByUsername(username, pageNumber);
    res.send(result);
  } catch {
    res.sendStatus(500);
  }
};

export const getMovieHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getMovieById(req.params.id);
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

export const getTvHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await getTvById(req.params.id);
    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};
