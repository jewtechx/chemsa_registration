import IService, { IAppContext } from "../types/app";
import {
  ICreateRegistrationInput,
  IDeleteRegistration,
  IUpdateRegistrationDetailsInput,
} from "../types/registration";
import { __generateQuery } from "../utils/query";

export default class registrationService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: ICreateRegistrationInput, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      console.log("Registration Input: " + JSON.stringify(input));
      const registration = new this.db.registrationModel({
        ...input,
        createdBy: user._id,
      });
      await registration.save();
      console.log("Done");

      const populatedResponse = await (
        await registration.populate("student")
      ).populate("createdBy");

      return populatedResponse;
    } catch (e) {
      throw e;
    }
  }
  async updateOne(input: IUpdateRegistrationDetailsInput, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");
      console.log(JSON.stringify(input));

      const _registration = await this.db.registrationModel.findOne({
        _id: input.registrationId,
      });

      if (!_registration) throw new Error("Registration not found");

      const updatedDoc = await _registration.updateOne({
        $set: {
          ...input,
          updatedBy: user._id,
        },
      });
      console.log(updatedDoc);
      return "Updated Successfully";
    } catch (e) {
      throw e;
    }
  }
  async deleteOne({ input }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");
      console.log(JSON.stringify(input));

      const registration = await this.db.registrationModel.findByIdAndDelete(
        input.registrationId
      );
      if (!registration) throw new Error("registration Not Found");
      const populatedResponse = await (
        await registration.populate("student")
      ).populate("createdBy");

      console.log(populatedResponse);

      return populatedResponse;
    } catch (e) {
      throw e;
    }
  }
  async getMany({ filter, search, populate, pagination }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const generatedQuery = __generateQuery("Registration", {
        filter,
        search,
        populate,
        pagination,
        sort: { createdAt: "asc" },
      });

      console.log(generatedQuery.filter);

      const registration = await this.db.registrationModel
        .find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      if (!registration) {
        throw new Error("registration Not Found");
      }
      console.log(registration);

      return registration;
    } catch (e) {
      throw e;
    }
  }

  async getOne({ filter, search, populate }, { user }) {
    try {
      if (!user) throw new Error("Unauthorized");

      const generatedQuery = __generateQuery("Registration", {
        filter,
        populate,
        search,
      });

      console.log(generatedQuery);

      const registration = await this.db.registrationModel
        .findOne(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .populate(generatedQuery.populate)
        .exec();

      if (!registration) {
        throw new Error("registration Not Found");
      }

      console.log(registration);

      return registration;
    } catch (e) {
      throw e;
    }
  }
}
