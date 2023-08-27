import IService, { IAppContext } from "../types/app";
import { ICreateStudentInput } from "../types/students";
import { __generateQuery } from "../utils/query";

export default class StudentService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: ICreateStudentInput, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const _student = await this.db.studentModel.findOne({
        email: input.email,
      });

      if (_student) throw new Error("Student Already Exist");

      const student = new this.db.studentModel({
        ...input,
        createdBy: user._id,
      });
      await student.save();
      return student;
    } catch (e) {
      throw e;
    }
  }
  async updateOne({ input }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      console.log(JSON.stringify(input));

      const _student = await this.db.studentModel.findOne({
        studentID: input.studentID,
      });

      if (!_student) throw new Error("Student does not Exist");

      await _student.updateOne({
        $set: {
          ...input,
          updatedBy: user._id,
        },
      });
      return "Student Updated Successfully";
    } catch (e) {
      throw e;
    }
  }
  async deleteOne({ input }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const student = await this.db.studentModel.findByIdAndDelete(
        input.studentID
      );
      if (!student) throw new Error("student Not Found");
      return user;
    } catch (e) {
      throw e;
    }
  }
  async getMany({ filter, search, populate, pagination }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const generatedQuery = __generateQuery("Student", {
        filter,
        search,
        populate: populate,
        pagination,
        sort: { createdAt: "asc" },
      });

      const student = this.db.studentModel
        .find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate);

      if (!student) {
        throw new Error("student Not Found");
      }

      return student;
    } catch (e) {
      throw e;
    }
  }

  async getOne({ filter, search, populate }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const generatedQuery = __generateQuery("Student", {
        filter,
        populate,
        search,
      });

      const student = await this.db.studentModel
        .find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .populate(generatedQuery.populate)
        .exec();

      if (!student) {
        throw new Error("student Not Found");
      }

      return student;
    } catch (e) {
      throw e;
    }
  }
}
