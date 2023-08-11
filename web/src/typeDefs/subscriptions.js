const gql = require("graphql-tag");

module.exports = gql`
  type Subscription {
    todoCreated: TodoList
    noteSubcription: NoteSubscription
  }

  type NoteSubscription {
    mutation: String!
    data: Note!
  }
`;
