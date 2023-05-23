import { IAppContext } from "../types/app";
import UserService from "./user";

export interface IServices {
  UserService: UserService;
}

export function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
    };
  } catch (e) {
    throw e;
  }
}
