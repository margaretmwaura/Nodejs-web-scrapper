const gql = require("graphql-tag");

module.exports = gql`
  type Subscription {
    todoCreated(user_id: String!): TodoList
    noteSubcription(user_id: String!): NoteSubscription
  }

  type NoteSubscription {
    mutation: String!
    data: Note!
  }
`;
