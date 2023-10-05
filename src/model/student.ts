import { Schema, SchemaTypes, model } from "mongoose";
import { IStudentModel, IStudentSchema } from "../types/students";

var validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const studentSchema = new Schema<IStudentSchema>(
  {
    fullName: {
      type: SchemaTypes.String,
      required: true,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    programme: {
      type: SchemaTypes.String,
      required: true,
    },
    studentID: {
      type: SchemaTypes.String,
      required: true,
    },
    level: {
      type: SchemaTypes.String,
      required: true,
    },
    phone: {
      type: SchemaTypes.String,
      required: true,
    },
    year: {
      type: SchemaTypes.String,
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentModel = model<IStudentSchema, IStudentModel>(
  "Student",
  studentSchema
);

export default StudentModel;
