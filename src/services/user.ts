import IService, { IAppContext } from "../types/app";
import { IUserAuth, IUser } from "../types/user";
import { _generateToken } from "../utils/token";

export default class UserService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  async createOne({ input }, {}): Promise<IUserAuth> {
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
}
