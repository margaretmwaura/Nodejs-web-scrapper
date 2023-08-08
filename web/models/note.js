const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      topic: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
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
      tableName: "notes",
      timestamps: true,
      underscored: true,
    }
  );

  return Note;
};
