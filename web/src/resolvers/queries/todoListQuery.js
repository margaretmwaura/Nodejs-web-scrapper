const { sequelize } = require("sequelize");
const { TodoList } = require("../../../models");
const { Op } = require("sequelize");
const moment = require("moment");

module.exports.getTodoList = async (_, { user_id }, context) => {
  try {
    const todoList = await TodoList.findAll(
      {
        where: {
          UserId: {
            [Op.eq]: user_id,
          },
        },
      },
      { include: "todoListItems" }
    );
    return todoList;
  } catch (err) {
    console.log(err);
  }
};

// FIXME: Modify to only return one record
module.exports.getTodaysToDoList = async (_, { user_id }, context) => {
  const TODAY_START = moment().format("YYYY-MM-DD 00:00");
  const TODAY_END = moment().format("YYYY-MM-DD 23:59");

  // TODO: Remove the console after setting mysql date
  console.log("Start");
  console.log(TODAY_START);
  console.log("End");
  console.log(TODAY_END);

  try {
    const todoList = await TodoList.findOne({
      where: {
        created_at: {
          [Op.between]: [TODAY_START, TODAY_END],
        },
        UserId: {
          [Op.eq]: user_id,
        },
      },
    });
    return todoList;
  } catch (err) {
    console.log(err);
  }
};
