const gql = require("graphql-tag");

module.exports = gql`
  type Query {
    getVowels: [Vowel]
    getUserList: [User]
    getUser(email: String!): User
    getTodoList(user_id: String!): [TodoList]
    getTodaysToDoList(user_id: String!): TodoList
    getNotes(user_id: String!): [Note]
    getThisWeeksToDoList(input: GetAWeekTodoList!): [TodoList]
  }
`;
