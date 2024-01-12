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
    NULL
    NOT_COLLECTED
  }

  input RegistrationFilter {
    _id: IdOperator
    year: StringOperator
  }

  type Souvenier {
    id: Int
    name: String
    count: Int
  }

  input SouvenierInput {
    id: Int
    name: String
    count: Int
  }

  type registrationDetails {
    type: RegistrationType
    souveniers: [Souvenier]
    amount: String
    paymentMethod: paymentMethod
    balance: String
    souveniersCollected: [Souvenier]
    souveniersStatus: souvenierStatus
  }

  input RegistrationDetails {
    type: RegistrationType!
    souveniers: [SouvenierInput!]
    amount: String!
    paymentMethod: paymentMethod!
    balance: String!
    souveniersCollected: [SouvenierInput!]
  }

  input UpdateRegistrationDetails {
    registrationId: ID!
    type: RegistrationType
    souveniers: [SouvenierInput]
    amount: String
    paymentMethod: paymentMethod
    balance: String
    souveniersCollected: [SouvenierInput]
  }

  type Registration @key(fields: "_id") {
    _id: ID
    student: Student
    registrationDetails: registrationDetails
    year: String
    createdBy: User
    updatedBy: User
  }

  type RegistrationQuery {
    registration: [Registration]
    registrationCount: Int
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
    ): RegistrationQuery
    getCollectedAllCount: Int
    getCollectedSomeCount: Int
    getCollectedNoneCount: Int
  }

  extend type Mutation {
    createRegistration(input: CreateRegistrationInput!): Registration
    updateRegistrationDetails(input: UpdateRegistrationDetailsInput!): String
    deleteRegistration(input: DeleteRegistrationInput!): Registration
  }
`;

export default typeDefs;
