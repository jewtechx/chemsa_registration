import mongoose, { connect } from "mongoose";
import UserModel from "./user.model";
import { Config } from "../config";
import { IUserModel } from "../types/user";

export interface IDb {
  UserModel: IUserModel;
}

export const InitDB = async (config: Config["db"]) => {
  try {
  } catch (e) {}
};
