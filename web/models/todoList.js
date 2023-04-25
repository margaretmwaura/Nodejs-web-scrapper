const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define(
    "TodoList",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      tableName: "todoLists",
    }
  );
  TodoList.associate = function (models) {
    TodoList.hasMany(models.TodoListItem, {
      foreignKey: "id",
    });
  };

  return TodoList;
};
