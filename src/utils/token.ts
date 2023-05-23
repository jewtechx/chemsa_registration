import jwt from "jsonwebtoken";
import { IUser, IUserSchema } from "../types/user";
import { config } from "../config";

export const _generateToken = (user: IUserSchema) => {
  try {
    const token = jwt.sign(user._id, config.auth.secret);
    return token;
  } catch (e) {
    throw e;
  }
};
