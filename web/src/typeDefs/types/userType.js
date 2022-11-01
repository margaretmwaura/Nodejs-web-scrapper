const gql = require("graphql-tag");

module.exports = gql`
  type User {
    UserID: ID!
    firstName: String
    lastName: String
    email: String
  }
`;
