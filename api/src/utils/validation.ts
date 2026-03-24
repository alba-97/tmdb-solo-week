import * as yup from "yup";

export const signupSchema = yup.object({
  username: yup.string().min(4).max(25).required(),
  password: yup.string().min(6).required(),
  email: yup.string().email().required(),
});

export const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const addFavoriteSchema = yup.object({
  userId: yup.number().required(),
  itemId: yup.number().required(),
  category: yup.string().oneOf(["movie", "tv"]).required(),
});

export const removeFavoriteSchema = yup.object({
  userId: yup.number().required(),
  itemId: yup.number().required(),
});
