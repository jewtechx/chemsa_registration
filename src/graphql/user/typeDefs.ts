import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    user(id: ID!): User
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
    phone: String!
  }

  input DeleteUserInput {
    userId: ID!
  }

  input CreateUserInput {
    fullname: String!
    email: String!
    phone: String!
    password: String!
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
