import { Schema, model, SchemaTypes, CallbackError } from "mongoose";
import { IUserModel, IUserSchema } from "../types/user";
import bcrypt from "bcrypt";

const UserSchema = new Schema<IUserSchema>({
  fullname: SchemaTypes.String,
  email: SchemaTypes.String,
  password: SchemaTypes.String,
  role: "GEN-SEC" || "ORGANIZING-SEC" || "PRESIDENT" || "VICE-PRESIDENT",
});

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

export default model<IUserModel>("User", UserSchema);
