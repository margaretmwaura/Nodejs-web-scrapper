const gql = require("graphql-tag");

module.exports = gql`
  type Vowel {
    id: ID!
    name: String
    description: String
    filename: String
  }
`;
