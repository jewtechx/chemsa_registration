import { gql } from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    user(id: ID!): User
  }

  enum Role {
    PRESIDENT
    VICE_PRESIDENT
    GENERAL_SECRETARY
    ASSISTANT_GENERAL_SECRETARY
    FINANCIAL_SECRETARY
    ORGANIZING_SECRETARY
    PATRON
    SUDO_ADMIN
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): AuthUser
    updateUser(input: UpdateUserInput!): User
    deleteUser(input: DeleteUserInput!): User
    loginUser(input: LoginUserInput!): AuthUser
  }

  type User @key(fields: "_id") {
    _id: ID!
    email: String!
    fullname: String!
    password: String!
    role: Role
  }

  input DeleteUserInput {
    userId: ID!
  }

  input CreateUserInput {
    fullname: String!
    email: String!
    phone: String!
    password: String!
    role: Role!
  }

  input UpdateUserInput {
    fullname: String
    email: String
    phone: String
  }

  type AuthUser {
    user: User!
    token: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
