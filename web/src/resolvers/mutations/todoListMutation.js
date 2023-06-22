const Sequelize = require("sequelize");
const { TodoList, TodoListItem } = require("../../../models");
const { pubsub } = require("./../../pubSub");

// TODO: Associate the TODO with the logged in user
module.exports.createToDoList = async (_, { input }) => {
  let todolistItems = input.todoListItems;
  try {
    let todoList = await TodoList.create({});

    console.log("Foreign key value");
    console.log(todoList.id);

    for (let index in todolistItems) {
      let inputItem = todolistItems[index];
      await TodoListItem.create({
        item_name: inputItem.name,
        status_name: inputItem.status,
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

module.exports.updateTodoListItem = async (_, { input }) => {
  let item_id = input.id;

  delete input.id;

  console.log(input);

  try {
    await TodoListItem.update(input, {
      where: { id: item_id },
    });

    let todoListItem = await TodoListItem.findOne({
      where: { id: item_id },
      include: "todoList",
    });

    let todo = todoListItem.todoList;

    pubsub.publish("TODO_CREATED", {
      todoCreated: todo,
    });

    return "Todo List item has been updated successfully";
  } catch (error) {
    console.log("Error");
  }
};
