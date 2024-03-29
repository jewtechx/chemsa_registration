import { IDb } from "../model";
import { IServices } from "../services";
export interface IAppContext {
  db?: IDb;
  services?: IServices;
}

export default class IService {
  db: IDb;
  constructor(context: IAppContext) {
    this.db = context.db;
  }
}
