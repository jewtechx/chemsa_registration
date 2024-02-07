import {default as resolvers} from "./resolvers"
import {default as typeDefs} from "./typeDefs"

export default function userSchema(appContext) {
    return {
        typeDefs,
        resolvers: resolvers(appContext)
    }
}