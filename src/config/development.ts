import dotenv from "dotenv";
import { Config } from ".";
dotenv.config();

const config: Config = {
  app: {
    env: "development",
    name: "physag-reg-server",
    port: 5000,
  },
  auth: {
    secret: process.env.JWT_SECRET || "00606060",
  },
  db: {
    uri: process.env.DEV_MONGO_URI || "",
  },
};

export default config
