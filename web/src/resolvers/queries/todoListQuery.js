const { sequelize } = require("sequelize");
const { TodoList } = require("../../../models");
const { Op } = require("sequelize");
const moment = require("moment");

module.exports.getTodoList = async () => {
  try {
    const todoList = await TodoList.findAll({ include: "todoListItems" });
    return todoList;
  } catch (err) {
    console.log(err);
  }
};

// FIXME: Modify to only return one record
module.exports.getTodaysToDoList = async () => {
  const TODAY_START = moment().format("YYYY-MM-DD 00:00");
  const TODAY_END = moment().format("YYYY-MM-DD 23:59");

  try {
    const todoList = await TodoList.findOne({
      where: {
        createdAt: {
          [Op.between]: [TODAY_START, TODAY_END],
        },
      },
    });
    return todoList;
  } catch (err) {
    console.log(err);
  }
};
