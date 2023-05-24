import { Schema, model, SchemaTypes, CallbackError, Model } from "mongoose";
import { IUserModel, IUserSchema } from "../types/user";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUserSchema>(
  {
    fullname: SchemaTypes.String,
    email: SchemaTypes.String,
    password: SchemaTypes.String,
    role: {
      type: SchemaTypes.String,
      enum: ["PRESIDENT", "VICE-PRESIDENT", "GEN-SEC", "ORGANIZING-SEC"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

UserSchema.methods.comparePasswords = async function (hash: string) {
  return await bcrypt.compare(hash, this.password);
};

const UserModel: IUserModel = model<IUserSchema, IUserModel>(
  "User",
  UserSchema
);

export default UserModel;
