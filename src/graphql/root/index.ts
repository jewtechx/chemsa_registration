import { default as resolvers } from "./resolvers";
import { default as typeDefs } from "./typeDefs";

export default function rootSchema(appContext) {
  return {
    typeDefs,
    resolvers: resolvers(appContext),
  };
}
