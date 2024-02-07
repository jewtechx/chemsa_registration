import { Document,Model, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./user";

export interface IStudent {
    fullName: string,
    email: string,
    studentID: string,
    programme: string,
    level: string,
    phone: string,
    year: string,
    createdBy: PopulatedDoc<IUser>;
}

export interface IStudentSchema extends IStudent,Document {
    _id: Types.ObjectId,
    createdAt:Date,
    updatedAt:Date;
}

export interface ICreateStudentInput extends IStudent {}

export interface IStudentModel extends Model<IStudentSchema> {}