const Sequelize = require("sequelize");

// https://sequelize.org/docs/v6/other-topics/naming-strategies/

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
      item_name: { type: DataTypes.STRING, allowNull: false },
      reminder: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status_name: {
        type: Sequelize.ENUM("not-started", "in-progress", "closed"),
        defaultValue: "not-started",
        allowNull: false,
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
      tableName: "todoListItems",
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    }
  );

  TodoListItem.associate = function (models) {
    TodoListItem.belongsTo(models.TodoList);
  };

  return TodoListItem;
};
