import { gql } from "graphql-tag";

export default gql`
  input StringOperator {
    eq: String
    notEq: String
    contains: String
    notContains: String
    in: [String!]
    notIn: [String!]
    regex: String
  }

  input IdOperator {
    eq: ID
    in: [ID!]
    notIn: [ID!]
  }

  enum SearchOperatorOption {
    CaseInsensitive
    MultiLine
  }

  input SearchOperator {
    "text to search for"
    query: String
    "Fields to search text from"
    fields: [String]
    "Modifiers for text search"
    options: [SearchOperatorOption]
  }

  input Pagination {
    skip: Int
    limit: Int
  }
`;
