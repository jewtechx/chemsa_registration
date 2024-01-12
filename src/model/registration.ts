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
          type: [
            new Schema({
              id: {
                type: SchemaTypes.Number,
                required: true,
              },
              name: {
                type: SchemaTypes.String,
                required: true,
              },
              count: {
                type: SchemaTypes.Number,
                required: true,
              },
            }),
          ],
          required: function () {
            return this.type === "REG_AND_SOUVENIERS";
          },
        },
        amount: {
          type: SchemaTypes.String,
          required: true,
        },
        paymentMethod: {
          type: SchemaTypes.String,
          required: true,
          enum: ["CASH", "MOBILE_MONEY"],
        },
        balance: {
          type: SchemaTypes.String,
          required: true,
        },
        souveniersCollected: {
          type: [
            new Schema({
              id: {
                type: SchemaTypes.Number,
                required: true,
              },
              name: {
                type: SchemaTypes.String,
                required: true,
              },
              count: {
                type: SchemaTypes.Number,
                required: true,
              },
            }),
          ],
          required: function () {
            return this.type === "REG_AND_SOUVENIERS";
          },
        },
        souveniersStatus: {
          type: SchemaTypes.String,
          enum: ["COLLECTED_ALL", "COLLECTED_SOME", "NULL", "NOT_COLLECTED"],
          required: true,
        },
      }),
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
