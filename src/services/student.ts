import IService, { IAppContext } from "../types/app";
import { ICreateStudentInput } from "../types/students";
import { __generateQuery } from "../utils/query";

export default class StudentService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: ICreateStudentInput, { user }, session) {
    try {
      if (!user) throw new Error("Unauthorized");

      const _student = await this.db.studentModel.findOne({
        email: input.email,
        year: "2023-2024",
      });

      if (_student) throw new Error("Student Already Exist");

      const student = new this.db.studentModel({
        ...input,
        year: "2023-2024",
        createdBy: user._id,
      });
      await student.save({ session });
      return student;
    } catch (e) {
      throw e;
    }
  }
  async updateOne(input, { user }, session) {
    try {
      console.log("STUDENT_INPUT", input);

      if (!user) throw new Error("Unauthorized");

      const _student = await this.db.studentModel.findOne({
        _id: input.studentObjectID,
      });

      if (!_student) throw new Error("Student does not Exist");

      await _student.updateOne(
        {
          $set: {
            ...input,
            updatedBy: user._id,
          },
        },
        { session }
      );
      return "Student Updated Successfully";
    } catch (e) {
      throw e;
    }
  }
  async deleteOne({ input }, { user }, session) {
    try {
      if (!user) throw new Error("Unauthorized");

      const student = await this.db.studentModel.findByIdAndDelete(
        input.studentID,
        { session }
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

  async countLevel100({ filter }, { user }) {
    console.log(filter);

    try {
      if (!user) throw new Error("Unauthorized");

      const count = await this.db.studentModel.countDocuments({
        year: filter.year.eq,
        level: 100,
      });

      return count;
    } catch (e) {
      throw e;
    }
  }

  async countLevel200({ filter }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const count = await this.db.studentModel.countDocuments({
        year: filter.year.eq,
        level: 200,
      });

      return count;
    } catch (e) {
      throw e;
    }
  }

  async countLevel300({ filter }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const count = await this.db.studentModel.countDocuments({
        year: filter.year.eq,
        level: 300,
      });

      return count;
    } catch (e) {
      throw e;
    }
  }

  async countLevel400({ filter }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const count = await this.db.studentModel.countDocuments({
        year: filter.year.eq,
        level: 400,
      });

      return count;
    } catch (e) {
      throw e;
    }
  }
}
