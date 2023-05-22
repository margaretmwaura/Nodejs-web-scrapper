const gql = require("graphql-tag");

module.exports = gql`
  type Subscription {
    todoCreated: String
  }
`;
