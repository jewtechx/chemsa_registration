import IService, { IAppContext } from "../types/app";
import { IUserAuth, IUser } from "../types/user";
import { _generateToken } from "../utils/token";

export default class UserService extends IService {
  constructor(props: IAppContext) {
    super(props);
  }

  // create a user
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

  // login 
  async login({input},{}):Promise<IUserAuth> {
    try {
      const user = await this.db.userModel.findOne({email:input.email});

      if(!user) throw new Error("User does not exist")

      const __isValid = await user.comparePasswords(input.password);
      if(!__isValid) throw new Error("Incorrect Password");
      const token = await _generateToken(user);

      return {
        user,
        token
      }
    }catch(e){
      throw e
    }
  }

  // get user
  async getOne(id:any, {user}:{user: any}):Promise<IUser> {

    try{
      if(!user){
        throw new Error("Not Authenticated");
      }

      const _user = await this.db.userModel.findById(id);

      if(!_user) throw new Error("User not found");

      return _user
    }catch(e){
      throw e
    }
  }

  // update user
  async updateOne({input}, {user}:{user: any} ):Promise<IUser> {
    try {
      if(!user){
        throw new Error("Not Authenticated");
      }

      const _user = await this.db.userModel.findById(user._id);

      if(!_user) throw new Error("User not found");

      await _user.updateOne({$set : {...input}});

      return _user;
    }catch(e){
      throw e
    }
  }

  // delete user
  async deleteOne({userId}, {user}):Promise<IUser> {
    console.log(userId)
    try {
      if(!user) throw new Error("Unauthorized");

      const _user = await this.db.userModel.findByIdAndDelete(userId);

      if(!_user) throw new Error("User not found");
      return _user;
    }catch(e){
      throw e;
    }
  }
}
