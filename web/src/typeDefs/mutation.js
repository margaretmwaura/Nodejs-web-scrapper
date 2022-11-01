const gql = require("graphql-tag");

module.exports = gql`
  type Mutation {
    createVowel(name: String, description: String, filename: String): String
    registerUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): String
    login(email: String, password: String): String
  }
`;
