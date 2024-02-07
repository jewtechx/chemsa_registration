import { IAppContext } from "../../types/app";

export default function (appContext: IAppContext) {
  return {
    Query: {
      Students: async (_, args:any, context:any, info:any) => {
        const students = await appContext.services.student.getMany(
          { ...args },
          { ...context }
        );
        return students;
      },
      Student: async (_, args:any, context:any, info:any) => {
        const student = await appContext.services.student.getOne(
          { ...args },
          { ...context }
        );
        return student;
      },
      CountLevel100: async (_, args:any, context:any, info:any) => {
        console.log(args);

        const count = await appContext.services.student.countLevel100(
          { ...args },
          { ...context }
        );
        return count;
      },
      CountLevel200: async (_, args:any, context:any, info:any) => {
        const count = await appContext.services.student.countLevel200(
          { ...args },
          { ...context }
        );
        return count;
      },
      CountLevel300: async (_, args:any, context:any, info:any) => {
        const count = await appContext.services.student.countLevel300(
          { ...args },
          { ...context }
        );
        return count;
      },
      CountLevel400: async (_, args:any, context:any, info:any) => {
        const count = await appContext.services.student.countLevel400(
          { ...args },
          { ...context }
        );
        return count;
      },
    },
    Mutation: {
      updateStudent: async (_, args:any, context:any, info:any) => {
        console.log(args);
        let session = null;

        const response = await appContext.services.student.updateOne(
          { ...args.input },
          { ...context },
          session
        );
        return response;
      },
    },
  };
}