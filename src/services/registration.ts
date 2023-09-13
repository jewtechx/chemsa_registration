import { receipt_html } from "../templates/receipt";
import IService, { IAppContext } from "../types/app";
import {
  ICreateRegistrationInput,
  IDeleteRegistration,
  IUpdateRegistrationDetailsInput,
  populatedRegistration,
} from "../types/registration";
import { sendEmail } from "../utils/email";
import { formatDate } from "../utils/formatDate";
import { __generateQuery } from "../utils/query";

export default class registrationService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: ICreateRegistrationInput, { user }, session) {
    try {
      if (!user) throw new Error("Unauthorized");

      console.log("Registration Input: " + JSON.stringify(input));
      let souveniersStatus;
      let isAllCollected;

      if (input.registrationDetails.type === "REG_AND_SOUVENIERS") {
        isAllCollected =
          input.registrationDetails.souveniers.length ===
            input.registrationDetails.souveniersCollected.length &&
          input.registrationDetails.souveniers.every((item) =>
            input.registrationDetails.souveniersCollected.includes(item)
          );

        souveniersStatus = isAllCollected ? "COLLECTED_ALL" : "COLLECTED_SOME";
      } else {
        souveniersStatus = "NULL";
      }

      const registration = new this.db.registrationModel({
        ...input,
        "registrationDetails.souveniersStatus": souveniersStatus,
        year: "2023-2024",
        createdBy: user._id,
      });
      await registration.save({ session });
      console.log("Done");

      const populatedResponse: populatedRegistration = await (
        await registration.populate("student")
      ).populate("createdBy");

      const formattedDate = formatDate();

      console.log(formattedDate);

      await sendEmail(
        populatedResponse.student.email,
        "Registration Sucessful",
        {
          html: receipt_html(
            populatedResponse.student.fullName,
            formattedDate,
            populatedResponse.registrationDetails.amount,
            populatedResponse.registrationDetails.amount,
            populatedResponse.registrationDetails.amount,
            populatedResponse.registrationDetails.type
          ),
          text: "",
        }
      );

      return populatedResponse;
    } catch (e) {
      throw e;
    }
  }
  async updateOne(input: IUpdateRegistrationDetailsInput, { user }, session) {
    try {
      console.log("REG__INPUT", input);

      if (!user) throw new Error("Unauthorized");
      console.log(JSON.stringify(input));

      const regDetail = { registrationDetails: { ...input } };

      const _registration = await this.db.registrationModel.findOne({
        _id: regDetail.registrationDetails.registrationId,
      });

      if (!_registration) throw new Error("Registration not found");

      await _registration.updateOne(
        {
          $set: {
            ...regDetail,
            updatedBy: user._id,
          },
        },
        { session }
      );
      return "Updated Successfully";
    } catch (e) {
      throw e;
    }
  }
  async deleteOne({ input }, { user }, session) {
    try {
      if (!user) throw new Error("Unauthorized");
      console.log(JSON.stringify(input));

      const registration = await this.db.registrationModel.findByIdAndDelete(
        input.registrationId,
        { session }
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
