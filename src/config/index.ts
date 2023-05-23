import production from "./production"
import development from "./development"
import dotenv from "dotenv";
dotenv.config();

export interface Config {
  app: {
    env : "development" | "test" | "production"
    port: number;
    name: string;
  };

  db: {
    uri: string;
  };
  auth: {
    secret: string;
  };
}


export const config : Config = process.env.NODE_ENV === "production" ? production : development