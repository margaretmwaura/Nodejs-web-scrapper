const gql = require("graphql-tag");

module.exports = gql`
  type Note {
    id: ID!
    topic: String
    content: String
  }

  input CreateNote {
    topic: String
    content: String
  }
`;
