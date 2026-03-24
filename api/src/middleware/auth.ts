import { Request, Response, NextFunction } from "express";
import { validateToken } from "../config/tokens";
import { UserPayload } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.token as string | undefined;
  if (token) {
    try {
      const { payload } = validateToken(token);
      req.user = payload;
      next();
      return;
    } catch {
      // fall through to 401
    }
  }
  res.sendStatus(401);
};

export default validateUser;
