const gql = require("graphql-tag");

module.exports = gql`
  type User {
    UserID: ID!
    firstName: String
    lastName: String
    email: String
  }

  input RegisterUser {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type RegisterSuccessful implements PasswordToken {
    token: String
    user: User!
  }

  interface PasswordToken {
    token: String
  }

  union userRegister = CreateError | RegisterSuccessful
`;
