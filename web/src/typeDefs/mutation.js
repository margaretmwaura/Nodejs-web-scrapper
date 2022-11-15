const gql = require("graphql-tag");

module.exports = gql`
  type Mutation {
    createVowel(name: String, description: String, filename: String): String
    registerUser(input: RegisterUser!): userRegister
    login(email: String, password: String): String
  }
`;
