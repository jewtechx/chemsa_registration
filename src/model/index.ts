import { connect } from "mongoose";
import { Config } from "../config";
import userModel from "./user";
import studentModel from "./student";

export interface IDb {
  userModel: typeof userModel;
  studentModel: typeof studentModel
}

export default async function initDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri, { autoIndex: true });
    console.log("DB connected");

    await userModel.createCollection();

    return {
      userModel,
      studentModel
    };
  } catch (e) {
    throw e;
  }
}
