import { gql } from "graphql-tag";

const typeDefs = gql`
  enum RegistrationType {
    REG_ONLY
    REG_AND_SOUVENIERS
  }

  enum paymentMethod {
    CASH
    MOBILE_MONEY
  }

  enum souvenierStatus {
    COLLECTED_ALL
    COLLECTED_SOME
  }

  input RegistrationFilter {
    _id: IdOperator
    year: StringOperator
  }

  type registrationDetails {
    type: RegistrationType
    souveniers: [String]
    amount: String
    paymentMethod: paymentMethod
    balance: String
    souveniersCollected: [String]
    souveniersStatus: souvenierStatus
  }

  input RegistrationDetails {
    type: RegistrationType!
    souveniers: [String]
    amount: String!
    paymentMethod: paymentMethod!
    balance: String!
    souveniersCollected: [String]
  }

  input UpdateRegistrationDetails {
    registrationId: ID!
    type: RegistrationType
    souveniers: [String]
    amount: String
    paymentMethod: paymentMethod
    balance: String
    souveniersCollected: [String]
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
  }

  input UpdateRegistrationDetailsInput {
    student: UpdateStudentInput
    registrationDetails: UpdateRegistrationDetails
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
