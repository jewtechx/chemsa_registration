import dotenv from "dotenv";
dotenv.config();
import { Config } from ".";

const config: Config = {
  app: {
    name: "PHYSAG-UG",
    port: process.env.PORT || 8080,
    env: "production",
  },
  auth: {
    secret: process.env.JWT_SECRET,
    token_expiry: process.env.TOKEN_EXPIRY,
  },
  db: {
    uri: process.env.PROD_MONGO_URI,
  },
  mail: {
    username: process.env.MAILGUN_USERNAME || "",
    key:
      process.env.MAILGUN_API_KEY ||
      "26b2960b8ae02db40b88c8c21f69c262-5645b1f9-6b118c84",
    domain: process.env.MAIL_DOMAIN || "mail.polymorphlabs.io",
  },
};

export default config;
