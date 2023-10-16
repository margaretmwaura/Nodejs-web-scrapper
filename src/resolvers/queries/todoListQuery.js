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

module.exports.getTodaysToDoList = async (_, { user_id }, context) => {
  const TODAY_START = moment().format("YYYY-MM-DD 00:00");
  const TODAY_END = moment().format("YYYY-MM-DD 23:59");

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

module.exports.getThisWeeksToDoList = async (_, { input }, context) => {

  let { user_id, start_date, end_date } = input;

  const END_TIME = moment(end_date).format("YYYY-MM-DD 23:59");

  const START_TIME = moment(start_date).format("YYYY-MM-DD 00:00");

  try {
    const todoLists = await TodoList.findAll({
      where: {
        created_at: {
          [Op.between]: [START_TIME, END_TIME],
        },
        UserId: {
          [Op.eq]: user_id,
        },
      },
    });
    return todoLists;
  } catch (err) {
    console.log(err);
  }
};
