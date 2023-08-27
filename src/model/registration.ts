import { Schema, SchemaTypes, model } from "mongoose";
import { IRegistrationModel, IRegistrationSchema } from "../types/registration";

const registrationSchema = new Schema<IRegistrationSchema>(
  {
    student: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Student",
    },
    registrationDetails: {
      type: new Schema({
        type: {
          type: SchemaTypes.String,
          enum: ["REG_ONLY", "REG_AND_SOUVENIERS"],
          required: true,
        },
        souveniers: {
          type: [SchemaTypes.String],
          required: function () {
            return this.type === "REG_AND_SOUVENIERS";
          },
        },
        amount: {
          type: SchemaTypes.String,
          required: true,
        },
      }),
      required: true,
    },
    year: {
      type: SchemaTypes.String,
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    updatedBy: {
      type: SchemaTypes.ObjectId,
      required: false,
      ref: "User",
    },
  },
  { timestamps: true }
);

const registrationModel = model<IRegistrationSchema, IRegistrationModel>(
  "Registration",
  registrationSchema
);

export default registrationModel;
