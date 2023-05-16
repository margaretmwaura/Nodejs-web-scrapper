const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const TodoListItem = sequelize.define(
    "TodoListItem",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      itemName: { type: DataTypes.STRING, allowNull: false },
      reminder: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      statusName: {
        type: Sequelize.ENUM("not-started", "in-progress", "closed"),
        defaultValue: "not-started",
        allowNull: false,
      },
    },
    {
      tableName: "todoListItems",
      freezeTableName: true,
    }
  );

  TodoListItem.associate = function (models) {
    TodoListItem.belongsTo(models.TodoList);
  };

  return TodoListItem;
};
