const gql = require("graphql-tag");

module.exports = gql`
  type Mutation {
    createVowel(name: String, description: String, filename: String): String
    deleteVowels: String
    registerUser(input: RegisterUser!): userRegister
    login(input: LoginUser!): String
    checkAuth(authorized: String): String
  }
`;
