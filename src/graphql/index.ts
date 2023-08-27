import { buildSubgraphSchema } from "@apollo/subgraph";

import { ApolloServer } from "@apollo/server";

import { IAppContext } from "../types/app";
import userSchema from "./user";
import rootSchema from "./root";
import studentSchema from "./student";
import registrationSchema from "./registration";
import { formatError } from "../middlewares/error";

interface MyContext {
  token?: String;
  user?: any;
}

export default function initGraph(appContext: IAppContext): ApolloServer {
  const schema = buildSubgraphSchema([
    rootSchema(appContext),
    userSchema(appContext),
    studentSchema(appContext),
    registrationSchema(appContext),
  ]);

  const graph = new ApolloServer<MyContext>({
    schema,
    formatError: formatError,
  });
  return graph;
}
