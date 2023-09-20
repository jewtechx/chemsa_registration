import { Document, Model, PopulatedDoc, Types } from "mongoose";
import { IStudent } from "./students";
import { IUser } from "./user";

export interface IRegistration {
  student: PopulatedDoc<IStudent>;
  registrationDetails: {
    type: "REG_ONLY" | "REG_AND_SOUVENIERS";
    souveniers: string[];
    amount: string;
    paymentMethod: string;
    balance: string;
    souveniersCollected: string[];
    souveniersStatus: "COLLECTED_ALL" | "COLLECTED_SOME" | "NULL";
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

export interface populatedRegistration {
  student: IStudent;
  registrationDetails: IRegistration["registrationDetails"];
  createdBy: IUser;
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
