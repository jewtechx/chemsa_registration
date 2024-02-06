import { connect } from "mongoose";
import { Config } from "../config";
import userModel from "./user";

export interface IDb {
  userModel: typeof userModel;
}

export default async function initDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri, { autoIndex: true });
    console.log("DB connected");

    await userModel.createCollection();

    return {
      userModel
    };
  } catch (e) {
    throw e;
  }
}
