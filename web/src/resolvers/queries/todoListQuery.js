const { sequelize } = require("sequelize");
const { TodoList } = require("../../../models");
const { Op } = require("sequelize");

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
  const moment = require("moment");
  const TODAY_START = moment().format("YYYY-MM-DD 00:00");
  const NOW = moment().format("YYYY-MM-DD 23:59");

  try {
    const todoList = await TodoList.findAll({
      where: {
        createdAt: {
          [Op.between]: [TODAY_START, NOW],
        },
      },
    });
    return todoList;
  } catch (err) {
    console.log(err);
  }
};
