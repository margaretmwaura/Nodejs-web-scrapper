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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        name: "createdAt",
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        name: "updatedAt",
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        name: "updatedAt",
        field: "updated_at",
      },
    },
    {
      tableName: "todoLists",
      timestamps: true,
      underscored: true,
    }
  );
  TodoList.associate = function (models) {
    TodoList.hasMany(models.TodoListItem, {
      foreignKey: "TodoListId",
      as: "todoListItems",
    });
    TodoList.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "user",
    });
  };

  return TodoList;
};
