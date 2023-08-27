import IService, { IAppContext } from "../types/app";
import { IAuthUser, IUser } from "../types/user";
import { _generateToken } from "../utils/token";

export default class UserService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async createOne({ input }, {}): Promise<IAuthUser> {
    try {
      const _user = await this.db.userModel.find({ email: input.email });

      if (_user.length) throw new Error("User already exists");

      const user = new this.db.userModel({
        role: "USER",
        ...input,
      });

      await user.save();

      const token = await _generateToken(user);

      return {
        user,
        token,
      };
    } catch (e) {
      throw e;
    }
  }

  async login({ input }, {}): Promise<IAuthUser> {
    try {
      const user = await this.db.userModel.findOne({ email: input.email });

      if (!user) throw new Error("User does not exist");

      const __isValid = await user.comparePasswords(input.password);
      if (!__isValid) throw new Error("Incorrect Password");
      const token = await _generateToken(user);

      return {
        user,
        token,
      };
    } catch (e) {
      throw e;
    }
  }

  async getOne(id, { context }: { context: any }): Promise<IUser> {
    try {
      console.log(context);
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const user = await this.db.userModel.findOne({ _id: id });
      if (!user) throw new Error("User not found");
      return user;
    } catch (e) {
      throw e;
    }
  }

  async updateOne({ input }, { user }: { user: any }): Promise<IUser> {
    try {
      console.log(user);
      if (!user) {
        throw new Error("Not authenticated");
      }

      const _user = await this.db.userModel.findById(user._id);
      if (!user) throw new Error("User Not Found");

      await _user.updateOne({ $set: { ...input } });
      return _user;
    } catch (err) {
      throw err;
    }
  }

  async deleteOne({ input }, { context }: { context: any }): Promise<IUser> {
    try {
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      const user = await this.db.userModel.findByIdAndDelete(input.userId);
      if (!user) throw new Error("User Not Found");
      return user;
    } catch (err) {
      throw err;
    }
  }
}
