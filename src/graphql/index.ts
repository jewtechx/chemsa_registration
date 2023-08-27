import { buildSubgraphSchema } from "@apollo/subgraph";

import { ApolloServer } from "@apollo/server";

import { IAppContext } from "../types/app";
import userSchema from "./user";
import { formatError } from "../middlewares/error";

interface MyContext {
  token?: String;
  user?: any;
}

export default function initGraph(appContext: IAppContext): ApolloServer {
  const schema = buildSubgraphSchema([userSchema(appContext)]);

  const graph = new ApolloServer<MyContext>({
    schema,
    formatError: formatError,
  });
  return graph;
}
