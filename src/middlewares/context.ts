import { GraphQLError } from "graphql";
import { verifyAccessToken } from "../utils/token";

export const setContext = async ({ req }) => {
  try {
    const token = req.headers.authorization || "";

    console.log(token);

    if (token) {
      const decoded = verifyAccessToken(token);

      const id = decoded.id;

      const user = { _id: id };

      return { token, user };
    }
  } catch (err) {
    console.log(err);
  }
};
