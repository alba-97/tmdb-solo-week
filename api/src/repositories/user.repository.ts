import { Op } from "sequelize";
import { Users, Items } from "../models";

export const findUserById = (id: number) => Users.findByPk(id);

export const findUserWithItems = (id: number) =>
  Users.findByPk(id, { include: [Items] });

export const findUserByUsername = (username: string) =>
  Users.findOne({ where: { username } });

export const searchUsers = (query: string, limit: number, offset: number) =>
  Users.findAndCountAll({
    where: { username: { [Op.iLike]: `%${query}%` } },
    attributes: ["id", "username"],
    limit,
    offset,
  });

export const createUser = (data: {
  username: string;
  password: string;
  email: string;
}) => Users.create(data);
