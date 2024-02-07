import { buildSubgraphSchema } from "@apollo/subgraph";

import { ApolloServer } from "@apollo/server";

import { IAppContext } from "../types/app";
import rootSchema from "./root";
import { formatError } from "../middlewares/error";
import userSchema from "./user";

interface MyContext {
  token?: String;
  user?: any;
}

export default function initGraph(appContext: IAppContext): ApolloServer {
  const schema = buildSubgraphSchema([
    rootSchema(appContext),
    userSchema(appContext)
  ]);

  const graph = new ApolloServer<MyContext>({
    schema,
    formatError: formatError,
  });
  return graph;
}
