import { Document, Model, PopulatedDoc, Types } from "mongoose";
import { IStudent } from "./students";

export interface IRegistration {
  type: "REG_ONLY" | "REG_AND_SOUVENIERS";
  year: string;
  souveniers: string[];
  amount: string;
  student: PopulatedDoc<IStudent>;
}

export interface IRegistrationSchema extends IRegistration, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegistrationModel extends Model<IRegistrationSchema> {}
