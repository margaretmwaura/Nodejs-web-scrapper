const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    first_name: String
    last_name: String
    email: EmailAddress
    notes: [Note!]!
    todoLists: [TodoList!]!
  }

  input RegisterUser {
    first_name: String!
    last_name: String!
    email: EmailAddress!
  }

  type RegisterSuccessful {
    user: User!
  }

  interface PasswordToken {
    token: String
  }

  union userRegister = CreateError | RegisterSuccessful
`;
