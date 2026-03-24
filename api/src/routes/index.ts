import { Router } from "express";
import validateUser from "../middleware/auth";
import {
  loginHandler,
  signupHandler,
  logoutHandler,
  meHandler,
  secretHandler,
} from "../controllers/auth.controller";
import {
  searchMoviesHandler,
  searchTvHandler,
  searchUsersHandler,
  getMovieHandler,
  getTvHandler,
} from "../controllers/search.controller";
import {
  addFavoriteHandler,
  removeFavoriteHandler,
} from "../controllers/favorite.controller";
import { getUserHandler } from "../controllers/user.controller";

const router = Router();

router.post("/login", loginHandler);
router.post("/signup", signupHandler);
router.post("/logout", logoutHandler);
router.get("/me", validateUser, meHandler);
router.get("/secret", secretHandler);

router.get("/search/movie", searchMoviesHandler);
router.get("/search/tv", searchTvHandler);
router.get("/search/user", searchUsersHandler);

router.get("/movie/:id", getMovieHandler);
router.get("/tv/:id", getTvHandler);

router.post("/favorites/add", addFavoriteHandler);
router.post("/favorites/remove", removeFavoriteHandler);

router.get("/users/:id", getUserHandler);

export default router;
