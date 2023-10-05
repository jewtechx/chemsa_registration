import { gql } from "graphql-tag";

const typeDefs = gql`
  input StudentFilter {
    _id: IdOperator
    year: StringOperator
  }

  type Query {
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
    ): StudentQuery
    CountLevel100(filter: StudentFilter!): Int
    CountLevel200(filter: StudentFilter!): Int
    CountLevel300(filter: StudentFilter!): Int
    CountLevel400(filter: StudentFilter!): Int
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
    level: String!
  }

  type StudentQuery {
    students: [Student]
    studentCount: Int
  }

  input CreateStudentInput {
    email: String!
    fullName: String!
    phone: String!
    studentID: String!
    programme: String!
    level: String!
  }

  input UpdateStudentInput {
    studentObjectID: ID!
    studentID: String
    email: String
    fullName: String
    phone: String
    programme: String
    level: String
  }
`;

export default typeDefs;
