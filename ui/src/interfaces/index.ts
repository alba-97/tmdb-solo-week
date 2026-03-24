export interface UserState {
  id: number | null;
  username: string;
  favorites: FavoriteItem[];
}

export interface FavoriteItem {
  id: number;
  title?: string;
  name?: string;
  genres?: string[];
  release_date?: string;
  poster_path?: string;
  overview?: string;
  category: string;
}

export interface TmdbMovie {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  overview?: string;
  genres?: Array<{ id: number; name: string }>;
}

export interface UserResult {
  id: number;
  username: string;
}

export interface ResultsState {
  movie: TmdbMovie[];
  tv: TmdbMovie[];
  user: UserResult[];
}

export interface PaginatedResult<T> {
  total: number;
  data: T[];
}
