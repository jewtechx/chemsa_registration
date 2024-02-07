import { IAppContext } from "../types/app";
import StudentService from "./student";
import UserService from "./user";

export interface IServices {
  user: UserService;
  student: StudentService
}

export default async function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
      student: new StudentService(context)
    };
  } catch (e) {
    throw e;
  }
}
