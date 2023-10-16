// require("dotenv").config({ path: require("find-config")(".env") });
const path = require("path");
require("dotenv").config({ path: path.resolve("./.env") });
const Sequelize = require("sequelize");
const { TodoList, TodoListItem } = require("../../../models");
const { pubsub } = require("./../../pubSub");
const CronJob = require("./../../../lib/cron.js").CronJob;
const manager = require("./../../../crons");
let sid = process.env.SID;
let auth_token = process.env.AUTH_TOKEN;
const twilio = require("twilio")(sid, auth_token);

// TODO: Associate the TODO with the logged in user
module.exports.createToDoList = async (_, { input }) => {
  let items = input.todoListItems;
  let user_id = input.user_id;
  let reminder_time = new Date().toISOString();

  for (let item of items) {
    let item_name = item.item_name;
    const key = item_name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    item.key_name = key;

    item.reminder = reminder_time;
    reminder_time = new Date(
      new Date(reminder_time).getTime() + 30 * 60000
    ).toISOString();
  }
  try {
    let todoList = await TodoList.create(
      {
        UserId: user_id,
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
    console.log(error);
  }
};

module.exports.updateTodoListItem = async (_, { input }) => {
  let item_id = input.id;

  delete input.id;

  try {
    await TodoListItem.update(input, {
      where: { id: item_id },
    });

    let todoListItem = await TodoListItem.findOne({
      where: { id: item_id },
      include: "todoList",
    });

    // TODO: We have been teesting a lot , will return after the numerous testing
    // await schedulingReminder(todoListItem.key_name, input.reminder);

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
    const key = input.item_name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    await TodoListItem.create({
      item_name: input.item_name,
      TodoListId: input.id,
      key_name: key,
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

module.exports.deleteTodoListItem = async (_, { input }) => {
  let { id, key_name } = input;

  let todoListItem = await TodoListItem.findOne({
    where: { id: id },
    include: "todoList",
  });

  let todo = todoListItem.todoList;

  await TodoListItem.destroy({
    where: { id: id },
  });

  console.log("The todo");
  console.log(todo);

  let todoListItems = await TodoListItem.findAll({
    where: { TodoListId: todo.id },
  });

  console.log(todoListItems);

  if (!todoListItems || todoListItems.length == 0) {
    console.log("We have deleted");
    await TodoList.destroy({
      where: { id: todo.id },
    });
  }

  if (manager.exists(key_name)) {
    manager.deleteJob(key_name);
    console.log("The job has been deleted");
  } else {
    console.log("There was no job ");
  }

  pubsub.publish("TODO_CREATED", {
    todoCreated: todo,
  });

  return "Todo List item has been deleted successfully";
};

async function schedulingReminder(key, time) {
  let number = "+12345401823";
  let date = new Date();
  date.setSeconds(date.getSeconds() + 2);

  if (time) {
    manager.add(key, time, () => {
      twilio.messages
        .create({
          from: number,
          to: "+254715420981",
          body: "Girlllll we got work to do",
        })
        .then(() => {
          console.log("We sent message");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    manager.start(key);
  } else {
    console.log("We do not need no reminders miss ma'am");
  }
}
