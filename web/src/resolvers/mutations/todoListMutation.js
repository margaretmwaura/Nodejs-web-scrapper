const Sequelize = require("sequelize");
const { TodoList, TodoListItem } = require("../../../models");
const { pubsub } = require("./../../pubSub");

// TODO: Associate the TODO with the logged in user
module.exports.createToDoList = async (_, { input }) => {
  let todolistItems = input.todoListItems;
  try {
    let todoList = await TodoList.create({});

    for (let index in todolistItems) {
      let inputItem = todolistItems[index];
      await TodoListItem.create({
        itemName: inputItem.name,
        statusName: inputItem.status,
        TodoListId: todoList.id,
      });
    }

    pubsub.publish("TODO_CREATED", {
      todoCreated: todoList,
    });

    return "Todo List has been created";
  } catch (error) {
    console.log(error);
  }
};
