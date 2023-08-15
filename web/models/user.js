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
      password: { type: DataTypes.STRING, allowNull: false },
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
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
      defaultScope: {
        rawAttributes: { exclude: ["password"] },
      },
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

  User.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };
  return User;
};
