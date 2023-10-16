const gql = require("graphql-tag");

// TODO: The mutation should return a union
module.exports = gql`
  type Mutation {
    createVowel(name: String, description: String, filename: String): String
    deleteVowels: String
    registerUser(input: RegisterUser!): userRegister
    login(input: LoginUser!): String
    checkAuth(authorized: String): String
    createToDoList(input: TodoListInput!): String
    updateTodoListItem(input: UpdateTodoListItem!): String
    addTodoListItem(input: AddTodoListItem!): String
    deleteTodoListItem(input: DeleteTodoListItem!): String
    createNote(input: CreateNote!): String
    updateNote(input: UpdateNote!): String
    deleteNote(id: String!): String
  }
`;
