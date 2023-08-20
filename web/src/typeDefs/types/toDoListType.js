const gql = require("graphql-tag");

// TODO:
// 1. User association is missing in todolist
// 2. The foreign key aspect is missing in todolist item
// 3. Reminder is missing in ToDoList item
// 4. Test the input property

// FIXME: The reminder has a data type of string proper ways to solve this
module.exports = gql`
  type TodoList {
    id: ID!
    todoListItems: [TodoListItem!]!
    user: User!
  }

  type TodoListItem {
    id: ID!
    item_name: String!
    key_name: String!
    status_name: String
    reminder: String
    todoList: TodoList!
  }

  input ToDoListItemsInput {
    item_name: String!
    status: String
    reminder: DateTime
  }

  input TodoListInput {
    user_id: String!
    todoListItems: [ToDoListItemsInput]!
  }

  input UpdateTodoListItem {
    id: ID!
    status_name: String
    reminder: DateTime
    item_name: String
  }

  input AddTodoListItem {
    id: ID!
    item_name: String
  }

  input DeleteTodoListItem {
    id: ID!
    key_name: String
  }
`;
