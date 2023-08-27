import { IAppContext } from "../types/app";
import registrationService from "./registration";
import StudentService from "./student";

import UserService from "./user";

export interface IServices {
  user: UserService;
  student: StudentService;
  registration: registrationService;
}

export default async function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
      student: new StudentService(context),
      registration: new registrationService(context),
    };
  } catch (e) {
    throw e;
  }
}
