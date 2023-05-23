import { IAppContext, IService } from "../types/app";
import { IUser, IUserInput } from "../types/user";

export default class UserService extends IService {
  constructor(appContext: IAppContext) {
    super(appContext);
  }

   async CreateOne(input: IUserInput): Promise<IUser> {
    try {
      const _user = await this.db.UserModel.find({
        email: input.email,
      });

      if (_user) throw new Error("User already exits");

      const user = new this.db.UserModel({
        ...input,
      });
      await user.save();

      return user;
    } catch (e) {
      throw e;
    }
  }
}


