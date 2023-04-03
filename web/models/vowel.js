const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  // RULES:
  // The name is in upperCase and singular for the model
  // The file name should be in small letters and singular
  // The table name should be plural

  return sequelize.define(
    "Vowel",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      filename: {
        type: DataTypes.STRING(2000),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "vowels",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
