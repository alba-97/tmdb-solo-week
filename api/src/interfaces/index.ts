export interface UserPayload {
  id: number;
  username: string;
  email: string;
}

export interface PaginatedResult<T> {
  total: number;
  data: T[];
}

export interface SignupBody {
  username: string;
  password: string;
  email: string;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface AddFavoriteBody {
  userId: number;
  itemId: number;
  category: string;
}

export interface RemoveFavoriteBody {
  userId: number;
  itemId: number;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMovie {
  id: number;
  title?: string;
  name?: string;
  genres?: TmdbGenre[];
  director?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
  overview?: string;
}
