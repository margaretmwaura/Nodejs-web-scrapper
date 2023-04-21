const gql = require("graphql-tag");

module.exports = gql`
  type User {
    UserID: ID!
    firstName: String
    lastName: String
    email: EmailAddress
  }

  input RegisterUser {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    password: String!
  }

  input LoginUser {
    email: EmailAddress!
    password: String!
  }

  type RegisterSuccessful {
    user: User!
  }

  interface PasswordToken {
    token: String
  }

  union userRegister = CreateError | RegisterSuccessful
`;
