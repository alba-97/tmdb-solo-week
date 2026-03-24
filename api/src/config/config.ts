import "dotenv/config";

export const TMDB_API_KEY = process.env.TMDB_API_KEY as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const DB_URI = process.env.DB_URI as string;
