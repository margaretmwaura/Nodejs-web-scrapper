const gql = require("graphql-tag");

module.exports = gql`
  type Mutation {
    createVowel(name: String, description: String, filename: String): String
  }
`;
