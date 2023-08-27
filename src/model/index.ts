import { connect } from "mongoose";
import { Config } from "../config";
import userModel from "./user";
import studentModel from "./student";
import registrationModel from "./registration";

export interface IDb {
  userModel: typeof userModel;
  studentModel: typeof studentModel;
  registrationModel: typeof registrationModel;
}

export default async function initDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri, { autoIndex: true });
    console.log("DB connected");

    await userModel.createCollection();
    await studentModel.createCollection();
    await registrationModel.createCollection();

    return {
      userModel,
      studentModel,
      registrationModel,
    };
  } catch (e) {
    throw e;
  }
}
