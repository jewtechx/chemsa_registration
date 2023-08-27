import { gql } from "graphql-tag";

const typeDefs = gql`
  enum RegistrationType {
    REG_ONLY
    REG_AND_SOUVENIERS
  }

  input RegistrationFilter {
    _id: IdOperator
    year: StringOperator
  }

  type registrationDetails {
    type: RegistrationType
    souveniers: [String]
    amount: String
  }

  input RegistrationDetails {
    type: RegistrationType
    year: String
    souveniers: [String]
    amount: String
  }

  type Registration @key(fields: "_id") {
    _id: ID
    student: Student
    registrationDetails: registrationDetails
    year: String
    createdBy: User
    updatedBy: User
  }

  input CreateRegistrationInput {
    student: CreateStudentInput!
    registrationDetails: RegistrationDetails!
    year: String!
  }

  input UpdateRegistrationDetailsInput {
    registrationId: ID!
    registrationDetails: RegistrationDetails
    year: String
  }

  input DeleteRegistrationInput {
    registrationId: ID!
    studentID: String!
  }

  extend type Query {
    Registration(
      filter: RegistrationFilter!
      search: SearchOperator
      populate: [String]
    ): Registration
    Registrations(
      filter: RegistrationFilter
      search: SearchOperator
      populate: [String]
      pagination: Pagination!
    ): [Registration]
  }

  extend type Mutation {
    createRegistration(input: CreateRegistrationInput!): Registration
    updateRegistrationDetails(input: UpdateRegistrationDetailsInput!): String
    deleteRegistration(input: DeleteRegistrationInput!): Registration
  }
`;

export default typeDefs;
