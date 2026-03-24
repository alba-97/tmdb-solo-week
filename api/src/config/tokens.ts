import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { UserPayload } from "../interfaces";

export function generateToken(payload: UserPayload): string {
  return jwt.sign({ payload }, JWT_SECRET, { expiresIn: "2h" });
}

export function validateToken(token: string): { payload: UserPayload } {
  return jwt.verify(token, JWT_SECRET) as { payload: UserPayload };
}
