const Sequelize = require("sequelize");
const { TodoList, TodoListItem } = require("../../../models");
const { pubsub } = require("./../../pubSub");

// TODO: Associate the TODO with the logged in user
module.exports.createToDoList = async (_, { input }) => {
  let items = input.todoListItems;
  console.log("start");
  console.log(items);
  try {
    let todoList = await TodoList.create(
      {
        todoListItems: items,
      },
      {
        include: [
          {
            association: TodoList.associations.todoListItems,
          },
        ],
      }
    );

    pubsub.publish("TODO_CREATED", {
      todoCreated: todoList,
    });

    return "Todo List has been created";
  } catch (error) {
    console.log("The error");
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

module.exports.addTodoListItem = async (_, { input }) => {
  try {
    await TodoListItem.create({
      item_name: input.item_name,
      TodoListId: input.id,
    });

    let todo = await TodoList.findOne({
      where: { id: input.id },
    });

    pubsub.publish("TODO_CREATED", {
      todoCreated: todo,
    });

    return "Todo List item has been created";
  } catch (error) {
    console.log(error);
  }
};
