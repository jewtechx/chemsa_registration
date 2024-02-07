import { default as resolvers } from "./resolvers";
import { default as typeDefs } from "./typeDefs";

export default function studentSchema(appContext) {
  return {
    typeDefs,
    resolvers: resolvers(appContext),
  };
}