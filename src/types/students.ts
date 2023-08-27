import { Document, Model, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./user";
import { IRegistration } from "./registration";

export interface IStudent {
  fullName: string;
  email: string;
  programme: string;
  level: number;
  phone: string;
  registration: PopulatedDoc<IRegistration>;
  createdBy: PopulatedDoc<IUser>;
}

export interface IStudentSchema extends IStudent, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudentModel extends Model<IStudentSchema> {}
