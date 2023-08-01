const gql = require("graphql-tag");

module.exports = gql`
  type User {
    UserID: ID!
    first_name: String
    last_name: String
    email: EmailAddress
  }

  input RegisterUser {
    first_name: String!
    last_name: String!
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
