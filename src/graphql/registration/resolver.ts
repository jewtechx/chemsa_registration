import mongoose from "mongoose";
import { IAppContext } from "../../types/app";

export default function (appContext: IAppContext) {
  return {
    Query: {
      Registrations: async (_, args, context, info) => {
        const registrations = await appContext.services.registration.getMany(
          { ...args },
          { ...context }
        );
        return registrations;
      },
      Registration: async (_, args, context, info) => {
        const registration = await appContext.services.registration.getOne(
          { ...args },
          { ...context }
        );
        return registration;
      },
      getCollectedAllCount: async (_, args, context, info) => {
        const count =
          await appContext.services.registration.getCollectedAllCount(
            { ...args },
            { ...context }
          );
        return count;
      },
      getCollectedSomeCount: async (_, args, context, info) => {
        const count =
          await appContext.services.registration.getCollectedSomeCount(
            { ...args },
            { ...context }
          );
        return count;
      },
      getCollectedNoneCount: async (_, args, context, info) => {
        const count =
          await appContext.services.registration.getCollectedNoneCount(
            { ...args },
            { ...context }
          );
        return count;
      },
    },
    Mutation: {
      createRegistration: async (_, args, context, info) => {
        console.log(args);
        console.log(context);
        let session = null;

        try {
          session = await mongoose.startSession();
          session.startTransaction();

          const _student = await appContext.services.student.createOne(
            { ...args.input.student },
            { ...context },
            session
          );
          const registration = await appContext.services.registration.createOne(
            { ...args.input, student: _student._id },
            { ...context },
            session
          );

          await session.commitTransaction();
          session.endSession();
          console.log("Registration: " + registration);

          return registration;
        } catch (e) {
          if (session) {
            await session.abortTransaction();
            session.endSession();
          }
          throw e;
        }
      },

      updateRegistrationDetails: async (_, args, context, info) => {
        console.log(args);
        let session = null;

        try {
          session = await mongoose.startSession();
          session.startTransaction();

          await appContext.services.student.updateOne(
            { ...args.input.student },
            { ...context },
            session
          );

          const response = await appContext.services.registration.updateOne(
            { ...args.input.registrationDetails },
            { ...context },
            session
          );

          await session.commitTransaction();
          session.endSession();
          console.log("Registration: " + response);
          return response;
        } catch (e) {
          if (session) {
            await session.abortTransaction();
            session.endSession();
          }
          throw e;
        }
      },

      deleteRegistration: async (_, args, context, info) => {
        console.log(args);
        let session = null;
        try {
          session = await mongoose.startSession();
          session.startTransaction();

          const deletedDoc = await appContext.services.registration.deleteOne(
            { ...args },
            { ...context },
            session
          );

          await appContext.services.student.deleteOne(
            { ...args },
            { ...context },
            session
          );

          await session.commitTransaction();
          session.endSession();
          console.log("Deleted Doc: " + deletedDoc);
          return deletedDoc;
        } catch (e) {
          if (session) {
            await session.abortTransaction();
            session.endSession();
          }
          throw e;
        }
      },
    },
  };
}
