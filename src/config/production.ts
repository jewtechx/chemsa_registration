import dotenv from "dotenv";
import { Config } from ".";
dotenv.config();

const config: Config = {
  app: {
    env: "production",
    name: "physag-reg-server",
    port: process.env.PORT as unknown as number
  },
  auth: {
    secret: process.env.JWT_SECRET || "00606060",
  },
  db: {
    uri: process.env.PROD_MONGO_URI || "",
  },
};

export default config