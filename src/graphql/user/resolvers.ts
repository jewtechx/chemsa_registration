import { IAppContext } from "../../types/app";

export default function (appContext: IAppContext){
    return {
        User: {
            __resolveReference: async function (_:any, args:any, context:any, info:any) {
              return await appContext.db.userModel.findById(_._id);
            }
        },
        Query: {
            user: async function (_:any, { }, context:any, info:any) {
                try {
                    const user = await appContext.services.user.getOne(context.user._id, {
                        ...context
                    })

                    return user
                }catch(e) {
                    throw new Error("Failed to fetch user")
                }
            }
        },
        Mutation: {
            createUser: async function (_:any, args:any, context:any, info:any) {
                const {user, token } = await appContext.services.user.createOne(
                    {...args},
                    {...context}
                    )

                    return {user, token}
            },
            updateUser: async function (_:any, args:any , context:any, info:any){
                const user = await appContext.services.user.updateOne(
                    {...args},
                    {...context}
                )
                return user
            },
            loginUser: async function (_:any, args:any, context:any, info:any){
                const {user, token} = await appContext.services.user.login(
                    {...args},
                    {...context}
                )
                return {user, token}
            },
            deleteuser: async function (_:any, args:any, context:any, info:any){
                const user = await appContext.services.user.deleteOne(
                    {...args},
                    {...context}
                )
            }
        }      
}
}