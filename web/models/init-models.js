var DataTypes = require("sequelize").DataTypes;
var _Vowel = require("./vowel");
var _User = require("./user");
var _TodoList = require("./todoList");
var _TodoListItem = require("./todoListItem");

function initModels(sequelize) {
  var Vowel = _Vowel(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var TodoList = _TodoList(sequelize, DataTypes);
  var TodoListItem = _TodoListItem(sequelize, DataTypes);
  return {
    Vowel,
    User,
    TodoList,
    TodoListItem,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
