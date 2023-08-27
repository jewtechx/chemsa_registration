import { gql } from "graphql-tag";

const typeDefs = gql`
  input StudentFilter {
    _id: IdOperator
    title: StringOperator
  }

  extend type Query {
    Student(
      filter: StudentFilter!
      search: SearchOperator
      populate: [String]
    ): Student
    Students(
      filter: StudentFilter = {}
      search: SearchOperator
      populate: [String]
      pagination: Pagination!
    ): [Student]
  }

  extend type Mutation {
    updateStudent(input: UpdateStudentInput!): String
  }

  type Student @key(fields: "_id") {
    _id: ID!
    email: String!
    fullName: String!
    phone: String!
    studentID: String!
    programme: String!
    level: Int!
  }

  input CreateStudentInput {
    email: String!
    fullName: String!
    phone: String!
    studentID: String!
    programme: String!
    level: Int!
  }

  input UpdateStudentInput {
    studentID: String!
    email: String
    fullName: String
    phone: String
    programme: String
    level: Int
  }
`;

export default typeDefs;
