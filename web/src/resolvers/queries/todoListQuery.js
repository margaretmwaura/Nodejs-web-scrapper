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

module.exports.getThisWeeksToDoList = async (_, { user_id }, context) => {
  const d = new Date();

  let last_date_of_the_week = d.setDate(d.getDate() - 0);
  const END_TIME = moment(last_date_of_the_week).format("YYYY-MM-DD 23:59");

  console.log("End time");
  console.log(END_TIME);

  let first_date_of_the_week = d.setDate(d.getDate() - 6);
  const START_TIME = moment(first_date_of_the_week).format("YYYY-MM-DD 00:00");

  console.log("Start time");
  console.log(START_TIME);

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
