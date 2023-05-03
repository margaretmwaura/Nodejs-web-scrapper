const gql = require("graphql-tag");

// TODO:
// 1. User association is missing in todolist
// 2. The foreign key aspect is missing in todolist item
// 3. Reminder is missing in ToDoList item
// 4. Test the input property
module.exports = gql`
  type TodoList {
    id: ID!
  }

  type TodoListItem {
    id: ID!
    itemName: String!
    status: String
    reminder: DateTime
  }

  input ToDoListItemsInput {
    name: String!
    status: String
    reminder: DateTime
  }

  input TodoListInput {
    todoListItems: [ToDoListItemsInput]!
  }
`;
