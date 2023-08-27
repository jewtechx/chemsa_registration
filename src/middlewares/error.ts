"use strict";

import { AuthenticationError, ForbiddenError,  } from "apollo-server-errors"
import { GraphQLError } from "graphql"

export function formatError (err: GraphQLError) {
  if(err.message.includes("AuthorizationExpired")) {
    return new AuthenticationError("AuthorizationExpired")
  }
  if(err.message.includes("InvalidOrigin")) {
    return new ForbiddenError("InvalidOrigin")
  }
  if(err.message.includes("InvalidToken")) {
    return new AuthenticationError("InvalidToken")
  }
  return err
}