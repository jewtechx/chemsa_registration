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
    },
    Mutation: {
      createRegistration: async (_, args, context, info) => {
        console.log(args);
        console.log(context);

        const _student = await appContext.services.student.createOne(
          { ...args.input.student },
          { ...context }
        );
        const registration = await appContext.services.registration.createOne(
          { ...args.input, student: _student._id },
          { ...context }
        );
        console.log("Registration: " + registration);

        return registration;
      },

      updateRegistrationDetails: async (_, args, context, info) => {
        console.log(args);

        const response = await appContext.services.registration.updateOne(
          { ...args.input },
          { ...context }
        );
        return response;
      },

      deleteRegistration: async (_, args, context, info) => {
        console.log(args);

        const deletedDoc = await appContext.services.registration.deleteOne(
          { ...args },
          { ...context }
        );

        await appContext.services.student.deleteOne(
          { ...args },
          { ...context }
        );
        return deletedDoc;
      },
    },
  };
}
