const gql = require("graphql-tag");

module.exports = gql`
  type Query {
    getVowels: [Vowel]
    getUserList: [User]
  }
`;
