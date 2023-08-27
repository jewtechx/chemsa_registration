import { default as resolvers } from "./resolver";
import { default as typeDefs } from "./typeDefs";

export default function studentSchema(appContext) {
  return {
    typeDefs,
    resolvers: resolvers(appContext),
  };
}
