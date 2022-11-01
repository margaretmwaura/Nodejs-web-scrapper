const gql = require("graphql-tag");

module.exports = gql`
  type Vowel {
    VowelID: ID!
    Name: String
    Description: String
    Filename: String
  }
`;
