import { Request, Response } from "express";
import { login, signup } from "../services/auth.service";
import { validateToken } from "../config/tokens";
import { loginSchema, signupSchema } from "../utils/validation";

export const loginHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await loginSchema.validate(req.body);
    const token = await login(
      req.body.username as string,
      req.body.password as string,
    );
    if (!token) {
      res.sendStatus(401);
      return;
    }
    res.cookie("token", token);
    res.sendStatus(200);
  } catch {
    res.sendStatus(401);
  }
};

export const signupHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await signupSchema.validate(req.body);
    await signup(
      req.body as { username: string; password: string; email: string },
    );
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
};

export const logoutHandler = (_req: Request, res: Response): void => {
  res.clearCookie("token");
  res.sendStatus(204);
};

export const meHandler = (req: Request, res: Response): void => {
  res.send(req.user);
};

export const secretHandler = (req: Request, res: Response): void => {
  const token = req.cookies?.token as string | undefined;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  try {
    const { payload } = validateToken(token);
    res.send(payload);
  } catch {
    res.sendStatus(401);
  }
};
