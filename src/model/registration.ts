import { Schema, SchemaTypes, model } from "mongoose";
import { IRegistrationModel, IRegistrationSchema } from "../types/registration";

const registrationSchema = new Schema<IRegistrationSchema>({
  type: {
    type: SchemaTypes.String,
    enum: ["REG_ONLY", "REG_AND_SOUVENIERS"],
    required: true,
  },
  year: {
    type: SchemaTypes.String,
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
  student: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
});

const registrationModel = model<IRegistrationSchema, IRegistrationModel>(
  "Registation",
  registrationSchema
);

export default registrationModel;
