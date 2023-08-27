import { IAppContext } from "../../types/app";

export default function (appContext: IAppContext) {
  return {
    User: {
      __resolveReference: async function (_, args, context, info) {
        return await appContext.db.userModel.findById(_._id);
      },
    },
    Query: {
      user: async function (_, {}, context, info) {
        try {
          const user = await appContext.services.user.getOne(context.user._id, {
            ...context,
          });
          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Failed to fetch user");
        }
      },
    },

    Mutation: {
      createUser: async function (_, args, context, info) {
        console.log(context);
        
        const { user, token } = await appContext.services.user.createOne(
          { ...args },
          { ...context }
        );
        return { user, token };
      },
      updateUser: async function (_, args, context, info) {
        console.log(context);
        const user = await appContext.services.user.updateOne(
          { ...args },
          { ...context }
        );
        return user;
      },
      deleteUser: async function (_, args, context, info) {
        const user = await appContext.services.user.deleteOne(
          { ...args },
          { ...context }
        );
        return user;
      },
      loginUser: async function (_, args, context, info) {
        const { user, token } = await appContext.services.user.login(
          { ...args },
          { ...context }
        );
        return { user, token };
      },
    },
  };
}
