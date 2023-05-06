const { sequelize } = require("sequelize");
const { TodoList } = require("../../../models");

module.exports.getTodoList = async () => {
  try {
    const todoList = await TodoList.findAll({ include: "todoListItems" });
    return todoList;
  } catch (err) {
    console.log(err);
  }
};
