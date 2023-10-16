const gql = require("graphql-tag");

module.exports = gql`
  type Note {
    id: ID!
    topic: String
    content: String
    createdAt: String
    user: User!
  }

  input CreateNote {
    topic: String!
    content: String!
    user_id: String!
  }

  input UpdateNote {
    id: ID!
    topic: String
    content: String
  }
`;
