import { Document, Model, PopulatedDoc, Types } from "mongoose";
import { IStudent } from "./students";

export interface IRegistration {
  student: Types.ObjectId;
  registrationDetails: {
    type: "REG_ONLY" | "REG_AND_SOUVENIERS";
    souveniers: string[];
    amount: string;
  };
  year: string;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

export interface IRegistrationSchema extends IRegistration, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateRegistrationDetailsInput {
  registrationId: Types.ObjectId;
  registrationDetails: IRegistration["registrationDetails"];
}

export interface ICreateRegistrationInput {
  student: Types.ObjectId;
  registrationDetails: IRegistration["registrationDetails"];
}

export interface IDeleteRegistration {
  registrationId: Types.ObjectId;
}

export interface IRegistrationModel extends Model<IRegistrationSchema> {}
