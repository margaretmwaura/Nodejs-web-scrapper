const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      first_name: { type: DataTypes.STRING, allowNull: true },
      last_name: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
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
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Note, {
      foreignKey: "UserId",
      as: "notes",
    });
    User.hasMany(models.TodoList, {
      foreignKey: "UserId",
      as: "todoLists",
    });
  };
  return User;
};
