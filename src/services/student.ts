import IService, { IAppContext } from "../types/app";

export default class StudentService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne({}, {}) {}
  async updateOne({}, {}) {}
  async deleteOne({}, {}) {}
  async getOne({}, {}) {}
  async getAll({}, {}) {}
}
