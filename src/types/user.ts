import { Model, Document, Types } from "mongoose";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  role:
    | "PRESIDENT"
    | "VICE_PRESIDENT"
    | "GENERAL_SECRETARY"
    | "ASSISTANT_GENERAL_SECRETARY"
    | "FINANCIAL_SECRETARY"
    | "ORGANIZING_SECRETARY"
    | "PATRON"
    | "SUDO_ADMIN";
}

export interface IUserAuth {
  user: IUser;
  token: string;
}

export interface IUserInput {
  fullname: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserSchema extends IUser, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserSchema> {}
