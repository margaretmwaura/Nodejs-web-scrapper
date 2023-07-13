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
  for (let item of items) {
    let item_name = item.item_name;
    const key = item_name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    item.key_name = key;
  }
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

    await schedulingReminder(todoListItem.key_name, input.reminder);

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

module.exports.deleteTodoListItem = async (_, { id, key_name }) => {
  await TodoList.destroy({
    where: { id: id },
  });

  if (manager.exists(key_name)) {
    manager.deleteJob(key_name);
    console.log("The job has been deleted");
  } else {
    console.log("There was no job");
  }
  return "Todo List item has been deleted successfully";
};

async function schedulingReminder(key, time) {
  let number = "+12345401823";
  console.log("Before time instantiation" + time);
  let date = new Date();
  date.setSeconds(date.getSeconds() + 2);
  console.log("After time instantiation");
  console.log(date);
  console.log(time);

  if (time) {
    manager.add(key, date, () => {
      console.log("This is running for task " + key);
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
