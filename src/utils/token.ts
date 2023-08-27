import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config";
import { GraphQLError } from "graphql";
import dotenv from "dotenv";
import { IUserSchema } from "../types/user";
dotenv.config();

export const _generateToken = (user: IUserSchema) => {
  try {
    const token = jwt.sign({ id: user._id }, config.auth.secret, {
      expiresIn: config.auth.token_expiry,
    });
    return token;
  } catch (e) {
    throw e;
  }
};
export const verifyAccessToken = (token: string) => {
  try {

    if (!token) {
      throw new GraphQLError("No token", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }

    let decoded;
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      function (err: any, tokenData: any) {
        if (err) {
          throw new GraphQLError("Token expired", {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          });
        }
        decoded = tokenData;
      }
    );

    return decoded;
  } catch (err) {
    throw new GraphQLError("Invalid access token", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};

