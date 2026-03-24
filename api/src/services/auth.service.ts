import {
  findUserByUsername,
  createUser,
} from "../repositories/user.repository";
import { generateToken, validateToken } from "../config/tokens";
import { UserPayload } from "../interfaces";

export const login = async (
  username: string,
  password: string,
): Promise<string | null> => {
  const user = await findUserByUsername(username);
  if (!user) return null;
  const isValid = await user.validatePassword(password);
  if (!isValid) return null;
  return generateToken({
    id: user.id,
    username: user.username,
    email: user.email,
  });
};

export const signup = async (data: {
  username: string;
  password: string;
  email: string;
}): Promise<void> => {
  await createUser(data);
};

export const getTokenPayload = (token: string): UserPayload | null => {
  try {
    const { payload } = validateToken(token);
    return payload;
  } catch {
    return null;
  }
};
