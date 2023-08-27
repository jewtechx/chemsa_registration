import { IAppContext } from "../../types/app";

export default function (appContext: IAppContext) {
  return {
    Query: {
      Students: async (_, args, context, info) => {
        const student = await appContext.services.student.getOne(
          { ...args },
          { ...context }
        );
        return student;
      },
      Student: async (_, args, context, info) => {
        const student = await appContext.services.student.getOne(
          { ...args },
          { ...context }
        );
        return student;
      },
    },
    Mutation: {
      updateStudent: async (_, args, context, info) => {
        console.log(args);

        const response = await appContext.services.student.updateOne(
          { ...args },
          { ...context }
        );
        return response;
      },
    },
  };
}
