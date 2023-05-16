const Sequelize = require("sequelize");
const { TodoList, TodoListItem } = require("../../../models");

// TODO: Associate the TODO with the logged in user
module.exports.createToDoList = async (_, { input }) => {
  let todolistItems = input.todoListItems;
  try {
    let todoList = await TodoList.create({});

    for (let index in todolistItems) {
      let inputItem = todolistItems[index];
      let item = await TodoListItem.create({
        itemName: inputItem.name,
        statusName: inputItem.status,
        TodoListId: todoList.id,
      });
    }

    return "Todo List has been created";
  } catch (error) {
    console.log(error);
  }
};
