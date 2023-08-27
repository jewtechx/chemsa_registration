import dotenv from "dotenv";
dotenv.config();
import { Config } from ".";

const config: Config = {
  app: {
    name: "accreditation software",
    port: 8080,
    env: "development",
  },
  auth: {
    secret: process.env.JWT_SECRET,
    token_expiry: process.env.TOKEN_EXPIRY,
  },
  db: {
    uri: process.env.DEV_MONGO_URI,
  },
  mail: {
    username: process.env.MAILGUN_USERNAME || "",
    key: process.env.MAILGUN_API_KEY || "",
    domain: process.env.MAIL_DOMAIN || "",
  },
};

export default config;
