const gql = require("graphql-tag");

module.exports = gql`
  type Query {
    getVowels: [Vowel]
    getUserList: [User]
    getUser(email: String!): User
    getTodoList: [TodoList]
    getTodaysToDoList: TodoList
    getNotes(user_id: String!): [Note]
  }
`;
